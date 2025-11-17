import React, { useState } from "react";
import styled from "styled-components";

export default function CalculadoraCalorica() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [atividade, setAtividade] = useState("sedentario");
  const [resultado, setResultado] = useState(null);

  const calcularCalorias = (e) => {
    e.preventDefault();
    if (!peso || !altura || !idade) return;

    // Fórmula de Harris-Benedict
    let tmb =
      sexo === "masculino"
        ? 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * idade
        : 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * idade;

    const fatores = {
      sedentario: 1.2,
      leve: 1.375,
      moderado: 1.55,
      ativo: 1.725,
      muito_ativo: 1.9,
    };

    setResultado((tmb * fatores[atividade]).toFixed(0));
  };

  return (
    <Container>
      <Form onSubmit={calcularCalorias}>
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
        <Label>Idade</Label>
        <Input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <Label>Sexo</Label>
        <Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </Select>
        <Label>Nível de Atividade</Label>
        <Select value={atividade} onChange={(e) => setAtividade(e.target.value)}>
          <option value="sedentario">Sedentário</option>
          <option value="leve">Leve</option>
          <option value="moderado">Moderado</option>
          <option value="ativo">Ativo</option>
          <option value="muito_ativo">Muito ativo</option>
        </Select>
        <Button type="submit">Calcular Calorias</Button>
      </Form>

      {resultado && (
        <ResultBox>
          <CaloricValue>{resultado} kcal/dia</CaloricValue>
          <Description>
            Esta é a quantidade aproximada de calorias que você precisa diariamente.
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

const Select = styled.select`
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
