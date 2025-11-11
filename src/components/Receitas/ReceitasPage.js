import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import RecipeHeroCarousel from "./RecipeHeroCarousel";
import receitas from "../../data/receitas";

export default function ReceitasPage() {
  // Concatenar todas as receitas
  const todasReceitas = [
    ...receitas.fitness,
    ...receitas.salgadas,
    ...receitas.doces,
  ];

  // Categorias para o menu
  const categorias = [
    { slug: "fitness", nome: "Fitness" },
    { slug: "salgadas", nome: "Salgadas" },
    { slug: "doces", nome: "Doces" },
  ];

  // Estado para categoria ativa
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");

  // Filtrar receitas de acordo com a categoria
  const receitasFiltradas =
    categoriaAtiva === "todas"
      ? todasReceitas
      : todasReceitas.filter((r) => {
          if (categoriaAtiva === "fitness") return receitas.fitness.includes(r);
          if (categoriaAtiva === "salgadas") return receitas.salgadas.includes(r);
          if (categoriaAtiva === "doces") return receitas.doces.includes(r);
          return true;
        });

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      <PageContainer>
        {/* Carousel de receitas */}
        <RecipeHeroCarousel receitas={todasReceitas} />

        {/* Menu de categorias */}
        <CategoriesMenu>
          <CategoryButton
            active={categoriaAtiva === "todas"}
            onClick={() => setCategoriaAtiva("todas")}
          >
            Todas
          </CategoryButton>
          {categorias.map((cat) => (
            <CategoryButton
              key={cat.slug}
              active={categoriaAtiva === cat.slug}
              onClick={() => setCategoriaAtiva(cat.slug)}
            >
              {cat.nome}
            </CategoryButton>
          ))}
        </CategoriesMenu>

        {/* Grid de receitas */}
        <RecipesGrid>
            {receitasFiltradas.map((receita) => (
              <RecipeCard key={receita.slug}>
                <Link to={`/receitas/${receita.slug}`}>
                  <ImageWrapper>
                    <img src={receita.imagem} alt={receita.titulo} />
                  </ImageWrapper>
                  <CardContent>
                    <h3>{receita.titulo}</h3>
                    <p>{receita.descricaoCurta}</p>
                    <CategoryLabel>
                      <Link to={`/receitas/categoria/${receita.categoria.toLowerCase()}`}>
                        {receita.categoria}
                      </Link>
                    </CategoryLabel>
                  </CardContent>
                </Link>
              </RecipeCard>
            ))}
        </RecipesGrid>


        {/* CTA final para ebook */}
        <CTASection>
          <h2>Quer mais receitas e dicas exclusivas?</h2>
          <p>Baixe agora nosso ebook gratuito e transforme sua alimentação!</p>
          <CTAButton href="ebooks/viva_no_flow.pdf">Baixar Ebook Grátis</CTAButton>
        </CTASection>
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
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Menu de categorias estilo blogs internacionais
const CategoriesMenu = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  justify-content: center;
  margin: 2rem 0;
  gap: 1rem;
  padding-bottom: 0.5rem;

  /* Remover scrollbar visual no Chrome/Safari */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button`
  flex: 0 0 auto;
  background: ${(props) => (props.active ? "#2a9d8f" : "#e9c46a")};
  color: ${(props) => (props.active ? "white" : "#264653")};
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #21867a;
    color: white;
  }
`;

// Grid de receitas responsivo
const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const RecipeCard = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${RecipeCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const CardContent = styled.div`
  padding: 1rem;

  h3 {
    font-size: 1.3rem;
    color: #2a9d8f;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  p {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const CategoryLabel = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  background: #e9c46a;
  color: #264653;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const CTASection = styled.section`
  text-align: center;
  margin-top: 4rem;
  background: #f4a261;
  color: white;
  padding: 3rem 1rem;
  border-radius: 1rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }

  p {
    max-width: 500px;
    margin: 0 auto 1.5rem;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background: white;
  color: #e76f51;
  font-weight: bold;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #ffe8d6;
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
  }
`;
