import React from "react";
import styled from "styled-components";

export default function RecipeInfoPanel({ receita = {} }) {
  const { porcoes, tempo, dificuldade, categoria } = receita || {};

  return (
    <Panel role="region" aria-label="Informações da receita">
      <InfoRow>
        <Label>Porções</Label>
        <Value>{porcoes ?? "—"}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Tempo</Label>
        <Value>{tempo ?? "—"}</Value>
      </InfoRow>
      <InfoRow>
        <Label>Dificuldade</Label>
        <Value>{dificuldade ?? "—"}</Value>
      </InfoRow>
      {categoria && (
        <InfoRow>
          <Label>Categoria</Label>
          <Value>{categoria}</Value>
        </InfoRow>
      )}
    </Panel>
  );
}

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.9rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  min-width: 220px;
`;

const InfoRow = styled.div`
  display:flex;
  justify-content:space-between;
  padding:0.45rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  &:first-of-type { border-top: none; }
`;
const Label = styled.div`color:${({theme})=>theme.colors.secondaryDark};font-size:0.9rem;`;
const Value = styled.div`font-weight:700;`;
