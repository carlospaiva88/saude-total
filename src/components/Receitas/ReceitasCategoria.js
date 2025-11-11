import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import receitas  from "../../data/receitas/index";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


export default function ReceitasCategoria() {
  const { categoria } = useParams();
  const categoriaNome = categoria.charAt(0).toUpperCase() + categoria.slice(1);

  const receitasFiltradas = receitas.filter(
    (r) => r.categoria.toLowerCase() === categoriaNome.toLowerCase()
  );

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      <PageContainer>
        <h2>Receitas de {categoriaNome}</h2>
        <RecipesGrid>
          {receitasFiltradas.map((receita) => (
            <RecipeCard key={receita.slug}>
              <Link to={`/receitas/${receita.slug}`}>
                <img src={receita.imagem} alt={receita.titulo} />
                <h3>{receita.titulo}</h3>
              </Link>
            </RecipeCard>
          ))}
        </RecipesGrid>
      </PageContainer>

      <Footer />
    </>
  );
}

const NavbarSpacer = styled.div`
  height: 80px;
`;

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const RecipeCard = styled.div`
  background: #fff;
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  h3 {
    padding: 1rem;
    color: #2a9d8f;
  }
`;
