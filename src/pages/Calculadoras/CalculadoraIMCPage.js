import React, { useState } from "react";
import styled from "styled-components";

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularIMC = (e) => {
    e.preventDefault();
    const alt = parseFloat(altura) / 100;
    const p = parseFloat(peso);
    if (!alt || !p) return;
    const imc = p / (alt * alt);
    setResultado(imc.toFixed(2));
  };

  return (
    <Container>
      <Form onSubmit={calcularIMC}>
        <Label>Peso (kg)</Label>
        <Input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
        <Label>Altura (cm)</Label>
        <Input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
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

// Styled Components
const Container = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.6rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button`
  padding: 0.7rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-weight: 600;
  margin-top: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ResultBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary}10;
  border-radius: ${({ theme }) => theme.radius.sm};
  text-align: center;
`;

const CaloricValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 1rem;
  margin-top: 0.3rem;
`;
