import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import receitas from "../../data/receitas";

export default function HomeReceitasSection() {
  // Concatenar todas as receitas
  const todasReceitas = [
    ...receitas.fitness,
    ...receitas.salgadas,
    ...receitas.doces,
  ];

  // Filtrar apenas receitas em destaque
  const receitasDestaque = todasReceitas.filter(r => r.destaque);

  return (
    <SectionContainer>
      <SectionTitle>Receitas em Destaque</SectionTitle>
      <RecipesGrid>
        {receitasDestaque.map((receita) => (
        <RecipeCard key={receita.slug}>
          <Link to={`/receitas/${receita.slug}`}>
            <ImageWrapper>
              <img src={receita.imagem} alt={receita.titulo} />
            </ImageWrapper>
            <CardContent>
              <h3>{receita.titulo}</h3>
              <p>{receita.descricaoCurta}</p>
            </CardContent>
          </Link>
        </RecipeCard>
        ))}

      </RecipesGrid>
    </SectionContainer>
  );
}

// Styled Components
const SectionContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #264653;
  font-size: 2rem;
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
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
`;

const CardContent = styled.div`
  padding: 1rem;

  h3 {
    font-size: 1.2rem;
    color: #2a9d8f;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #555;
  }
`;
