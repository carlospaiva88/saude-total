import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AdminName = "Admin";

const palavrasOfensivas = ["palavrão1", "palavrão2", "palavrão3"];
const contemPalavraOfensiva = (texto) => {
  const t = texto.toLowerCase();
  return palavrasOfensivas.some((p) => t.includes(p));
};

const CommentsContainer = styled.section`
  margin-top: 3rem;
  border-top: 1px solid #ccc;
  padding-top: 2rem;
`;

const CommentsHeader = styled.h3`
  color: #264653;
  margin-bottom: 1rem;
`;

const Warning = styled.p`
  font-style: italic;
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #43aa8b;
  font-size: 1rem;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #2a6f61;
    box-shadow: 0 0 0 2px rgba(67, 170, 139, 0.3);
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #43aa8b;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  &:focus {
    outline: none;
    border-color: #2a6f61;
    box-shadow: 0 0 0 2px rgba(67, 170, 139, 0.3);
  }
`;

const Button = styled.button`
  width: 120px;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background: #43aa8b;
  color: white;
  font-weight: 700;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #2a6f61;
  }
`;

const ErrorMessage = styled.p`
  color: #cc0000;
  margin: 0;
  font-size: 0.9rem;
`;

const CommentList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid #e2e8e0;
  padding: 1rem 0;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
`;

const CommentAuthor = styled.strong`
  color: #2a6f61;
`;

const CommentActions = styled.div`
  button {
    background: transparent;
    border: none;
    color: #43aa8b;
    cursor: pointer;
    font-size: 0.9rem;
    margin-left: 1rem;
    :hover {
      color: #2a6f61;
    }
  }
  span {
    margin-left: 0.3rem;
    font-size: 0.9rem;
    color: #264653;
  }
`;

const CommentText = styled.p`
  margin: 0.3rem 0 0 0;
  white-space: pre-wrap;
`;

const ReplyForm = styled.form`
  margin-top: 1rem;
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PaginationControls = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  button {
    padding: 0.3rem 0.8rem;
    border: 1px solid #43aa8b;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
    &:hover:not(:disabled) {
      background: #43aa8b;
      color: white;
      border-color: #2a6f61;
    }
  }
`;

const podeEditarOuExcluir = (nomeComentario, nomeAtual) => {
  return (
    nomeAtual.trim().toLowerCase() === nomeComentario.trim().toLowerCase() ||
    nomeAtual.trim() === AdminName
  );
};

export default function Comentarios({ slug }) {
  const storageKey = `comentarios_${slug}`;
  const curtidasKey = `curtidas_${slug}`;

  // Hooks no topo, obrigatório para evitar erro
  const [comentarios, setComentarios] = useState(() => {
    const salvo = localStorage.getItem(storageKey);
    return salvo ? JSON.parse(salvo) : [];
  });

  const [curtidas, setCurtidas] = useState(() => {
    const salvo = localStorage.getItem(curtidasKey);
    return salvo ? JSON.parse(salvo) : [];
  });

  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editandoTexto, setEditandoTexto] = useState("");
  const [editandoParentId, setEditandoParentId] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const comentariosPorPagina = 5;

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(comentarios));
  }, [comentarios, storageKey]);

  useEffect(() => {
    localStorage.setItem(curtidasKey, JSON.stringify(curtidas));
  }, [curtidas, curtidasKey]);

  const atualizarCurtidas = (key) => {
    setCurtidas((prev) => [...prev, key]);
  };

  const handleEnviarComentario = (e) => {
    e.preventDefault();
    setErro("");
    if (!nome.trim() || !texto.trim()) {
      setErro("Por favor, preencha seu nome e comentário.");
      return;
    }
    if (contemPalavraOfensiva(nome) || contemPalavraOfensiva(texto)) {
      setErro("Comentário recusado por conter linguagem ofensiva.");
      return;
    }
    const novoComentario = {
      id: Date.now(),
      nome: nome.trim(),
      texto: texto.trim(),
      likes: 0,
      respostas: [],
    };
    setComentarios([novoComentario, ...comentarios]);
    setNome("");
    setTexto("");
    setPaginaAtual(1);
  };

  const handleEnviarResposta = (e, id) => {
    e.preventDefault();
    setErro("");
    if (!replyText.trim()) {
      setErro("Por favor, escreva sua resposta.");
      return;
    }
    if (contemPalavraOfensiva(replyText)) {
      setErro("Resposta recusada por conter linguagem ofensiva.");
      return;
    }
    setComentarios((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              respostas: [
                ...c.respostas,
                { id: Date.now(), texto: replyText.trim(), likes: 0 },
              ],
            }
          : c
      )
    );
    setReplyingToId(null);
    setReplyText("");
  };

  const handleCurtir = (tipo, id, parentId = null) => {
    const key = parentId ? `resposta-${id}` : `comentario-${id}`;
    if (curtidas.includes(key)) {
      setErro("Você já curtiu este item.");
      return;
    }
    atualizarCurtidas(key);
    setComentarios((prev) =>
      prev.map((c) => {
        if (tipo === "comentario" && c.id === id) {
          return { ...c, likes: c.likes + 1 };
        }
        if (tipo === "resposta" && parentId && c.id === parentId) {
          return {
            ...c,
            respostas: c.respostas.map((r) =>
              r.id === id ? { ...r, likes: r.likes + 1 } : r
            ),
          };
        }
        return c;
      })
    );
  };

  const iniciarEdicao = (id, textoAtual, nomeComentario, parentId = null) => {
    if (!podeEditarOuExcluir(nomeComentario, nome)) {
      setErro("Você não tem permissão para editar este comentário.");
      return;
    }
    setEditandoId(id);
    setEditandoTexto(textoAtual);
    setEditandoParentId(parentId);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setEditandoTexto("");
    setEditandoParentId(null);
    setErro("");
  };

  const salvarEdicao = () => {
    if (editandoTexto.trim() === "") {
      setErro("Texto da edição não pode ser vazio.");
      return;
    }
    setErro("");
    if (editandoParentId) {
      setComentarios((prev) =>
        prev.map((c) =>
          c.id === editandoParentId
            ? {
                ...c,
                respostas: c.respostas.map((r) =>
                  r.id === editandoId ? { ...r, texto: editandoTexto } : r
                ),
              }
            : c
        )
      );
    } else {
      setComentarios((prev) =>
        prev.map((c) => (c.id === editandoId ? { ...c, texto: editandoTexto } : c))
      );
    }
    cancelarEdicao();
  };

  const handleExcluirComentario = (id, nomeComentario) => {
    if (!podeEditarOuExcluir(nomeComentario, nome)) {
      setErro("Você não tem permissão para excluir este comentário.");
      return;
    }
    if (!window.confirm("Tem certeza que deseja excluir este comentário?")) return;

    setComentarios(comentarios.filter((c) => c.id !== id));
  };

  const handleExcluirResposta = (parentId, id, nomeResposta) => {
    if (!podeEditarOuExcluir(nomeResposta, nome)) {
      setErro("Você não tem permissão para excluir esta resposta.");
      return;
    }
    if (!window.confirm("Tem certeza que deseja excluir esta resposta?")) return;

    setComentarios(
      comentarios.map((c) =>
        c.id === parentId
          ? { ...c, respostas: c.respostas.filter((r) => r.id !== id) }
          : c
      )
    );
  };

  const totalPaginas = Math.ceil(comentarios.length / comentariosPorPagina);
  const comentariosExibidos = comentarios.slice(
    (paginaAtual - 1) * comentariosPorPagina,
    paginaAtual * comentariosPorPagina
  );

  return (
    <CommentsContainer>
      <CommentsHeader>Comentários</CommentsHeader>
      <Warning>* Comentários ofensivos serão removidos.</Warning>

      <Form onSubmit={handleEnviarComentario}>
        <Input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          aria-label="Nome"
        />
        <Textarea
          placeholder="Seu comentário"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          aria-label="Comentário"
        />
        <Button type="submit">Enviar</Button>
        {erro && <ErrorMessage>{erro}</ErrorMessage>}
      </Form>

      {comentariosExibidos.length === 0 && <p>Seja o primeiro a comentar!</p>}

      <CommentList>
        {comentariosExibidos.map(({ id, nome: autor, texto, likes, respostas }) => (
          <CommentItem key={id}>
            <CommentHeader>
              <CommentAuthor>{autor}</CommentAuthor>
              <CommentActions>
                <button
                  onClick={() => handleCurtir("comentario", id, null, autor)}
                  aria-label={`Curtir comentário de ${autor}`}
                >
                  👍 <span>{likes}</span>
                </button>
                <button onClick={() => iniciarEdicao(id, texto, autor)}>
                  Editar
                </button>
                <button onClick={() => handleExcluirComentario(id, autor)}>
                  Excluir
                </button>
                <button
                  onClick={() =>
                    setReplyingToId(id === replyingToId ? null : id)
                  }
                >
                  {id === replyingToId ? "Cancelar" : "Responder"}
                </button>
              </CommentActions>
            </CommentHeader>
            {editandoId === id && !editandoParentId ? (
              <>
                <Textarea
                  value={editandoTexto}
                  onChange={(e) => setEditandoTexto(e.target.value)}
                  aria-label="Editar comentário"
                  rows={4}
                />
                <Button onClick={salvarEdicao}>Salvar</Button>
                <Button
                  onClick={cancelarEdicao}
                  style={{ background: "#ccc", color: "#000", marginLeft: "0.5rem" }}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <CommentText>{texto}</CommentText>
            )}
            {id === replyingToId && (
              <ReplyForm
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEnviarResposta(e, id);
                }}
              >
                <Textarea
                  placeholder="Escreva sua resposta"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  aria-label="Resposta"
                  rows={2}
                />
                <Button type="submit">Enviar Resposta</Button>
              </ReplyForm>
            )}
            {respostas.length > 0 && (
              <CommentList style={{ marginLeft: "1.5rem", marginTop: "1rem" }}>
                {respostas.map(({ id: rid, texto: rtexto, likes: rlikes }) => (
                  <CommentItem key={rid}>
                    <CommentText>
                      {editandoId === rid && editandoParentId === id ? (
                        <>
                          <Textarea
                            value={editandoTexto}
                            onChange={(e) => setEditandoTexto(e.target.value)}
                            aria-label="Editar resposta"
                            rows={3}
                          />
                          <Button onClick={salvarEdicao}>Salvar</Button>
                          <Button
                            onClick={cancelarEdicao}
                            style={{
                              background: "#ccc",
                              color: "#000",
                              marginLeft: "0.5rem",
                            }}
                          >
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        rtexto
                      )}
                    </CommentText>
                    {editandoId !== rid && (
                      <CommentActions>
                        <button
                          onClick={() => handleCurtir("resposta", rid, id, autor)}
                          aria-label={`Curtir resposta`}
                        >
                          👍 <span>{rlikes}</span>
                        </button>
                        <button onClick={() => iniciarEdicao(rid, rtexto, autor, id)}>
                          Editar
                        </button>
                        <button onClick={() => handleExcluirResposta(id, rid, autor)}>
                          Excluir
                        </button>
                      </CommentActions>
                    )}
                  </CommentItem>
                ))}
              </CommentList>
            )}
          </CommentItem>
        ))}
      </CommentList>

      {totalPaginas > 1 && (
        <PaginationControls>
          <button
            onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </PaginationControls>
      )}
    </CommentsContainer>
  );
}
