import { keyframes } from "styled-components";
import styled  from "styled-components";

// Animações suaves
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const floatImage = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;
export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.gradients.hero};
  color: ${({ theme }) => theme.colors.white};
  min-height: 400px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
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
  color: ${({ theme }) => theme.colors.light};
`;
export const HeroButton = styled.a`
  display: inline-block;
  padding: 0.9rem 2rem;
  background: ${({ theme }) => theme.gradients.button};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.button};
  font-weight: 700;
  text-decoration: none;
  transition: 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadow.light};

  &:hover {
    background: ${({ theme }) => theme.gradients.buttonHover};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadow.medium};
  }
`;

export const HeroImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeInUp} 1.2s ease forwards;
`;

export const HeroImage = styled.img`
  max-width: 350px;
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.2));
  animation: ${floatImage} 6s ease-in-out infinite alternate;

  @media (max-width: 768px) {
    max-width: 80%;
    margin-top: 2rem;
  }
`;

