import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const CalculatorCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.6rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  max-width: 680px;
  width: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 0.9rem;

  & > div {
    flex: 1 1 180px;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.95rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  outline: none;

  &:focus {
    box-shadow: 0 6px 18px rgba(67,170,139,0.06);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PrimaryBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.85rem 1.1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: none;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  margin-top: 6px;

  &:hover { transform: translateY(-3px); }
`;

export const ResultBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(90deg, rgba(109,188,163,0.06), rgba(244,164,141,0.04));
  box-shadow: ${({ theme }) => theme.shadow.xs};
  animation: ${fadeInUp} 0.35s ease;
`;

export const SmallMeta = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0.4rem;
`;

export const CalculatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

export const PageShell = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 2.2rem auto;
  padding: 0 1rem;
`;
