import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import recipesData from "../../data/recipes"; // objeto para acesso rápido

import Navbar from "../Navbar/Navbar";
import NavbarSpacer from "../Navbar/NavbarSpacer";
import Footer from "../Footer/Footer";
import ShareButtons from "../ShareButtons";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.light};
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 16px;
`;

const Section = styled.section`
  margin-top: 32px;

  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 12px;
  }

  ul {
    list-style: disc;
    margin-left: 20px;
    line-height: 1.6;
  }

  p {
    line-height: 1.8;
    margin-bottom: 12px;
  }
`;

const AdPlaceholder = styled.div`
  background: #f5f5f5;
  border: 2px dashed #ccc;
  border-radius: 8px;
  text-align: center;
  color: #888;
  padding: 30px;
  margin: 40px 0;
`;

export default function ReceitaPage() {
  const { slug } = useParams();

  // busca no objeto recipesData (funciona tanto para slug quanto friendlySlug)
  const receita = recipesData[slug];

  if (!receita) {
    return (
      <>
        <Navbar />
        <NavbarSpacer />
        <Container>
          <h1>Receita não encontrada 😔</h1>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{receita.title} | Viva no Flow</title>
        <meta name="description" content={receita.description} />
      </Helmet>

      <Navbar />
      <NavbarSpacer />
      <Container>
        <Image src={receita.image} alt={receita.title} />
        <Title>{receita.title}</Title>
        <p>{receita.description}</p>

        <AdPlaceholder>Espaço para Google AdSense</AdPlaceholder>

        <Section>
          <h2>Ingredientes</h2>
          <ul>
            {receita.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section>
          <h2>Modo de preparo</h2>
          {receita.instructions?.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </Section>

        <AdPlaceholder>Espaço para banner de afiliados</AdPlaceholder>

        <ShareButtons title={receita.title} url={window.location.href} />
      </Container>
      <Footer />
    </>
  );
}
