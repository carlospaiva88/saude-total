import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ProductCard from "../ProductCard/ProductCard";
import productsData from "../../data/products";

// Animação fade-in para os cards
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Wrapper animado para cada card
const AnimatedCard = styled.div`
  opacity: 0;
  animation: ${css`${fadeInUp} 0.5s forwards`};
  animation-delay: ${props => props.delay || 0}s;
`;

export default function ProductsPage() {
  const todasCategorias = productsData.categories;
  const todosProdutos = productsData.products;

  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");

  // Filtra produtos de acordo com a categoria
  const produtosFiltrados =
    categoriaAtiva === "todos"
      ? todosProdutos
      : todosProdutos.filter((p) => p.category === categoriaAtiva);

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      <PageContainer>
        {/* Hero premium */}
        <HeroSection>
          <HeroOverlay />
          <HeroContent>
            <h1>Eleve Seu Jogo com Produtos Premium</h1>
            <p>Suplementos, acessórios e vitaminas para melhorar seu desempenho.</p>
            <HeroCTA onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>
              Compre Agora
            </HeroCTA>
          </HeroContent>
        </HeroSection>

        {/* Menu de categorias centralizado */}
        <CategoryMenu role="tablist" aria-label="Seleção de categorias">
          <CategoryButton
            role="tab"
            aria-selected={categoriaAtiva === "todos"}
            onClick={() => setCategoriaAtiva("todos")}
            aria-current={categoriaAtiva === "todos" ? "true" : "false"}
          >
            Todos
          </CategoryButton>
          {todasCategorias.map((cat) => (
            <CategoryButton
              key={cat.id}
              role="tab"
              aria-selected={categoriaAtiva === cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              aria-current={categoriaAtiva === cat.id ? "true" : "false"}
            >
              {cat.name}
            </CategoryButton>
          ))}
        </CategoryMenu>

        {/* Grid de produtos filtrados */}
        <ProductsGrid>
          {produtosFiltrados.map((product, index) => (
            <AnimatedCard key={product.id} delay={index * 0.1}>
              <ProductCard
                product={product}
                onBuy={() => window.open(product.affiliateLink, "_blank")}
              />
            </AnimatedCard>
          ))}
        </ProductsGrid>
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
  padding: 2rem 4rem;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: 1rem 2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.7)
    ),
    url("https://www.pexels.com/download/video/6388396/");
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.surface};
  max-width: 700px;
  padding: 0 1rem;

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 900;
    font-size: 3rem;
    margin-bottom: 1rem;
    line-height: 1.1;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);

    @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
      font-size: 2.2rem;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: 1.8rem;
    }
  }

  p {
    font-weight: 400;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  }
`;

const HeroCTA = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
`;

const CategoryButton = styled.button`
  flex: 0 0 auto;
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: ${({ theme, 'aria-current': current }) =>
    current === "true" ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme, 'aria-current': current }) =>
    current === "true" ? theme.colors.surface : theme.colors.dark};
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
`;
