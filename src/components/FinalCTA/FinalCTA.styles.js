import styled, { keyframes } from "styled-components";

/* ---------- Animações ---------- */

const float = keyframes`
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(25px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { opacity: .6; }
  50% { opacity: .9; }
  100% { opacity: .6; }
`;

/* ---------- Containers principais ---------- */

export const CTAWrapper = styled.section`
  position: relative;
  padding: 6rem 1.5rem;
  overflow: hidden;
  background: radial-gradient(circle at 50% 20%, #e3faf5 0%, #e8fffb 30%, #f9fffe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CTAInner = styled.div`
  position: relative;
  max-width: 950px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
`;

export const CTAContent = styled.div`
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.65);
  padding: 3rem 2.2rem;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  animation: ${fadeUp} 0.9s ease forwards;
  border: 1px solid rgba(255,255,255,0.4);
`;

/* ---------- Texto ---------- */

export const CTATitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primaryDark || "#1d5f53"};
  margin-bottom: 1rem;
  line-height: 1.15;
`;

export const CTASubtitle = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: ${({ theme }) => theme.colors.text || "#40605a"};
  margin-bottom: 2rem;
  opacity: 0.9;
`;

/* ---------- Botão ---------- */

export const CTAButton = styled.a`
  padding: 0.9rem 2.4rem;
  background: ${({ theme }) => theme.gradients.button || "linear-gradient(135deg,#2a9d8f,#21867b)"};
  color: #fff;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  font-size: 1.1rem;
  box-shadow: 0 6px 20px rgba(42,157,143,0.3);
  transition: all 0.25s ease;
  display: inline-block;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 12px 28px rgba(42,157,143,0.35);
    filter: brightness(1.08);
  }
`;

/* ---------- Elementos decorativos ---------- */

export const Glow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(42,157,143,0.35), transparent 70%);
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  filter: blur(50px);
  z-index: 1;
  animation: ${pulse} 10s ease-in-out infinite;
`;

export const Blob1 = styled.div`
  position: absolute;
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg,#2a9d8f,#43ccba);
  border-radius: 40% 60% 45% 55% / 60% 40% 60% 40%;
  top: 22%;
  left: -120px;
  filter: blur(25px);
  opacity: 0.35;
  animation: ${float} 8s infinite ease-in-out;
`;

export const Blob2 = styled.div`
  position: absolute;
  width: 260px;
  height: 260px;
  background: linear-gradient(135deg,#35b5a5,#1f8c81);
  border-radius: 60% 40% 55% 45% / 35% 60% 40% 65%;
  bottom: 18%;
  right: -110px;
  filter: blur(25px);
  opacity: 0.33;
  animation: ${float} 7.5s infinite ease-in-out reverse;
`;
