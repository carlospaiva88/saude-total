import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";

// Importar cards e dados
import { articlesArray } from "../../data/articles/index";
import recipes  from "../../data/receitas/index";
import products  from "../../data/products";

// Componente base de Card
import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardDescription,
  CardButton
} from "../../components/CardBase/cardBase";

import { Link } from "react-router-dom";

export default function HealthToolsPage() {
  // Recomendação automática
  const artigosRecomendados = articlesArray.slice(0, 3);
  const receitasRecomendadas = recipes.slice(0, 3);
  const produtosRecomendados = products.slice(0, 3);

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      <Container>
        <Title>Ferramentas de Saúde</Title>
        <Subtitle>
          Cuidar da saúde começa com autoconhecimento. Utilize nossas calculadoras
          científicas e descubra exatamente o que seu corpo precisa.
        </Subtitle>

        {/* Seção — Cards das Calculadoras */}
        <SectionTitle>Calculadoras Disponíveis</SectionTitle>
        <CardsGrid>
          <ToolCard
            title="Calculadora de IMC"
            img="https://img.freepik.com/premium-vector/bmi-body-mass-index-banner-flat-cartoon-style-vector-illustration_131590-273.jpg"
            desc="Descubra se seu peso está dentro da faixa ideal para sua altura."
            link="/calculadora-imc"
          />

          <ToolCard
            title="Calculadora TMB"
            img="https://img.freepik.com/premium-vector/health-metabolism-vector-concept-illustration_108061-658.jpg"
            desc="Saiba quantas calorias seu corpo precisa em repouso."
            link="/calculadora-tmb"
          />

          <ToolCard
            title="Calculadora Calórica"
            img="https://img.freepik.com/free-vector/calorie-counting-concept-illustration_114360-9517.jpg"
            desc="Calcule quantas calorias você precisa por dia para emagrecer ou ganhar massa."
            link="/calculadora-calorica"
          />
        </CardsGrid>

        {/* Seção — Conteúdos Educacionais */}
        <SectionTitle>Aprenda Mais Sobre Sua Saúde</SectionTitle>
        <TextBlock>
          Nosso objetivo é transformar informação científica em algo prático e acessível.
          Nossas ferramentas são baseadas em equações certificadas utilizadas mundialmente
          por nutricionistas, médicos e fisiologistas.
        </TextBlock>

        {/* Seção — Artigos Recomendados */}
        <SectionTitle>Artigos Recomendados</SectionTitle>
        <CardsGrid>
          {artigosRecomendados.map((a) => (
            <Link key={a.slug} to={`/blog/${a.friendlySlug}`}>
              <CardBase>
                <CardImage src={a.image} alt={a.title} />
                <CardBody>
                  <CardTitle>{a.title}</CardTitle>
                  <CardDescription>{a.excerpt}</CardDescription>
                  <CardButton>Ler artigo</CardButton>
                </CardBody>
              </CardBase>
            </Link>
          ))}
        </CardsGrid>

        {/* Receitas Recomendadas */}
        <SectionTitle>Receitas Saudáveis</SectionTitle>
        <CardsGrid>
          {receitasRecomendadas.map((r) => (
            <Link key={r.id} to={`/receitas/${r.slug}`}>
              <CardBase>
                <CardImage src={r.image} alt={r.title} />
                <CardBody>
                  <CardTitle>{r.title}</CardTitle>
                  <CardDescription>{r.description}</CardDescription>
                  <CardButton>Ver receita</CardButton>
                </CardBody>
              </CardBase>
            </Link>
          ))}
        </CardsGrid>

        {/* Produtos Recomendados */}
        <SectionTitle>Produtos Recomendados</SectionTitle>
        <CardsGrid>
          {produtosRecomendados.map((p) => (
            <Link key={p.id} to={`/produtos/${p.slug}`}>
              <CardBase>
                <CardImage src={p.image} alt={p.name} />
                <CardBody>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                  <CardButton>Ver produto</CardButton>
                </CardBody>
              </CardBase>
            </Link>
          ))}
        </CardsGrid>
      </Container>
      <Footer />
    </>
  );
}

// ------------------------------
// COMPONENTE CARD DA CALCULADORA
// ------------------------------
function ToolCard({ title, img, desc, link }) {
  return (
    <Link to={link}>
      <CardBase>
        <CardImage src={img} alt={title} />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
          <CardButton>Acessar</CardButton>
        </CardBody>
      </CardBase>
    </Link>
  );
}

// ------------------------------
// ESTILOS
// ------------------------------

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 30px 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 38px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto 40px;
  color: #555;
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  margin: 40px 0 20px;
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const TextBlock = styled.p`
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #444;
`;
