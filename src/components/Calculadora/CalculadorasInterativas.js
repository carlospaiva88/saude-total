import React from 'react';
import { CalculadorasWrapper, CalculadoraCard, Title, Subtitle, ActionButton } from './Calculadora.styles';

export default function CalculadorasInterativas() {
  return (
    <CalculadorasWrapper>
      <Title>Ferramentas para sua Saúde</Title>
      <Subtitle>Calcule seu IMC e necessidades calóricas com facilidade</Subtitle>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <CalculadoraCard>
          <h3>Calculadora de IMC</h3>
        <ActionButton href="/calculadora-imc">Calcular IMC</ActionButton>
        </CalculadoraCard>

        <CalculadoraCard>
          <h3>Calculadora Calórica</h3>     
        <ActionButton href="/calculadora-calorica">Calcular Calorias</ActionButton>
        </CalculadoraCard>
      </div>
    </CalculadorasWrapper>
  );
}
