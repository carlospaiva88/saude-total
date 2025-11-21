import React from "react";
import styled, { keyframes } from "styled-components";

// ===================== ANIMATIONS =====================
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;


// ===================== FRASE DO DIA =====================
export const FraseCard = styled.div`
  background: #f9fafb;
  border-left: 5px solid #6366f1;
  border-radius: 10px;
  padding: 16px;
  font-style: italic;
  color: #374151;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  animation: ${fadeInUp} 0.5s ease;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;

  &.flip {
    transform: rotateX(90deg);
  }
`;

export function FraseDoDia() {
  const frases = [
    "A constância vence o que a força não alcança.",
    "Cuidar de si é o primeiro passo para cuidar do mundo.",
    "Pequenas ações diárias constroem grandes resultados.",
    "Respire. Você já fez o mais difícil: começou.",
  ];

  const [frase, setFrase] = React.useState(frases[Math.floor(Math.random() * frases.length)]);
  const [animando, setAnimando] = React.useState(false);

  const trocarFrase = () => {
    setAnimando(true);
    setTimeout(() => {
      setFrase(frases[Math.floor(Math.random() * frases.length)]);
      setAnimando(false);
    }, 400);
  };

  return (
    <FraseCard onClick={trocarFrase} className={animando ? "flip" : ""}>
      “{frase}”
    </FraseCard>
  );
}

export default FraseDoDia;

