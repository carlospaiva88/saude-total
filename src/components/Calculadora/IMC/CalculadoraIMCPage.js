import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import NavbarSpacer from "../Navbar/NavbarSpacer";
import Footer from "../Footer/Footer";

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularIMC = () => {
    if (!peso || !altura) return;
    const alturaM = altura / 100;
    const imc = peso / (alturaM * alturaM);

    let classificacao = "";
    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 24.9) classificacao = "Peso normal";
    else if (imc < 29.9) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";

    setResultado({ imc: imc.toFixed(1), classificacao });
  };

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <Container>
        <Title>Calculadora de IMC</Title>

        <Card>
          <Label>Peso (kg)</Label>
          <Input value={peso} onChange={(e) => setPeso(e.target.value)} type="number" />

          <Label>Altura (cm)</Label>
          <Input value={altura} onChange={(e) => setAltura(e.target.value)} type="number" />

          <Button onClick={calcularIMC}>Calcular IMC</Button>

          {resultado && (
            <ResultadoBox>
              <h3>Seu IMC: {resultado.imc}</h3>
              <p>{resultado.classificacao}</p>
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

const Button = styled.button`
  margin-top: 15px;
  padding: 15px;
  border-radius: 12px;
  border: none;
  background: #6C63FF;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #574BFF;
  }
`;

const ResultadoBox = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #f7f7f7;
  border-radius: 12px;
  text-align: center;

  h3 {
    margin-bottom: 10px;
  }
`;
