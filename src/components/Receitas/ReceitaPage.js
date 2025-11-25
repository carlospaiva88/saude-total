// src/pages/ReceitaPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import receitas from "../../data/receitas/index";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import BreadcrumbsViagens from "../BreadcrumbsViagens";
import RecipeHeroCarousel from "../../components/Receitas/RecipeHeroCarousel";
import SocialShare from "../../components/SocialShare";
import ProductRecommended from "../../components/ProductRecommended";
import SidebarWidgets from "../../components/SidebarWidgets";
import EbookCard from "../../components/EbookCard";
import ReviewWidget from "../../components/Receitas/ReviewWidget"
import NutritionFacts from "../../components/Receitas/NutritionFacts"
import TipsBox from "../../components/Receitas/TipsBox"
import SavePrintButtons from "../../components/Receitas/SavePrintsButtons"
import RelatedCarousel from "../../components/RelatedCarousel";
import RecipeCard from "../../components/Receitas/RecipeCard"
import RecipeInfoPanel from "./RecipeInfoPanes";

import { getReceitasRecomendadas } from "../../data/receitas/index";

export default function ReceitaPage() {
  const { slug } = useParams();

  const todasReceitas = [
    ...(receitas.fitness || []),
    ...(receitas.salgadas || []),
    ...(receitas.doces || []),
    ...(receitas.veganas || []),
  ].filter(Boolean); // remove entries undefined

  const receita = todasReceitas.find((r) => r.slug === slug);

  if (!receita) {
    return (
      <>
        <Navbar />
        <NavbarSpacer />
        <NotFoundContainer>
          <h2>Receita não encontrada 😢</h2>
          <Link to="/receitas">Voltar para Receitas</Link>
        </NotFoundContainer>
        <Footer />
      </>
    );
  }

 const related = getReceitasRecomendadas(receita.slug, 12).filter(r => r.slug !== receita.slug);


  // produto recomendado para essa receita (exemplo: receita.product ou fallback editorial)
  const recommendedProduct = receita.product || {
    name: "Kit de Cozinha Essencial",
    image: "https://m.media-amazon.com/images/I/71KnEz1kViL._AC_SY300_SX300_QL70_ML2_.jpg",
    price: "39.90",
    link: "https://amzn.to",
    rating: "4.6",
    reviews: 124,
  };

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      {/* share fixed top-right (sticky while scroll) */}
      <ShareFixed role="region" aria-label="Compartilhar esta receita">
        <SocialShare url={typeof window !== "undefined" ? window.location.href : ""} title={receita.titulo} vertical />
      </ShareFixed>

      <RecipeHeroCarousel receitas={todasReceitas} />

      <PageContainer>

        <TopRow>
          <BreadcrumbsViagens
            paths={[
              { name: "Receitas", url: "/receitas" },
              { name: receita.categoria, url: `/receitas/categoria/${receita.categoria?.toLowerCase()}` },
              { name: receita.titulo, url: `/receitas/${receita.slug}` },
            ]}
          />
        </TopRow>

        <MainGrid>
          <ContentArea>
            <ImageHero src={receita.imagem} alt={receita.titulo} />
            <Title>{receita.titulo}</Title>

            <Info>
               <span>⏱ {receita.tempo || "—"}</span>
                <span>🔥 {receita.calorias || "—"} kcal</span>
                <span>🏷 {receita.categoria}</span> 
            </Info>

            <Section>
              <h3>Ingredientes</h3>
              <ul>
                {receita.ingredientes?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <TipsBox tips={[
              "Substitua o creme por iogurte grego para versão mais leve.",
              "Para mais crocância, torre as castanhas antes de adicionar."
            ]} />

             <AsideWrapper aria-labelledby="dicas-chef-title">
              <ChefTipsHeader id="dicas-chef-title">Dicas do chef</ChefTipsHeader>

              <TwoCols>
                <ColLeft>
                  <NutritionFacts data={receita.nutritional} recipe={receita} />
                </ColLeft>

                <Divider aria-hidden />

                <ColRight>
                  <RecipeInfoPanel receita={receita} />
                </ColRight>
              </TwoCols>

              <BottomActions>
                <SavePrintButtons recipe={receita} />
                {/* CTA discreto para ebook — opcional */}
                <a href="/ebooks/viva_no_flow.pdf" target="_blank" rel="noreferrer" style={{ marginLeft: 8, textDecoration: "none" }}>
                  <small>📘 Baixe nosso ebook de receitas</small>
                </a>
              </BottomActions>
            </AsideWrapper>
              

            </Section>

            <Section>
              <h3>Modo de preparo</h3>
              <ol>
                {receita.instrucoes?.map((etapa, i) => (
                  <li key={i}>{etapa}</li>
                ))}
              </ol>
                <ReviewWidget recipeSlug={receita.slug} />

            </Section>

            {/* Ebook CTA profissional integrando o download */}
            <EbookWrapper>
              <EbookCard
                href="/ebooks/viva_no_flow.pdf"
                title="Ebook: Receitas que Transformam"
                subtitle="Receitas práticas, saudáveis e prontas para o dia a dia"
                cta="Baixar Ebook Grátis"
              />
            </EbookWrapper>

           

            {/* Produto recomendado (editorial) logo abaixo de "mais receitas" / conteúdo */}
            <ProductArea>
              <h3>Produto recomendado</h3>
              <ProductRecommended product={recommendedProduct} />
            </ProductArea>
          </ContentArea>

          <SideArea>
            {/* Sidebar Widgets: newsletter/ebook, tags, mini-carousel, anuncio, etc. */}
            <SidebarWidgets
              recipe={receita}
              related={related.slice(0, 6)}
            />
          </SideArea>
        </MainGrid>
        
      </PageContainer>
       <RelatedCarousel items={related} renderCard={(r) => <RecipeCard recipe={r} />} />

      <Footer />
    </>
  );
}

/* ---------- Styled (local) ---------- */

const ShareFixed = styled.div`
  position: fixed;
  top: 110px;
  right: 20px;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 980px) {
    display: none;
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-sizing: border-box;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ContentArea = styled.main``;
const SideArea = styled.aside``;

const ImageHero = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 0.6rem;
  font-size: 2rem;
`;

const Info = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;

  meta, span { background: #e9c46a; padding: 0.35rem .6rem; border-radius: 999px; display:inline-block; }
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
  h3 { color: ${({ theme }) => theme.colors.primary}; margin-bottom: .6rem; }
`;

const EbookWrapper = styled.div`
  margin: 1.25rem 0;
`;



const ProductArea = styled.section`
  margin-top: 1.8rem;
`;

const NotFoundContainer = styled.div`
text-align: center;
padding: 3rem;

h2 {
margin-bottom: 1rem;
}

a {
color: ${({ theme }) => theme.colors.primary};
}
`;

/* Aside / painel lateral */
const AsideWrapper = styled.aside`
  display: block;
  margin-top: 1.5rem;
  width: 100%;
`;

/* Título da seção */
const ChefTipsHeader = styled.h3`
  margin: 0 0 0.8rem 0;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

/* TwoCols: grid responsivo com divisor */
const TwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 320px; /* left fluid, tiny divider, right fixed */
  gap: 1rem;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr; /* empilha em telas pequenas */
  }
`;

/* Colunas */
const ColLeft = styled.div`
  min-width: 0;
`;

const ColRight = styled.div`
  min-width: 0;
`;

/* Divider vertical */
const Divider = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.colors.border || "#eee"};
  border-radius: 1px;
  margin: 0;
  @media (max-width: 980px) {
    display: none;
  }
`;

/* Ações embaixo (salvar / imprimir / compartilhar alternatives) */
const BottomActions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;