// src/components/Blog/ContinueExploring.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { recommend } from "../../utils/recommender"; 

export default function ContinueExploring({ posts = [], receitas = [] }) {
  // Tentamos recomendações com fallback
  const rec = recommend ? recommend({ limit: 6 }) : { articles: posts.slice(0,3), recipes: receitas.slice(0,3), products: [] };

  const articles = rec.articles || posts.slice(0,3);
  const recipes = rec.recipes || receitas.slice(0,3);
  const products = rec.products || [];

  return (
    <Wrapper>
      <Heading>Continue explorando</Heading>

      <Grid>
        <Column>
          <SmallHeading>Artigos recomendados</SmallHeading>
          {articles.map(a => (
            <Card key={a.slug || a.id} to={`/blog/${a.category || a.categoria || "geral"}/${a.slug || a.friendlySlug || a.id}`}>
              <img src={a.image || a.imagem} alt={a.title || a.titulo} />
              <div>
                <strong>{a.title || a.titulo}</strong>
                <p>{(a.excerpt || a.description || a.descricao || "").slice(0, 90)}...</p>
              </div>
            </Card>
          ))}
        </Column>

        <Column>
          <SmallHeading>Receitas sugeridas</SmallHeading>
          {recipes.map(r => (
            <Card key={r.slug} to={`/receitas/${r.slug}`}>
              <img src={r.imagem || r.image} alt={r.titulo || r.title} />
              <div>
                <strong>{r.titulo}</strong>
                <p>{(r.descricaoCurta || r.descricao || "").slice(0, 90)}...</p>
              </div>
            </Card>
          ))}
        </Column>

        <Column>
          <SmallHeading>Produtos</SmallHeading>
          {products.length ? products.map(p => (
            <ProductCard key={p.id} href={p.affiliateLink} target="_blank" rel="noopener noreferrer">
              <img src={p.image} alt={p.name} />
              <div>
                <strong>{p.name}</strong>
                <p>{p.description?.slice(0, 90)}</p>
              </div>
            </ProductCard>
          )) : <Empty>No momento, sem produtos recomendados</Empty>}
        </Column>
      </Grid>
    </Wrapper>
  );
}

/* Styled */
const Wrapper = styled.section`
  margin-top: 1.6rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
`;

const Heading = styled.h3`
  margin: 0 0 0.6rem 0;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
`;

const SmallHeading = styled.h4`
  margin: 0 0 0.6rem 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.95rem;
`;

const Card = styled(Link)`
  display:flex;
  gap:0.6rem;
  align-items:flex-start;
  text-decoration:none;
  color: inherit;
  padding: 0.45rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  img { width: 84px; height: 64px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  strong { display:block; color: ${({ theme }) => theme.colors.primaryDark}; font-size: 0.95rem; }
  p { font-size: 0.85rem; color: ${({ theme }) => theme.colors.text}; margin: 0.15rem 0 0; }
`;

const ProductCard = styled.a`
  display:flex;
  gap:0.6rem;
  align-items:flex-start;
  text-decoration:none;
  color: inherit;
  padding: 0.45rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  img { width: 84px; height: 64px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  strong { display:block; color: ${({ theme }) => theme.colors.primaryDark}; font-size: 0.95rem; }
  p { font-size: 0.85rem; color: ${({ theme }) => theme.colors.text}; margin: 0.15rem 0 0; }
`;

const Empty = styled.div` padding: 0.6rem 0; color: ${({ theme }) => theme.colors.text}; `;
