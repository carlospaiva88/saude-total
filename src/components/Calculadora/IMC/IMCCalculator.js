// src/components/Calculadora/IMC/IMCCalculator.jsx
import React, { useState } from "react";
import styled from "styled-components";

/**
 * IMC Calculator com 'goal'
 * onResult({ imc, peso, altura, goal })
 */

export default function IMCCalculator({ onResult }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [goal, setGoal] = useState("manter");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const calcular = (e) => {
    e?.preventDefault();
    setError("");

    const p = Number.parseFloat(peso);
    const aCm = Number.parseFloat(altura);
    if (!Number.isFinite(p) || p <= 0) return setError("Informe um peso válido (kg).");
    if (!Number.isFinite(aCm) || aCm <= 0) return setError("Informe uma altura válida (cm).");

    const a = aCm / 100;
    const imc = Number((p / (a * a)).toFixed(2));
    setResultado(imc);

    const payload = { imc, peso: Number(p.toFixed(1)), altura: Number(aCm.toFixed(0)), goal };
    if (typeof onResult === "function") onResult(payload);

    // salva histórico local simples
    try {
      const key = "calc_history_imc";
      const raw = localStorage.getItem(key);
      const hist = raw ? JSON.parse(raw) : [];
      hist.unshift({ id: Date.now(), createdAt: new Date().toISOString(), ...payload });
      localStorage.setItem(key, JSON.stringify(hist.slice(0, 10)));
    } catch (err) {}
  };

  const interpret = (v) => {
    if (v < 18.5) return "Abaixo do peso — avalie suas calorias e consumo proteico.";
    if (v < 25) return "Peso dentro da faixa saudável — mantenha bons hábitos.";
    if (v < 30) return "Sobrepeso — avalie hábitos alimentares e atividade física.";
    return "Obesidade — considere consultar um profissional de saúde.";
  };

  return (
    <FormCard onSubmit={calcular} aria-label="Calculadora IMC">
      <h3>Calculadora IMC</h3>

      <Row>
        <label htmlFor="imc-peso">Peso (kg)</label>
        <input id="imc-peso" inputMode="decimal" type="number" placeholder="72.5" value={peso} onChange={(e) => setPeso(e.target.value)} min="0" step="0.1" />
      </Row>

      <Row>
        <label htmlFor="imc-altura">Altura (cm)</label>
        <input id="imc-altura" inputMode="numeric" type="number" placeholder="175" value={altura} onChange={(e) => setAltura(e.target.value)} min="0" step="1" />
      </Row>

      <Row>
        <label htmlFor="imc-goal">Objetivo</label>
        <select id="imc-goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="manter">Manter peso</option>
          <option value="perder">Perder peso</option>
          <option value="ganhar">Ganhar peso</option>
        </select>
      </Row>

      {error && <Error role="alert">{error}</Error>}

      <Primary type="submit">Calcular IMC</Primary>

      {resultado !== null && (
        <Result aria-live="polite">
          <strong>{resultado}</strong>
          <div style={{ marginTop: 6 }}>{interpret(resultado)}</div>

          <Advice>
            <strong>Sugestão prática:</strong>
            {resultado < 18.5 ? <p>Priorize um leve superávit + foco em proteína e força.</p> : resultado < 25 ? <p>Mantenha rotina e leve monitoramento.</p> : <p>Recomenda-se reduzir ~300–500 kcal/dia e aumentar atividade física; consulte especialista.</p>}
            <p style={{ marginTop: 6 }}>Objetivo selecionado: <em>{goal}</em></p>
          </Advice>
        </Result>
      )}
    </FormCard>
  );
}

/* ---- styled (IMC) ---- */
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
  input, select { flex: 1; padding: 0.7rem; border-radius: 10px; border: 1px solid ${({ theme }) => theme.colors.border}; font-size: 1rem; }
  @media (max-width: 720px) { flex-direction: column; label { width: auto; margin-bottom: 0.35rem; } }
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
  border: none;
`;

const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: linear-gradient(90deg, #def2e9, #f6fefb);
  strong { font-size: 1.4rem; }
`;

const Advice = styled.div` margin-top: 0.6rem; font-size: 0.95rem; color: ${({ theme }) => theme.colors.secondaryDark}; `;

const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger || "#bf2b2b"};
  margin-bottom: 0.6rem;
  font-weight: 600;
`;
