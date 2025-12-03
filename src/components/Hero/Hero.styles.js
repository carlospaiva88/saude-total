import styled, { keyframes, css } from "styled-components";

/* animações */
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const floatImage = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

/* respeitar preferência do usuário por reduzir movimento */
const prefersReducedMotion = `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}`;

/* Container do hero */
export const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 3.5rem 2rem;
  background: ${({ theme }) =>
    theme?.gradients?.hero || "linear-gradient(180deg,#e6f9f0,#f7fff9)"};
  color: ${({ theme }) => theme?.colors?.white || "#fff"};
  min-height: 520px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 980px) {
    flex-direction: column;
    text-align: center;
    min-height: 560px;
    padding: 2.25rem 1.25rem;
  }

  ${prefersReducedMotion}
`;

/* Conteúdo textual */
export const HeroContent = styled.div`
  max-width: 640px;
  z-index: 3;
  animation: ${fadeInUp} 850ms cubic-bezier(.2,.9,.2,1) both;

  @media (max-width: 980px) {
    order: 2;
    width: 100%;
    margin-top: 1rem;
  }
`;

/* Título principal */
export const HeroHeadline = styled.h1`
  font-size: clamp(1.6rem, 3.8vw, 3rem);
  line-height: 1.05;
  margin: 0 0 0.75rem 0;
  font-weight: 800;
  color: ${({ theme }) => theme?.colors?.surface || "#04332a"};
  text-wrap: balance;
`;

/* Subtítulo */
export const HeroSubheadline = styled.p`
  margin: 0 0 1.25rem 0;
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  color: ${({ theme }) => theme?.colors?.light || "rgba(0,0,0,0.65)"};
  max-width: 56ch;
`;

/* CTA */
export const HeroButton = styled.a`
  display: inline-block;
  padding: 0.9rem 1.6rem;
  background: ${({ theme }) =>
    theme?.gradients?.button || "linear-gradient(90deg,#2fa57a,#1f7f5f)"};
  color: ${({ theme }) => theme?.colors?.surface || "#fff"};
  border-radius: ${({ theme }) => theme?.radius?.pill || "999px"};
  font-weight: 700;
  text-decoration: none;
  box-shadow: ${({ theme }) =>
    theme?.shadow?.sm || "0 6px 18px rgba(39,174,96,0.12)"};
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
  -webkit-tap-highlight-color: transparent;

  &:hover,
  &:focus {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) =>
      theme?.shadow?.md || "0 12px 28px rgba(39,174,96,0.16)"};
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px rgba(66, 153, 129, 0.16);
  }
`;

/* Wrapper da imagem */
export const HeroImageWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  min-width: 320px;
  max-width: 640px;

  @media (max-width: 980px) {
    order: 1;
    width: 100%;
    max-width: 520px;
  }
`;

/* Imagem principal */
export const HeroImage = styled.img`
  width: 100%;
  max-width: 420px;
  height: auto;
  border-radius: ${({ theme }) => theme?.radius?.lg || "18px"};
  object-fit: cover;
  filter: drop-shadow(0 12px 24px rgba(6, 53, 42, 0.12));
  animation: ${floatImage} 6.5s ease-in-out infinite alternate;
  will-change: transform;

  @media (max-width: 980px) {
    max-width: 320px;
    margin: 0 auto;
  }

  ${prefersReducedMotion}
`;

/* Imagens flutuantes decorativas */
export const FloatingImage = styled.img.attrs((p) => ({
  role: p.decorative ? undefined : "img",
}))`
  position: absolute;
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 14px;
  opacity: 0.95;
  filter: drop-shadow(0 10px 18px rgba(0,0,0,0.12));
  animation: ${floatImage} 5.8s ease-in-out infinite alternate;
  animation-delay: ${({ delay }) => delay || "0s"};
  transition: transform 220ms ease, opacity 220ms ease;

  ${({ position }) =>
    position === "top-left" &&
    css`
      top: -68px;
      left: -36px;
      transform: rotate(-8deg);
    `}
  ${({ position }) =>
    position === "top-right" &&
    css`
      top: -40px;
      right: -26px;
      transform: rotate(6deg);
    `}
  ${({ position }) =>
    position === "bottom-right" &&
    css`
      bottom: -52px;
      right: -30px;
      transform: rotate(-5deg);
    `}
  ${({ position }) =>
    position === "bottom-left" &&
    css`
      bottom: -72px;
      left: -12px;
      transform: rotate(8deg);
    `}
  ${({ position }) =>
    position === "middle-left" &&
    css`
      top: 220px;
      left: -140px;
      transform: rotate(-4deg);
    `}
  ${({ position }) =>
    position === "middle-right" &&
    css`
      top: 170px;
      right: -14px;
      transform: rotate(5deg);
    `}

  @media (max-width: 768px) {
    display: none;
  }

  ${prefersReducedMotion}
`;
