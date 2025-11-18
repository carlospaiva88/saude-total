// src/components/Calculadora/CalculadoraPreview.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function CalculadoraPreview() {
  return (
    <Preview>
      <Item as={Link} to="/calculadora-imc">
        <strong>IMC</strong>
        <small>Índice de massa corporal</small>
      </Item>
      <Item as={Link} to="/calculadora-calorica">
        <strong>TMB & Calorias</strong>
        <small>TMB, manutenção, objetivos</small>
      </Item>
      <Item as={Link} to="/calculadora-calorica">
        <strong>Macros</strong>
        <small>Repartição de macronutrientes</small>
      </Item>
    </Preview>
  );
}

const Preview = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-top: 0.6rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  padding: 0.6rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  text-decoration: none;
  color: inherit;
  font-weight: 600;

  strong { font-size: 0.95rem; color: ${({ theme }) => theme.colors.primaryDark}; }
  small { font-size: 0.82rem; color: ${({ theme }) => theme.colors.text}; opacity: 0.9; margin-top: 0.15rem; }
`;
