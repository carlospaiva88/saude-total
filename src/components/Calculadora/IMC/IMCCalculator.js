import React, { useState } from "react";
import styled from "styled-components";

export default function IMCCalculator({ onResult }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    const p = parseFloat(peso);
    const a = parseFloat(altura) / 100;
    if (!p || !a || p <= 0 || a <= 0) return;
    const imc = Number((p / (a * a)).toFixed(2));
    setResultado(imc);
    if (typeof onResult === "function") onResult({ imc });
    // salva no localStorage (histórico simples)
    const hist = JSON.parse(localStorage.getItem("calc_history_imc") || "[]");
    hist.unshift({ imc, peso: p, altura: a * 100, date: Date.now() });
    localStorage.setItem("calc_history_imc", JSON.stringify(hist.slice(0, 10)));
  };

  const interpret = (v) => {
    if (v < 18.5) return "[translate:Abaixo do peso — avalie suas calorias e consumo proteico.]";
    if (v < 25) return "[translate:Peso dentro da faixa saudável — mantenha bons hábitos.]";
    if (v < 30) return "[translate:Sobrepeso — avalie hábitos alimentares e atividade física.]";
    return "[translate:Obesidade — consulte um profissional de saúde.]";
  };

  return (
    <Card as="form" onSubmit={calcular} aria-label="[translate:Calculadora IMC]">
      <h3>[translate:Calculadora IMC]</h3>

      <Row>
        <label htmlFor="peso">[translate:Peso (kg)]</label>
        <input
          id="peso"
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          min="0"
          step="0.1"
          aria-label="[translate:Peso em quilogramas]"
        />
      </Row>

      <Row>
        <label htmlFor="altura">[translate:Altura (cm)]</label>
        <input
          id="altura"
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          min="0"
          step="1"
          aria-label="[translate:Altura em centímetros]"
        />
      </Row>

      <Primary type="submit">[translate:Calcular IMC]</Primary>

      {resultado !== null && (
        <Result>
          <strong>{resultado}</strong>
          <div style={{ marginTop: 6 }}>{interpret(resultado)}</div>
        </Result>
      )}
    </Card>
  );
}

/* ---- styled ---- */
const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  padding: 1.2rem;
  box-shadow: ${({ theme }) => theme.shadow.xs};
  width: 100%;
  max-width: 520px;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.9rem;
  label {
    width: 140px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.dark};
  }
  input {
    flex: 1;
    padding: 0.7rem;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 1rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    label {
      width: auto;
      margin-bottom: 0.5rem;
    }
  }
`;

const Primary = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.85rem;
  border-radius: 12px;
  font-weight: 700;
  margin-top: 0.6rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: linear-gradient(90deg, #def2e9, #f6fefb);
  text-align: center;
  strong {
    font-size: 1.4rem;
  }
`;
