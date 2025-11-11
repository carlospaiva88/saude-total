import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import receitas  from "../../data/receitas/index";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BreadcrumbsViagens from "../BreadcrumbsViagens";

export default function ReceitaPage() {
  const { slug } = useParams();

  const todasReceitas = [
    ...receitas.fitness,
    ...receitas.salgadas,
    ...receitas.doces,
  ];

  const receita = todasReceitas.find((r) => r.slug === slug);

  if (!receita) {
    return (
      <NotFoundContainer>
        <h2>Receita não encontrada 😢</h2>
        <Link to="/receitas">Voltar para Receitas</Link>
      </NotFoundContainer>
    );
  }

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      <PageContainer>
        <ImageHero src={receita.imagem} alt={receita.titulo} />
        <BreadcrumbsViagens
            paths={[
            { name: "Receitas", url: "/receitas" },
            { name: receita.categoria, url: `/receitas/categoria/${receita.categoria.toLowerCase()}` },
            { name: receita.titulo, url: `/receitas/${receita.slug}` },
          ]}
        />
        <Content>
          <h1>{receita.titulo}</h1>
          <Info>
            <span>⏱ {receita.tempo || "—"}</span>
            <span>🔥 {receita.calorias || "—"} kcal</span>
            <span>🏷 {receita.categoria}</span>
          </Info>

          <Section>
            <h3>Ingredientes</h3>
            <ul>
              {receita.ingredientes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section>
            <h3>Modo de preparo</h3>
            <ol>
              {receita.instrucoes.map((etapa, i) => (
                <li key={i}>{etapa}</li>
              ))}
            </ol>
          </Section>

          <BackButton to="/receitas">← Voltar</BackButton>
        </Content>
      </PageContainer>

      <Footer />
    </>
  );
}

// Styled Components
const NavbarSpacer = styled.div`
  height: 80px;
`;

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const ImageHero = styled.img`
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  height: 400px;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  h1 {
    color: #264653;
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 2rem;

  span {
    background: #e9c46a;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;

  h3 {
    color: #2a9d8f;
    margin-bottom: 0.8rem;
  }

  ul,
  ol {
    padding-left: 1.2rem;
    line-height: 1.6;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  background: #2a9d8f;
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: #21867a;
  }
`;

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 3rem;
  h2 {
    margin-bottom: 1rem;
  }
  a {
    color: #2a9d8f;
    text-decoration: none;
  }
`;
