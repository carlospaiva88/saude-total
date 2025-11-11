import React from "react";
import { useParams, Link } from "react-router-dom";
import receitasData from "../../data/receitas";
import {
  ReceitaDetalhe,
  Breadcrumb,
  ReceitaHero,
  ReceitaConteudo,
  ReceitasRelacionadas,
} from "./ReceitaPage.styles";

export default function ReceitaPage() {
  const { slug } = useParams();
  const receita = receitasData.find((r) => r.slug === slug);

  if (!receita) {
    return (
      <ReceitaDetalhe>
        <h2>Receita não encontrada 😕</h2>
        <Link to="/receitas">Voltar às receitas</Link>
      </ReceitaDetalhe>
    );
  }

  const relacionadas = receitasData
    .filter(
      (r) => r.categoria === receita.categoria && r.slug !== receita.slug
    )
    .slice(0, 3);

  return (
    <ReceitaDetalhe>
      <Breadcrumb>
        <Link to="/">Início</Link> / <Link to="/receitas">Receitas</Link> /{" "}
        <span>{receita.titulo}</span>
      </Breadcrumb>

      <ReceitaHero>
        <img src={receita.imagem} alt={receita.titulo} />
        <div className="receita-meta">
          <h1>{receita.titulo}</h1>
          <p>{receita.descricao}</p>
          <span>{receita.categoria}</span>
          <span>Tempo: {receita.tempoPreparo}</span>
          <span>Dificuldade: {receita.dificuldade}</span>
        </div>
      </ReceitaHero>

      <ReceitaConteudo>
        <section>
          <h2>Ingredientes</h2>
          <ul>
            {receita.ingredientes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Modo de preparo</h2>
          <ol>
            {receita.modoPreparo.map((etapa, i) => (
              <li key={i}>{etapa}</li>
            ))}
          </ol>
        </section>
      </ReceitaConteudo>

      {relacionadas.length > 0 && (
        <ReceitasRelacionadas>
          <h3>Outras receitas {receita.categoria.toLowerCase()}:</h3>
          <div className="grid-relacionadas">
            {relacionadas.map((r) => (
              <Link key={r.slug} to={`/receitas/${r.slug}`} className="card-relacionada">
                <img src={r.imagem} alt={r.titulo} />
                <p>{r.titulo}</p>
              </Link>
            ))}
          </div>
        </ReceitasRelacionadas>
      )}
    </ReceitaDetalhe>
  );
}
