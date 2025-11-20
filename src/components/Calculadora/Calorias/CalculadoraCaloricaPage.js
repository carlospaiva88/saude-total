import React, { useState } from "react";
import {
  CalculatorCard,
  FormRow,
  Label,
  Input,
  PrimaryBtn,
  ResultBox,
} from "../CalculadoraShared.styles";

export default function CalculadoraCaloricaPage() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [atividade, setAtividade] = useState(1.2);
  const [resultado, setResultado] = useState(null);

  const calcular = (e) => {
    if (e) e.preventDefault();

    const p = parseFloat(peso);
    const h = parseFloat(altura);
    const i = parseFloat(idade);
    if (!p || !h || !i) return;

    const tmb =
      sexo === "masculino"
        ? 88.36 + 13.4 * p + 4.8 * h - 5.7 * i
        : 447.6 + 9.2 * p + 3.1 * h - 4.3 * i;

    const total = Math.round(tmb * atividade);
    setResultado(total);
  };

  return (
    <CalculatorCard as="form" onSubmit={calcular}>
      <h3>Gasto Calórico Diário</h3>

      <FormRow>
        <Label>Peso (kg)</Label>
        <Input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
      </FormRow>

      <FormRow>
        <Label>Altura (cm)</Label>
        <Input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} />
      </FormRow>

      <FormRow>
        <Label>Idade</Label>
        <Input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />
      </FormRow>

      <FormRow>
        <Label>Sexo</Label>
        <select
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          style={{ padding: "0.7rem", borderRadius: "10px", border: "1px solid #E6E3DD" }}
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>
      </FormRow>

      <FormRow>
        <Label>Nível de Atividade</Label>
        <select
          value={atividade}
          onChange={(e) => setAtividade(parseFloat(e.target.value))}
          style={{ padding: "0.7rem", borderRadius: "10px", border: "1px solid #E6E3DD" }}
        >
          <option value="1.2">Sedentário</option>
          <option value="1.375">Leve (1–3x/semana)</option>
          <option value="1.55">Moderado (3–5x/semana)</option>
          <option value="1.725">Intenso (6–7x/semana)</option>
          <option value="1.9">Muito Intenso (treino + trabalho físico)</option>
        </select>
      </FormRow>

      <PrimaryBtn type="submit">Calcular</PrimaryBtn>

      {resultado && (
        <ResultBox>
          <strong>{resultado} kcal/dia</strong>
          <div style={{ marginTop: 6 }}>
            Este é o seu gasto energético diário estimado.
          </div>
        </ResultBox>
      )}
    </CalculatorCard>
  );
}
