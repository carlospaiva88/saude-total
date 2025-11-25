// src/components/Receitas/RecipeGrid.jsx
import React from "react";
import styled from "styled-components";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ receitas = [] }) {
  return (
    <Grid role="list">
      {receitas.map((r) => (
        <Item key={r.slug} role="listitem">
          <RecipeCard receita={r} />
        </Item>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  margin-bottom: 2rem;
`;

const Item = styled.div``;
