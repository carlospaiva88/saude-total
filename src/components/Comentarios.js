// src/components/Comentarios/index.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DOMPurify from "dompurify";
import slugify from "slugify";
import profanityFilter from "./utils/profanityFilter"; 

const STORAGE_PREFIX = "vivanoflow:comments:";

function loadComments(slug) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + slug);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveComments(slug, comments) {
  try {
    localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(comments));
  } catch {}
}

export default function Comentarios({ slug }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", text: "" });
  const [sending, setSending] = useState(false);
  const storageKey = slug || "unknown";

  useEffect(() => {
    if (open) {
      const saved = loadComments(storageKey);
      setComments(saved);
    }
  }, [open, storageKey]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    const cleanedText = profanityFilter(form.text);
    const id = slugify(`${Date.now()}-${(form.name||"anon").slice(0,10)}`, { lower: true, strict: true });
    const comment = {
      id,
      name: DOMPurify.sanitize(form.name || "Anônimo"),
      email: DOMPurify.sanitize(form.email || ""),
      text: DOMPurify.sanitize(cleanedText),
      createdAt: new Date().toISOString(),
      approved: false,
      pending: true
    };

    const next = [comment, ...comments];
    setComments(next);
    saveComments(storageKey, next);
    setForm({ name: "", email: "", text: "" });
    setSending(true);

    setTimeout(() => {
      setSending(false);
      saveComments(storageKey, next);
    }, 800);
  };

  const approveLocal = (id) => {
    const updated = comments.map(c => c.id === id ? { ...c, approved: true, pending: false } : c);
    setComments(updated); saveComments(storageKey, updated);
  };

  const removeLocal = (id) => {
    const updated = comments.filter(c => c.id !== id);
    setComments(updated); saveComments(storageKey, updated);
  };

  return (
    <Wrapper>
      <Header>
        <h3>Comentários</h3>
        <Controls>
          <small>{comments.filter(c => c.approved).length} aprovados</small>
          <Toggle onClick={() => setOpen(v => !v)} aria-expanded={open}>{open ? "Fechar" : "Abrir comentários"}</Toggle>
        </Controls>
      </Header>

      {open ? (
        <>
          <Form onSubmit={onSubmit} aria-label="Formulário de comentário">
            <Row>
              <Input placeholder="Seu nome (opcional)" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
              <Input placeholder="Email (opcional)" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
            </Row>
            <Textarea placeholder="Escreva seu comentário..." value={form.text} onChange={(e)=>setForm({...form, text: e.target.value})} />
            <FormActions>
              <small>Seja gentil — comentários com discurso de ódio serão removidos.</small>
              <div>
                <Send type="submit" disabled={sending}>{sending ? "Enviando…" : "Enviar comentário"}</Send>
              </div>
            </FormActions>
          </Form>

          <List role="list">
            {comments.length === 0 && <Empty>Nenhum comentário — seja o primeiro!</Empty>}
            {comments.map(c => (
              <Comment key={c.id} role="listitem" aria-live="polite">
                <MetaRow>
                  <strong>{c.name || "Anônimo"}</strong>
                  <time dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleString()}</time>
                </MetaRow>

                <Text dangerouslySetInnerHTML={{ __html: c.text }} />

                <CommentActions>
                  {!c.approved && <Tag>pendente</Tag>}
                  {c.pending && <Tag small>gravação local</Tag>}
                  <SmallBtn onClick={() => approveLocal(c.id)} title="Aprovar (local)">Aprovar</SmallBtn>
                  <SmallBtn onClick={() => removeLocal(c.id)} title="Remover">Remover</SmallBtn>
                </CommentActions>
              </Comment>
            ))}
          </List>
        </>
      ) : null}
    </Wrapper>
  );
}

/* Styled (mesmo que antes) */
const Wrapper = styled.section`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
`;
const Header = styled.div`display:flex; justify-content:space-between; align-items:center; margin-bottom:.5rem;`;
const Controls = styled.div`display:flex; gap:1rem; align-items:center;`;
const Toggle = styled.button`background:none;border:0;color:${({ theme }) => theme.colors.primary};cursor:pointer;font-weight:600`;
const Form = styled.form`display:block;margin-bottom:1rem;`;
const Row = styled.div`display:flex; gap:.6rem; margin-bottom:.6rem; @media(max-width:480px){flex-direction:column}`;
const Input = styled.input`flex:1;padding:.6rem;border:1px solid ${({ theme }) => theme.colors.border};border-radius:8px;font-size:0.95rem;`;
const Textarea = styled.textarea`width:100%;min-height:110px;padding:.6rem;border:1px solid ${({ theme }) => theme.colors.border};border-radius:8px;font-size:0.95rem;`;
const FormActions = styled.div`display:flex;justify-content:space-between;align-items:center;margin-top:.5rem; small{color:${({ theme }) => theme.colors.text};opacity:.85}`;
const Send = styled.button`background:${({ theme }) => theme.colors.primary};color:white;border:0;padding:.6rem 1rem;border-radius:${({ theme }) => theme.radius.pill};cursor:pointer;`;
const List = styled.div`margin-top:1rem; display:flex; flex-direction:column; gap:.8rem;`;
const Empty = styled.div`color:${({ theme }) => theme.colors.text};opacity:.8;padding:1rem 0;text-align:center;`;
const Comment = styled.article`padding:.8rem;border-radius:8px;background:rgba(0,0,0,0.02)`;
const MetaRow = styled.div`display:flex;justify-content:space-between;font-size:0.85rem;color:${({ theme }) => theme.colors.text};margin-bottom:.4rem`;
const Text = styled.div`font-size:0.95rem;color:${({ theme }) => theme.colors.text};`;
const CommentActions = styled.div`display:flex;gap:.5rem;margin-top:.6rem;align-items:center`;
const Tag = styled.span`background:${({ theme }) => theme.colors.background};padding:.25rem .5rem;border-radius:6px;font-size:0.8rem;border:1px dashed ${({ theme }) => theme.colors.border}`;
const SmallBtn = styled.button`background:none;border:0;color:${({ theme }) => theme.colors.primaryDark};cursor:pointer;font-size:0.85rem`;
