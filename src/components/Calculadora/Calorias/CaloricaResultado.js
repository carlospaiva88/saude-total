import React from "react";
import SectionCard from "../shared/SectionCard";
import styled from "styled-components";

export default function CaloricaResultado({ resultado }) {
  if (!resultado) return null;

  return (
    <SectionCard title="Seu Resultado">
      <p><strong>TMB:</strong> {resultado.tmb} kcal</p>
      <p><strong>Manutenção:</strong> {resultado.manutencao} kcal/dia</p>

      <MacroBox>
        <div><strong>Proteínas:</strong> {resultado.proteinaGr}g</div>
        <div><strong>Carboidratos:</strong> {resultado.carboGr}g</div>
        <div><strong>Gorduras:</strong> {resultado.gorduraGr}g</div>
      </MacroBox>
    </SectionCard>
  );
}

const MacroBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  div {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    padding: 0.8rem;
    border-radius: 8px;
    width: 32%;
    text-align: center;
  }
`;
