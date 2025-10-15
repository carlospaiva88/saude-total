import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';


const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px);}
  to { opacity: 1; transform: translateY(0);}
`;


export const CalculatorContainer = styled.div`
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  width: 100%;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: #336b5a;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  border: 2px solid #43aa8b;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2a6f61;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.6rem 0.9rem;
  }
`;

export const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem;
  background-color: #43aa8b;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a6f61;
  }

  &:disabled {
    background-color: #a2c3b0;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.7rem;
  }
`;

export const ResultBox = styled.div`
  margin-top: 2rem;
  padding: 1.5rem 2rem;
  background-color: #def2e9;
  border-radius: 16px;
  text-align: center;
  color: #2a6f61;
  font-weight: 700;
  font-size: 1.3rem;
  animation: ${fadeInUp} 0.4s ease forwards;

  @media (max-width: 600px) {
    font-size: 1.1rem;
    padding: 1.2rem;
  }
`;

export const ImcValue = styled.span`
  font-size: 2.4rem;
  display: block;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

export const ImcInterpretation = styled.p`
  margin-top: 0;
  font-size: 1.15rem;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export default function CalculadoraIMC({ onCalcular }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [erro, setErro] = useState('');

  const calcularIMC = (e) => {
    e.preventDefault();
    setErro('');
    const p = parseFloat(peso.replace(',', '.'));
    const a = parseFloat(altura.replace(',', '.'));
    if (!p || p <= 0) {
      setErro('Informe um peso válido.');
      setImc(null);
      if(onCalcular) onCalcular(null);
      return;
    }
    if (!a || a <= 0) {
      setErro('Informe uma altura válida.');
      setImc(null);
      if(onCalcular) onCalcular(null);
      return;
    }
    const resultado = p / (a * a);
    setImc(resultado.toFixed(2));
    if(onCalcular) onCalcular(resultado.toFixed(2));
  };

  const interpretarIMC = (valor) => {
    const v = parseFloat(valor);
    if (v < 18.5) return 'Magreza';
    if (v < 24.9) return 'Peso Normal';
    if (v < 29.9) return 'Sobrepeso';
    if (v < 39.9) return 'Obesidade Grau I/II';
    return 'Obesidade Grau III (Mórbida)';
  };

  return (
    <CalculatorContainer>
      <Form onSubmit={calcularIMC} noValidate>
        <Label htmlFor="peso">Peso (kg)</Label>
        <Input
          id="peso"
          type="number"
          min="0"
          step="0.1"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Ex: 68.5"
          required
          aria-describedby="pesoHelp"
        />

        <Label htmlFor="altura">Altura (m)</Label>
        <Input
          id="altura"
          type="number"
          min="0"
          step="0.01"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Ex: 1.75"
          required
          aria-describedby="alturaHelp"
        />

        <Button type="submit" disabled={!peso || !altura}>
          Calcular
        </Button>
        {erro && <p style={{ color: 'crimson', marginTop: '0.8rem' }}>{erro}</p>}
      </Form>

      {imc && (
        <ResultBox aria-live="polite">
          <ImcValue>{imc}</ImcValue>
          <ImcInterpretation>{interpretarIMC(imc)}</ImcInterpretation>
        </ResultBox>
      )}
    </CalculatorContainer>
  );
}
