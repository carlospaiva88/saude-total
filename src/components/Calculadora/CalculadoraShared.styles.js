import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CalculatorContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  animation: ${fadeInUp} 0.4s ease-out;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: ${({ theme }) => theme.shadow.xs};
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  padding: 0.9rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: white;
  font-weight: 600;
  transition: ${({ theme }) => theme.transitions.normal};
  margin-top: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const ResultBox = styled.div`
  margin-top: 1.8rem;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  animation: ${fadeInUp} 0.3s ease-out;

  h3 {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    margin-top: 0.4rem;
  }
`;
