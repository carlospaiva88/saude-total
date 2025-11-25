// src/components/Receitas/SortSelect.jsx
import React from "react";
import styled from "styled-components";

export default function SortSelect({ value, onChange }) {
  return (
    <Wrapper>
      <Label htmlFor="sort-select">Ordenar por:</Label>
      <Select id="sort-select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="recomendado">Recomendado</option>
        <option value="mais-recentes">Mais recentes</option>
        <option value="menos-calorias">Menos calorias</option>
        <option value="mais-calorias">Mais calorias</option>
        <option value="tempo-asc">Menor tempo</option>
        <option value="dificuldade-asc">Mais fáceis</option>
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display:flex;
  align-items:center;
  gap:0.5rem;
`;

const Label = styled.label`
  font-size:0.9rem;
  color: ${({theme}) => theme.colors.secondaryDark || "#666"};
`;

const Select = styled.select`
  padding: 0.5rem 0.6rem;
  border-radius: 8px;
  border: 1px solid ${({theme})=>theme.colors.border || "#ddd"};
  background: ${({theme})=>theme.colors.surface || "#fff"};
  font-size: 0.95rem;
  outline: none;
`;
