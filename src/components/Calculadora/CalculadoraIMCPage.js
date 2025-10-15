import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CalculadoraIMC from "./CalculadoraIMC";
import {
  PageWrapper,
  TwoColumns,
  CalculatorCard,
  InfoCard,
  ResultBox,
  Title,
  Subtitle,
  CTAButton,
  Recommendations,
  InfoBlock
} from "./CalculadoraIMCPage.styles";

export default function CalculadoraIMCPage() {
  const [imc, setImc] = useState(null);

  const interpretarIMC = (valor) => {
    const v = parseFloat(valor);
    if (v < 18.5) return "Magreza";
    if (v < 24.9) return "Peso Normal";
    if (v < 29.9) return "Sobrepeso";
    if (v < 39.9) return "Obesidade Grau I/II";
    return "Obesidade Grau III (Mórbida)";
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <Title>Calculadora de IMC</Title>
        <Subtitle>Saiba seu índice de massa corporal e cuide melhor da sua saúde.</Subtitle>
        <TwoColumns>
          <InfoCard>
            <InfoBlock>
              <h3>O que é IMC?</h3>
              <p>
                O Índice de Massa Corporal (IMC) é uma medida usada para avaliar seu peso ideal em relação à altura.
              </p>
            </InfoBlock>
            <InfoBlock>
              <h3>Por que usar?</h3>
              <p>
                Monitorar seu IMC ajuda na prevenção de doenças e manutenção da saúde equilibrada.
              </p>
            </InfoBlock>
            <InfoBlock>
              <h3>Dicas</h3>
              <ul>
                <li>Preencha os campos com seus dados reais.</li>
                <li>Utilize a calculadora regularmente para acompanhar sua saúde.</li>
                <li>Procure orientação profissional se necessário.</li>
              </ul>
            </InfoBlock>
            <CTAButton href="/downloads/guia-alimentar.pdf" download>
              Baixar Guia Gratuito de Alimentação
            </CTAButton>
            <Recommendations>
              <h4>Leia também:</h4>
              <ul>
                <li>
                  <a href="/blog/saude-alimentar">Como montar um plano alimentar saudável</a>
                </li>
                <li>
                  <a href="/blog/dicas-atividade">Dicas para aumentar o metabolismo</a>
                </li>
              </ul>
            </Recommendations>
          </InfoCard>
          <CalculatorCard>
            <CalculadoraIMC onCalcular={(resultado) => setImc(resultado)} />
          </CalculatorCard>
        
        </TwoColumns>
        {imc && (
          <ResultBox>
            <strong>{imc}</strong> - {interpretarIMC(imc)}
          </ResultBox>
        )}
      </PageWrapper>
      <Footer />
    </>
  );
}
