import React, { useState } from 'react';
import styled from 'styled-components';
import CalculadoraIMC from './CalculadoraIMC'; // Supondo que você tenha os arquivos separados
import CalculadoraCalorica from './CalculadoraCalorica';

const CalculadorasWrapper = styled.section`
  display: flex;
  gap: 2rem;
  max-width: 1000px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  @media (max-width: 850px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const CalculadoraContainer = styled.div`
  flex: 1;
  background: #f8fcfb;
  border-radius: 16px;
  padding: 2rem 2.5rem;
  box-shadow: 0 8px 24px rgba(42, 157, 143, 0.1);
  font-family: 'Poppins', sans-serif;
  color: #264653;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 1.9rem;
  color: #2a6f61;
`;

// Dica para IMC, recebe o valor do IMC calculado
function DicaIMC({ imc }) {
  if (!imc) return null;
  const v = parseFloat(imc);
  let dica = '';
  if (v < 18.5) dica = 'Você está abaixo do peso ideal. Considere consultar um nutricionista.';
  else if (v < 24.9) dica = 'Seu peso está normal. Mantenha hábitos saudáveis!';
  else if (v < 29.9) dica = 'Você está com sobrepeso. Atenção à alimentação e exercícios.';
  else if (v < 39.9) dica = 'Obesidade Grau I ou II. Procure orientação profissional.';
  else dica = 'Obesidade Grau III (Mórbida). Importante acompanhamento médico.';
  return <p style={{ marginTop: '1rem', fontWeight: '600', color: '#43aa8b' }}>{dica}</p>;
}

// Dica para Calorias, recebe o resultado e nível atividade
function DicaCalorica({ calorias, nivelAtividade }) {
  if (!calorias) return null;
  const cal = parseInt(calorias, 10);
  let dica = '';
  switch (nivelAtividade) {
    case 'sedentario':
      dica = 'Seu nível de atividade é baixo. Tente incluir exercícios leves na rotina.';
      break;
    case 'levemente':
    case 'moderado':
      dica = 'Ótimo! Mantenha exercícios regulares para sua saúde.';
      break;
    case 'muito':
    case 'extremo':
      dica = 'Alta atividade! Atente-se à alimentação balanceada para sustentar a energia.';
      break;
    default:
      dica = 'Mantenha um estilo de vida ativo e equilibrado.';
  }
  return <p style={{ marginTop: '1rem', fontWeight: '600', color: '#43aa8b' }}>{dica}</p>;
}

export default function CalculadorasInterativas() {
  // Estado para IMC
  const [imc, setImc] = useState(null);
  // Estado para Calorias e atividade
  const [calorias, setCalorias] = useState(null);
  const [nivelAtividade, setNivelAtividade] = useState('sedentario');

  return (
    <CalculadorasWrapper>
      <CalculadoraContainer>
        <Title>Calculadora de IMC</Title>
        <CalculadoraIMC
          onCalcular={(resultado) => setImc(resultado)}
        />
        <DicaIMC imc={imc} />
      </CalculadoraContainer>

      <CalculadoraContainer>
        <Title>Calculadora de Ingestão Calórica</Title>
        <CalculadoraCalorica
          onCalcular={(resultado, nivel) => {
            setCalorias(resultado);
            setNivelAtividade(nivel);
          }}
        />
        <DicaCalorica calorias={calorias} nivelAtividade={nivelAtividade} />
      </CalculadoraContainer>
    </CalculadorasWrapper>
  );
}
