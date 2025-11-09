import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  } to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CalculatorContainer = styled.div`
  // estilo opcional para isolado, remova se usar em um wrapper maior
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: #336b5a;
`;

const Input = styled.input`
  width: 100%;
  max-width: 60px;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  border: 2px solid #43aa8b;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #2a6f61;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Select = styled.select`
  width: 100%;
  max-width: 390px;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  border: 2px solid #43aa8b;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
  color: #264653;
  &:focus {
    outline: none;
    border-color: #2a6f61;
  }
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem;
  background-color: #43aa8b;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2a6f61;
  }
  &:disabled {
    background-color: #a2c3b0;
    cursor: not-allowed;
  }
`;

const ResultBox = styled.div`
  margin-top: 2rem;
  padding: 1.5rem 2rem;
  background-color: #def2e9;
  border-radius: 16px;
  text-align: center;
  color: #2a6f61;
  font-weight: 700;
  font-size: 1.3rem;
  animation: ${fadeInUp} 0.4s ease forwards;
`;

const CaloricValue = styled.span`
  font-size: 2.4rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  margin-top: 0;
  font-size: 1.15rem;
  font-weight: 600;
`;

const Dica = styled.p`
  margin-top: 1rem;
  font-weight: 600;
  color: #43aa8b;
`;

function interpretarNivelAtividade(nivel) {
  switch (nivel) {
    case 'sedentario':
      return 'Sedentário (pouco ou nenhum exercício)';
    case 'levemente':
      return 'Levemente ativo (exercício leve 1-3 dias/semana)';
    case 'moderado':
      return 'Moderadamente ativo (exercício moderado 3-5 dias/semana)';
    case 'muito':
      return 'Muito ativo (exercício forte 6-7 dias/semana)';
    case 'extremo':
      return 'Atleta (exercício intenso e trabalho físico pesado)';
    default:
      return '';
  }
}

const formatarNumero = (num) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

const gerarDicas = (calorias, nivelAtividade) => {
  const cal = parseInt(calorias, 10);
  if (cal < 1200) {
    return 'Sua necessidade calórica está baixa. Avalie com um profissional para garantir uma dieta equilibrada.';
  }
  if (cal > 3500) {
    return 'Sua necessidade calórica está alta. Mantenha uma alimentação saudável e equilibrada.';
  }
  switch (nivelAtividade) {
    case 'sedentario':
      return 'Tente incluir atividades físicas leves para melhorar sua saúde.';
    case 'levemente':
      return 'Continue com exercícios leves para manter a saúde.';
    case 'moderado':
      return 'Ótimo! Seu nível de atividade está equilibrado.';
    case 'muito':
      return 'Não esqueça do descanso e alimentação adequada para alta atividade.';
    case 'extremo':
      return 'Atleta dedicado! Mantenha acompanhamento nutricional profissional.';
    default:
      return 'Mantenha um estilo de vida ativo e equilibrado.';
  }
};

export default function CalculadoraCalorica({ onCalcular }) {
  const [sexo, setSexo] = useState('masculino');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [nivelAtividade, setNivelAtividade] = useState('sedentario');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const calcularCalorias = (e) => {
    e.preventDefault();
    setErro('');

    const i = parseInt(idade, 10);
    const p = parseFloat(peso.replace(',', '.'));
    const a = parseFloat(altura.replace(',', '.'));

    if (!i || i <= 0) {
      setErro('Informe uma idade válida.');
      setResultado(null);
      if (onCalcular) onCalcular(null, nivelAtividade);
      return;
    }
    if (!p || p <= 0) {
      setErro('Informe um peso válido.');
      setResultado(null);
      if (onCalcular) onCalcular(null, nivelAtividade);
      return;
    }
    if (!a || a <= 0) {
      setErro('Informe uma altura válida.');
      setResultado(null);
      if (onCalcular) onCalcular(null, nivelAtividade);
      return;
    }

    // Mifflin-St Jeor Equation
    let tmb;
    if (sexo === 'masculino') {
      tmb = 10 * p + 6.25 * (a * 100) - 5 * i + 5;
    } else {
      tmb = 10 * p + 6.25 * (a * 100) - 5 * i - 161;
    }

    // Multiplicar pela taxa de atividade física
    const fatorAtividade = {
      sedentario: 1.2,
      levemente: 1.375,
      moderado: 1.55,
      muito: 1.725,
      extremo: 1.9,
    }[nivelAtividade] || 1.2;

    const caloriasDiarias = tmb * fatorAtividade;
    setResultado(caloriasDiarias.toFixed(0));
    if (onCalcular) onCalcular(caloriasDiarias.toFixed(0), nivelAtividade);
  };

  return (
    <CalculatorContainer>
      <Form onSubmit={calcularCalorias} noValidate>
        <Label htmlFor="sexo">Sexo</Label>
        <Select
          id="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </Select>
<Label htmlFor="nivelAtividade">Nível de atividade física</Label>
        <Select
          id="nivelAtividade"
          value={nivelAtividade}
          onChange={(e) => setNivelAtividade(e.target.value)}
          required
        >
          <option value="sedentario">
            Sedentário (pouco ou nenhum exercício)
          </option>
          <option value="levemente">
            Levemente ativo (exercício leve 1-3 dias/semana)
          </option>
          <option value="moderado">
            Moderadamente ativo (exercício moderado 3-5 dias/semana)
          </option>
          <option value="muito">Muito ativo (exercício forte 6-7 dias/semana)</option>
          <option value="extremo">
            Atleta (exercício intenso e trabalho físico pesado)
          </option>
        </Select>
        
        <Label htmlFor="idade">Idade</Label>
        <Input
          id="idade"
          type="number"
          min="0"
          step="1"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Ex: 30"
          required
        />

        <Label htmlFor="peso">Peso (kg)</Label>
        <Input
          id="peso"
          type="number"
          min="0"
          step="0.1"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Ex: 68.5"
          required
        />

        <Label htmlFor="altura">Altura (m)</Label>
        <Input
          id="altura"
          type="number"
          min="0"
          step="0.01"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Ex: 1.75"
          required
        />

        

        <Button type="submit" disabled={!peso || !altura || !idade}>
          Calcular
        </Button>
        {erro && (
          <p style={{ color: 'crimson', marginTop: '0.8rem' }}>{erro}</p>
        )}
      </Form>

      {resultado && (
        <ResultBox aria-live="polite">
          <CaloricValue>{formatarNumero(resultado)} kcal</CaloricValue>
          <Description>
            Estimativa diária de calorias necessárias para manter o seu peso,
            considerando seu nível de atividade:
            <br />
            <em>{interpretarNivelAtividade(nivelAtividade)}</em>
          </Description>
          <Dica>{gerarDicas(resultado, nivelAtividade)}</Dica>
        </ResultBox>
      )}
    </CalculatorContainer>
  );
}
