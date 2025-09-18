import React from "react";
import styled, { keyframes } from "styled-components";

// Animações para o texto e botão
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #43aa8b 0%, #2a6f61 100%);
  color: white;
  min-height: 400px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    min-height: auto;
  }
`;

export const HeroContent = styled.div`
  max-width: 600px;
  animation: ${fadeInUp} 1s ease forwards;
`;

export const HeroHeadline = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-weight: 900;
  line-height: 1.1;
`;

export const HeroSubheadline = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: 500;
`;

export const HeroButton = styled.a`
  display: inline-block;
  padding: 0.9rem 2rem;
  background: white;
  color: #2a6f61;
  font-weight: 700;
  border-radius: 30px;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #264653;
    color: white;
  }
`;

export const HeroImage = styled.img`
  max-width: 350px;
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.2));
  animation: ${zoomIn} 6s ease-in-out infinite alternate;

  @media (max-width: 768px) {
    max-width: 80%;
    margin-top: 2rem;
  }
`;

export default function Hero() {
  return (
    <HeroSection id="inicio">
      <HeroContent>
        <HeroHeadline>Transforme seu corpo e sua mente hoje</HeroHeadline>
        <HeroSubheadline>
          Descubra os melhores produtos e dicas para melhorar sua performance e saúde
        </HeroSubheadline>
        <HeroButton href="#dicas-saude">
          Confira nossas dicas de saúde
        </HeroButton>
      </HeroContent>
      <HeroImage
        src="https://images.pexels.com/photos/8436128/pexels-photo-8436128.jpeg"
        alt="Pessoa saudável fazendo exercício"
        loading="lazy"
      />
    </HeroSection>
  );
}
