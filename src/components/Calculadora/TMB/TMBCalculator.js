// src/components/Calculadora/TMB/TMBCalculator.jsx
import React, { useState } from "react";
import styled from "styled-components";

/**
 * Calculadora TMB (Mifflin-St Jeor) — agora com 'goal'
 * onResult({ tmb, peso, altura, idade, sexo, goal })
 */

export default function TMBCalculator({ onResult }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [goal, setGoal] = useState("manter");
  const [tmbRes, setTmbRes] = useState(null);
  const [error, setError] = useState("");

  const calcular = (e) => {
    e?.preventDefault();
    setError("");

    const p = Number.parseFloat(peso);
    const h = Number.parseFloat(altura);
    const i = Number.parseFloat(idade);

    if (!Number.isFinite(p) || p <= 0) return setError("Informe um peso válido (kg).");
    if (!Number.isFinite(h) || h <= 0) return setError("Informe uma altura válida (cm).");
    if (!Number.isFinite(i) || i <= 0) return setError("Informe uma idade válida.");

    const tmb =
      sexo === "masculino"
        ? 88.36 + 13.4 * p + 4.8 * h - 5.7 * i
        : 447.6 + 9.2 * p + 3.1 * h - 4.3 * i;

    const rounded = Math.round(tmb);
    setTmbRes(rounded);

    const payload = {
      tmb: rounded,
      peso: Number(p.toFixed(1)),
      altura: Number(h.toFixed(0)),
      idade: Number(i),
      sexo,
      goal,
    };

    if (typeof onResult === "function") onResult(payload);

    // salva histórico simples
    try {
      const key = "calc_history_tmb";
      const raw = localStorage.getItem(key);
      const hist = raw ? JSON.parse(raw) : [];
      hist.unshift({ id: Date.now(), createdAt: new Date().toISOString(), ...payload });
      localStorage.setItem(key, JSON.stringify(hist.slice(0, 10)));
    } catch (err) {
      // ignore
    }
  };

  return (
    <FormCard onSubmit={calcular} aria-label="Calculadora TMB">
      <h3>Calculadora TMB</h3>

      <Row>
        <label htmlFor="tmb-peso">Peso (kg)</label>
        <input
          id="tmb-peso"
          inputMode="decimal"
          type="number"
          placeholder="72.5"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          min="0"
          step="0.1"
          aria-label="Peso em quilogramas"
        />
      </Row>

      <Row>
        <label htmlFor="tmb-altura">Altura (cm)</label>
        <input
          id="tmb-altura"
          inputMode="numeric"
          type="number"
          placeholder="175"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          min="0"
          step="1"
          aria-label="Altura em centímetros"
        />
      </Row>

      <Row>
        <label htmlFor="tmb-idade">Idade</label>
        <input
          id="tmb-idade"
          inputMode="numeric"
          type="number"
          placeholder="32"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          min="0"
          step="1"
          aria-label="Idade em anos"
        />
      </Row>

      <Row>
        <label htmlFor="tmb-sexo">Sexo</label>
        <select id="tmb-sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} aria-label="Sexo">
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </Row>

      <Row>
        <label htmlFor="tmb-goal">Objetivo</label>
        <select id="tmb-goal" value={goal} onChange={(e) => setGoal(e.target.value)} aria-label="Objetivo">
          <option value="manter">Manter peso</option>
          <option value="perder">Perder peso (défice)</option>
          <option value="ganhar">Ganhar peso (superávit)</option>
        </select>
      </Row>

      {error && <Error role="alert">{error}</Error>}

      <Primary type="submit" aria-label="Calcular TMB">Calcular TMB</Primary>

      {tmbRes !== null && (
        <Result aria-live="polite">
          <strong>{tmbRes.toLocaleString()} kcal/dia</strong>
          <div style={{ marginTop: 6 }}>
            Sua TMB (taxa metabólica basal) — estima o gasto em repouso. Use as faixas abaixo como referência:
          </div>
          <Ranges>
            <RangeItem><strong>Manter:</strong> ≈ {tmbRes} kcal/dia</RangeItem>
            <RangeItem><strong>Perder (défice 500 kcal):</strong> ≈ {Math.max(800, tmbRes - 500)} kcal/dia</RangeItem>
            <RangeItem><strong>Ganhar (superávit 300 kcal):</strong> ≈ {tmbRes + 300} kcal/dia</RangeItem>
          </Ranges>
        </Result>
      )}
    </FormCard>
  );
}

/* ---- styled (TMB) ---- */
const FormCard = styled.form`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadow.xs};
  width: 100%;
  max-width: 560px;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.9rem;

  label { width: 140px; font-weight: 600; color: ${({ theme }) => theme.colors.dark}; }

  input, select {
    flex: 1;
    padding: 0.7rem;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 1rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    label { width: auto; margin-bottom: 0.35rem; }
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
  border: none;
`;

const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: linear-gradient(90deg, #def2e9, #f6fefb);
`;

const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger || "#bf2b2b"};
  margin-bottom: 0.6rem;
  font-weight: 600;
`;

const Ranges = styled.ul` margin-top: 0.6rem; padding-left: 1rem; `;
const RangeItem = styled.li` margin-top: 0.25rem; font-size: 0.95rem; `;
