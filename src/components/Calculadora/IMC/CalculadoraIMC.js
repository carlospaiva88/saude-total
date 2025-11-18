// src/components/Calculadora/CalculadoraIMC.jsx
import React, { useState } from "react";
import styled from "styled-components";

export default function CalculadoraIMC({ onCalcular }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularIMC = (e) => {
    if(e) e.preventDefault();
    const alt = parseFloat(altura) / 100;
    const p = parseFloat(peso);
    if (!alt || !p) return;
    const imc = p / (alt * alt);
    const value = Number(imc.toFixed(2));
    setResultado(value);
    if (typeof onCalcular === "function") onCalcular(value);
  };

  return (
    <Container>
      <Form onSubmit={calcularIMC}>
        <Label>Peso (kg)</Label>
        <Input type="number" value={peso} onChange={(e)=>setPeso(e.target.value)} />
        <Label>Altura (cm)</Label>
        <Input type="number" value={altura} onChange={(e)=>setAltura(e.target.value)} />
        <Button type="submit">Calcular IMC</Button>
      </Form>

      {resultado && (
        <ResultBox>
          <CaloricValue>{resultado}</CaloricValue>
          <Description>
            {resultado < 18.5
              ? "Abaixo do peso"
              : resultado < 25
              ? "Peso ideal"
              : resultado < 30
              ? "Sobrepeso"
              : "Obesidade"}
          </Description>
        </ResultBox>
      )}
    </Container>
  );
}

/* Styled same as before - keep consistent */
const Container = styled.div`
  max-width: 100%;
`;
const Form = styled.form` display:flex; flex-direction:column; gap:0.8rem; `;
const Label = styled.label` font-weight:600; `;
const Input = styled.input` padding:0.7rem; border-radius:10px; border:1px solid ${({theme})=>theme.colors.border}; `;
const Button = styled.button` background:${({theme})=>theme.colors.primary}; color:#fff; padding:0.7rem; border-radius:10px; border:none; cursor:pointer; `;
const ResultBox = styled.div` margin-top:1rem; padding:1rem; background: linear-gradient(90deg, #def2e9, #f6fefb); border-radius:10px; text-align:center; `;
const CaloricValue = styled.div` font-size:1.6rem; font-weight:700; `;
const Description = styled.div` margin-top:0.4rem; `;
