import React, { useState } from "react";
import {
  CalculatorContainer,
  Form,
  Label,
  Input,
  Button,
  ResultBox,
} from "./CalculadoraShared.styles";

export default function CalculadoraCalorica() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [resultado, setResultado] = useState(null);

  const calcularCalorias = (e) => {
    e.preventDefault();

    let tmb =
      sexo === "masculino"
        ? 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * idade
        : 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * idade;

    const calorias = {
      sedentario: Math.round(tmb * 1.2),
      leve: Math.round(tmb * 1.375),
      moderado: Math.round(tmb * 1.55),
      intenso: Math.round(tmb * 1.725),
      extremo: Math.round(tmb * 1.9),
    };

    setResultado({ tmb: Math.round(tmb), ...calorias });
  };

  return (
    <CalculatorContainer>
      <h2>Calculadora Calórica</h2>

      <Form onSubmit={calcularCalorias}>
        <div>
          <Label>Peso (kg)</Label>
          <Input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Altura (cm)</Label>
          <Input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Idade</Label>
          <Input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Sexo</Label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          >
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>

        <Button type="submit">Calcular Calorias</Button>
      </Form>

      {resultado && (
        <ResultBox>
          <h3>TMB: {resultado.tmb} kcal/dia</h3>
          <p>Sedentário: {resultado.sedentario} kcal</p>
          <p>Leve: {resultado.leve} kcal</p>
          <p>Moderado: {resultado.moderado} kcal</p>
          <p>Intenso: {resultado.intenso} kcal</p>
          <p>Extremo: {resultado.extremo} kcal</p>
        </ResultBox>
      )}
    </CalculatorContainer>
  );
}
