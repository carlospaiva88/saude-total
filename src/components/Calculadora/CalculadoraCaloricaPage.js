import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CalculadoraCalorica from "./CalculadoraCalorica";
import {
  PageWrapper,
  TwoColumns,
  CalculatorCard,
  InfoCard,
  ResultBox,
  Title,
  Subtitle,
  CTAButton,
  Recommendations
} from "./CalculadoraCaloricaPage.styles";

export default function CalculadoraCaloricaPage() {
  const [resultado, setResultado] = useState(null);
  const [nivelAtividade, setNivelAtividade] = useState("sedentario");

  return (
    <>
      <Navbar />
      <PageWrapper>
        <Title>Calculadora de Calorias</Title>
        <Subtitle>
          Descubra suas necessidades calóricas diárias para manter uma vida equilibrada.
        </Subtitle>
        <TwoColumns>
          <InfoCard>
            <h3>Por que calcular?</h3>
            <p>
              Entender sua necessidade calórica ajuda a manter ou ajustar seu peso e melhora sua saúde geral.
            </p>
            <h4>Dicas:</h4>
            <ul>
              <li>Preencha com seus dados reais.</li>
              <li>Selecione seu nível de atividade física.</li>
              <li>Consulte um profissional para resultados personalizados.</li>
            </ul>
            <CTAButton href="/downloads/guia-alimentar.pdf" download>
              Baixar Guia Gratuito de Alimentação
            </CTAButton>
            <Recommendations>
              <h4>Leia também:</h4>
              <ul>
                <li><a href="/blog/saude-alimentar">Como montar um plano alimentar saudável</a></li>
                <li><a href="/blog/metabolismo">Dicas para acelerar seu metabolismo</a></li>
              </ul>
            </Recommendations>
          </InfoCard>
          <CalculatorCard>
            <CalculadoraCalorica
              onCalcular={(resultadoValue, nivel) => {
                setResultado(resultadoValue);
                setNivelAtividade(nivel);
              }}
            />
          </CalculatorCard>
        </TwoColumns>

        {resultado && (
          <ResultBox>
            <strong>{resultado} kcal/dia</strong> para <em>{nivelAtividade}</em>
            <p>
              {resultado < 1200
                ? "Atenção: Consumo muito baixo! Procure orientação profissional."
                : resultado > 3500
                ? "Consumo elevado. Atente-se à qualidade dos alimentos!"
                : "Excelente! Use essa base para planejar sua próxima refeição."}
            </p>
          </ResultBox>
        )}
      </PageWrapper>
      <Footer />
    </>
  );
}
