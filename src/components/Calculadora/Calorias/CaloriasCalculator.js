import React, { useState } from "react";
import {
  CalculatorCard,
  FormRow,
  Label,
  Input,
  Select,
  PrimaryBtn,
  ResultBox,
  SmallMeta
} from "../CalculadoraShared.styles";

export default function CaloriasCalculator({ onResult }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [atividade, setAtividade] = useState("sedentario");
  const [goal, setGoal] = useState("manter");
  const [resultado, setResultado] = useState(null);

  const fatores = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    ativo: 1.725,
    muito_ativo: 1.9,
  };

  const calcular = (e) => {
    if (e) e.preventDefault();
    const p = parseFloat(peso);
    const h = parseFloat(altura);
    const i = parseFloat(idade);
    if (!p || !h || !i) return;

    const tmb = sexo === "masculino"
      ? 88.36 + 13.4 * p + 4.8 * h - 5.7 * i
      : 447.6 + 9.2 * p + 3.1 * h - 4.3 * i;

    const manutencao = Math.round(tmb * fatores[atividade]);

    // macros simples
    const protPerKg = goal === "ganhar" ? 1.8 : goal === "perder" ? 1.6 : 1.6;
    const proteinaGr = Math.round(p * protPerKg);
    const proteinaKcal = proteinaGr * 4;
    const fatPerc = goal === "perder" ? 0.25 : 0.28;
    const gorduraKcal = Math.round(manutencao * fatPerc);
    const gorduraGr = Math.round(gorduraKcal / 9);
    const carboKcal = Math.max(0, manutencao - (proteinaKcal + gorduraKcal));
    const carboGr = Math.round(carboKcal / 4);

    const res = {
      tmb: Math.round(tmb),
      manutencao,
      proteinaGr,
      carboGr,
      gorduraGr,
      goal,
      peso: p,
    };

    setResultado(res);
    if (typeof onResult === "function") onResult(res);
  };

  return (
    <CalculatorCard as="form" onSubmit={calcular}>
      <h3>Calculadora Calórica (TMB + Manutenção + Macros)</h3>

      <FormRow>
        <div>
          <Label>Peso (kg)</Label>
          <Input value={peso} onChange={(e) => setPeso(e.target.value)} type="number" />
        </div>
        <div>
          <Label>Altura (cm)</Label>
          <Input value={altura} onChange={(e) => setAltura(e.target.value)} type="number" />
        </div>
      </FormRow>

      <FormRow>
        <div>
          <Label>Idade</Label>
          <Input value={idade} onChange={(e) => setIdade(e.target.value)} type="number" />
        </div>
        <div>
          <Label>Sexo</Label>
          <Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </Select>
        </div>
      </FormRow>

      <FormRow>
        <div>
          <Label>Nível de atividade</Label>
          <Select value={atividade} onChange={(e) => setAtividade(e.target.value)}>
            <option value="sedentario">Sedentário</option>
            <option value="leve">Leve</option>
            <option value="moderado">Moderado</option>
            <option value="ativo">Ativo</option>
            <option value="muito_ativo">Muito ativo</option>
          </Select>
        </div>
        <div>
          <Label>Objetivo</Label>
          <Select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="manter">Manter</option>
            <option value="perder">Perder peso</option>
            <option value="ganhar">Ganhar massa</option>
          </Select>
        </div>
      </FormRow>

      <PrimaryBtn type="submit">Calcular</PrimaryBtn>

      {resultado && (
        <ResultBox>
          <div style={{ fontWeight: 800, fontSize: "1.25rem" }}>{resultado.manutencao} kcal/dia</div>
          <SmallMeta>
            TMB: {resultado.tmb} kcal • Proteína: {resultado.proteinaGr} g • Carbo: {resultado.carboGr} g • Gordura: {resultado.gorduraGr} g
          </SmallMeta>
        </ResultBox>
      )}
    </CalculatorCard>
  );
}
