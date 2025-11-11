import styled, { keyframes, css } from "styled-components";

// animações
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatImage = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
`;

export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.gradients.hero};
  color: ${({ theme }) => theme.colors.white};
  min-height: 500px;
  gap: 2rem;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    min-height: 600px;
  }
`;

export const HeroContent = styled.div`
  max-width: 600px;
  animation: ${fadeInUp} 1s ease forwards;
  z-index: 2;
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
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeInUp} 1.2s ease forwards;
  z-index: 1;
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

export const FloatingImage = styled.img`
  position: absolute;
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 16px;
  opacity: 0.9;
  animation: ${floatImage} 5s ease-in-out infinite alternate;
  animation-delay: ${({ delay }) => delay || "0s"};
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.15));

  ${({ position }) =>
    position === "top-left" &&
    css`
      top: -90px;
      left: -40px;
      transform: rotate(-8deg);
    `}
  ${({ position }) =>
    position === "top-right" &&
    css`
      top: -50px;
      right: -25px;
      transform: rotate(6deg);
    `}
  ${({ position }) =>
    position === "bottom-right" &&
    css`
      bottom: -50px;
      right: -30px;
      transform: rotate(-5deg);
    `}
  ${({ position }) =>
    position === "bottom-left" &&
    css`
      bottom: -90px;
      left: 0;
      transform: rotate(8deg);
    `}
  ${({ position }) =>
    position === "middle-left" &&
    css`
      top: 220px;
      left: -180px;
      transform: rotate(-4deg);
    `}
  ${({ position }) =>
    position === "middle-right" &&
    css`
      top: 180px;
      right: -18px;
      transform: rotate(5deg);
    `}

  @media (max-width: 768px) {
    display: none;
  }
`;
