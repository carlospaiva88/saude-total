import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import NavbarSpacer from "../Navbar/NavbarSpacer";
import Footer from "../Footer/Footer";

export default function CalculadoraTMB() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("masculino");
  const [resultado, setResultado] = useState(null);

  const calcularTMB = () => {
    if (!peso || !altura || !idade) return;

    let tmb =
      sexo === "masculino"
        ? 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade)
        : 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);

    setResultado(tmb.toFixed(0));
  };

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <Container>
        <Title>Calculadora de Taxa Metabólica Basal (TMB)</Title>

        <Card>
          <Label>Peso (kg)</Label>
          <Input value={peso} onChange={(e) => setPeso(e.target.value)} type="number" />

          <Label>Altura (cm)</Label>
          <Input value={altura} onChange={(e) => setAltura(e.target.value)} type="number" />

          <Label>Idade</Label>
          <Input value={idade} onChange={(e) => setIdade(e.target.value)} type="number" />

          <Label>Sexo</Label>
          <Select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </Select>

          <Button onClick={calcularTMB}>Calcular TMB</Button>

          {resultado && (
            <ResultadoBox>
              <h3>Seu TMB: {resultado} calorias/dia</h3>
              <p>Essa é a quantidade mínima de energia que seu corpo usa em repouso.</p>
            </ResultadoBox>
          )}
        </Card>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

const Card = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 15px;
  border-radius: 12px;
  border: none;
  background: #00B894;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #009f80;
  }
`;

const ResultadoBox = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f7f7f7;
  border-radius: 12px;

  text-align: center;
  h3 { margin-bottom: 10px; }
`;
