import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(231, 111, 81, 0.7);
  }
  70% {
    box-shadow: 0 0 24px 14px rgba(231, 111, 81, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(231, 111, 81, 0);
  }
`;

export const FinalCTAWrapper = styled.section`
  background: linear-gradient(135deg, #90be6d, #43aa8b);
  padding: 5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

export const FinalCTACard = styled.div`
  background: white;
  color: #264653;
  padding: 3rem 3rem 3.5rem;
  border-radius: 24px;
  max-width: 620px;
  text-align: center;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-6px);
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
    color: #2a9d8f;
    font-weight: 700;
  }

  p {
    font-size: 1.15rem;
    margin-bottom: 2.5rem;
    line-height: 1.6;
    font-weight: 500;
  }
`;

export const FinalButton = styled.a`
  padding: 1.2rem 3.2rem;
  background: linear-gradient(90deg, #e76f51, #f4a261);
  background-size: 200% 200%;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
  transition: background-position 0.4s ease, transform 0.3s ease;
  font-size: 1.25rem;
  color: white;
  box-shadow: 0 8px 25px rgba(231, 111, 81, 0.5);
  text-decoration: none;
  animation: ${pulse} 2.5s infinite;

  &:hover,
  &:focus {
    background-position: 100% 0;
    transform: scale(1.1);
    box-shadow: 0 12px 38px rgba(244, 162, 97, 0.7);
  }
  &:active {
    transform: scale(1);
    box-shadow: 0 6px 15px rgba(231, 111, 81, 0.6);
  }
`;
