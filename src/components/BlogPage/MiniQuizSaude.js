// src/components/BlogPage/MiniQuizSaude.jsx
import React, { useState } from "react";
import styled from "styled-components";

const questions = [
  {
    q: "Qual é a quantidade média recomendada de água por dia?",
    options: ["1 litro", "2 litros", "4 litros", "Depende da pessoa"],
    correct: 1,
    explanation: "A recomendação geral é cerca de 2L por dia, variando conforme peso e atividade física."
  },
  {
    q: "Quantas horas de sono um adulto deve ter em média?",
    options: ["4-5 horas", "6-8 horas", "9-10 horas", "Qualquer valor serve"],
    correct: 1,
    explanation: "A maioria dos adultos precisa de 7 a 8 horas por noite."
  },
  {
    q: "Qual é a prática mais eficiente para reduzir o estresse?",
    options: ["Assistir TV", "Respiração profunda", "Comer doces", "Dormir tarde"],
    correct: 1,
    explanation: "Exercícios de respiração ativam o sistema parassimpático e reduzem o estresse."
  }
];

export default function MiniQuizSaude() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const q = questions[index];
  const isCorrect = selected === q.correct;

  const nextQuestion = () => {
    setIndex((i) => (i + 1) % questions.length);
    setSelected(null);
    setShowAnswer(false);
  };

  return (
    <Box>
      <Title>Mini Quiz de Saúde</Title>
      <Question>{q.q}</Question>

      <Options>
        {q.options.map((opt, i) => (
          <Option
            key={i}
            onClick={() => !showAnswer && setSelected(i)}
            $selected={selected === i}
            $correct={showAnswer && i === q.correct}
            $wrong={showAnswer && selected === i && i !== q.correct}
          >
            {opt}
          </Option>
        ))}
      </Options>

      {!showAnswer && selected !== null && (
        <Button onClick={() => setShowAnswer(true)}>Confirmar</Button>
      )}

      {showAnswer && (
        <>
          <Explanation $correct={isCorrect}>
            {isCorrect ? "✔ Resposta correta!" : "✖ Resposta incorreta!"}
            <p>{q.explanation}</p>
          </Explanation>

          <NextButton onClick={nextQuestion}>Próxima pergunta</NextButton>
        </>
      )}
    </Box>
  );
}

/* ---------------- styled ---------------- */

const Box = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  margin-top: 1rem;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 1.1rem;
`;

const Question = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Option = styled.button`
  padding: 0.55rem 0.75rem;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid
    ${({ $correct, $wrong, theme }) =>
      $correct
        ? theme.colors.success
        : $wrong
        ? theme.colors.error
        : theme.colors.border};
  background:
    ${({ $correct, $wrong, $selected, theme }) =>
      $correct
        ? theme.colors.successSoft
        : $wrong
        ? theme.colors.errorSoft
        : $selected
        ? theme.colors.surfaceAlt
        : theme.colors.surface};
  transition: 0.2s;

  &:hover {
    background: ${({ $correct, $wrong, $selected, theme }) =>
      !$correct && !$wrong && !$selected
        ? theme.colors.surfaceAlt
        : undefined};
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 0.6rem;
  padding: 0.6rem;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  color: white;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

const NextButton = styled(Button)`
  background: ${({ theme }) => theme.colors.primaryDark};
`;

const Explanation = styled.div`
  margin-top: 0.8rem;
  color: ${({ $correct, theme }) =>
    $correct ? theme.colors.success : theme.colors.error};

  p {
    margin: 0.25rem 0 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
  }
`;
