import React, { useState } from "react";
import styled from "styled-components";

export default function TMBCalculator({ onResult }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [tmbRes, setTmbRes] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    const p = parseFloat(peso);
    const h = parseFloat(altura);
    const i = parseFloat(idade);
    if (!p || !h || !i || p <= 0 || h <= 0 || i <= 0) return;

    const tmb =
      sexo === "masculino"
        ? 88.36 + 13.4 * p + 4.8 * h - 5.7 * i
        : 447.6 + 9.2 * p + 3.1 * h - 4.3 * i;

    const rounded = Math.round(tmb);
    setTmbRes(rounded);
    if (typeof onResult === "function") onResult({ tmb: rounded });

    const hist = JSON.parse(localStorage.getItem("calc_history_tmb") || "[]");
    hist.unshift({ tmb: rounded, peso: p, altura: h, idade: i, date: Date.now() });
    localStorage.setItem("calc_history_tmb", JSON.stringify(hist.slice(0, 10)));
  };

  return (
    <Card as="form" onSubmit={calcular} aria-label="Calculadora TMB">
      <h3>Calculadora TMB</h3>

      <Row>
        <label htmlFor="peso">Peso (kg)</label>
        <input
          id="peso"
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          min="0"
          step="0.1"
          aria-label="Peso em quilogramas"
        />
      </Row>

      <Row>
        <label htmlFor="altura">Altura (cm)</label>
        <input
          id="altura"
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          min="0"
          step="1"
          aria-label="Altura em centímetros"
        />
      </Row>

      <Row>
        <label htmlFor="idade">Idade</label>
        <input
          id="idade"
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          min="0"
          step="1"
          aria-label="Idade em anos"
        />
      </Row>

      <Row>
        <label htmlFor="sexo">Sexo</label>
        <select
          id="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          aria-label="Sexo"
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </Row>

      <Primary type="submit">Calcular TMB</Primary>

      {tmbRes !== null && (
        <Result>
          <strong>{tmbRes} kcal/dia</strong>
          <div style={{ marginTop: 6 }}>
            Sua TMB (taxa metabólica basal) é uma estimativa do gasto em repouso.
          </div>
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

  input,
  select {
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
    font-size: 1.2rem;
  }
`;
