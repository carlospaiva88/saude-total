// src/components/Receitas/NutritionFacts.jsx
import React from "react";
import styled from "styled-components";

export default function NutritionFacts({ data = {}, recipe = {} }) {
  // valores com prioridades
  const calories = data.calories ?? recipe.calorias ?? recipe.calories ?? (recipe.nutritional?.calories ?? null);
  const protein = data.protein ?? recipe.proteina ?? recipe.protein ?? (recipe.nutritional?.protein ?? null);
  const carbs = data.carbs ?? recipe.carboidratos ?? recipe.carbs ?? (recipe.nutritional?.carbs ?? null);
  const fat = data.fat ?? recipe.gordura ?? recipe.fat ?? (recipe.nutritional?.fat ?? null);

  const fmt = (v, unit = "g") => (v === null || v === undefined ? `— ${unit}` : `${v} ${unit}`);

  return (
    <Card>
      <h4>Informação nutricional</h4>
      <Row><strong>{calories ?? "—"} kcal</strong></Row>
      <RowSmall>
        <Col>
          <Label>Proteína</Label>
          <Value>{protein === null || protein === undefined ? "— g" : `${protein} g`}</Value>
        </Col>
        <Col>
          <Label>Carboidratos</Label>
          <Value>{carbs === null || carbs === undefined ? "— g" : `${carbs} g`}</Value>
        </Col>
        <Col>
          <Label>Gordura</Label>
          <Value>{fat === null || fat === undefined ? "— g" : `${fat} g`}</Value>
        </Col>
      </RowSmall>
    </Card>
  );
}

const Card = styled.div`
  background: ${({theme})=>theme.colors.surfaceAlt || "#fafafa"};
  padding: .8rem;
  border-radius: 8px;
`;
const Row = styled.div`margin-bottom: .5rem;`;
const RowSmall = styled.div`display:flex; gap: .6rem;`;
const Col = styled.div`flex:1;`;
const Label = styled.div`font-size:0.8rem; color: ${({theme})=>theme.colors.secondaryDark || "#666"};`;
const Value = styled.div`font-weight:600; margin-top: .2rem;`;
