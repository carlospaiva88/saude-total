import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.sectionPadding};
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const CalculatorCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

export const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export const InfoBlock = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.dark};
  }

  p, li {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.4rem;
  }

  ul {
    padding-left: 1.3rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

export const Input = styled.input`
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.gradients.button};
  color: white;
  font-size: 1rem;
  margin-top: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.gradients.buttonHover};
    transform: translateY(-2px);
  }
`;

export const ResultBox = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: ${({ theme }) => theme.gradients.soft};
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow.sm};

  strong {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

export const CTAButton = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.9rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Recommendations = styled.div`
  margin-top: 2rem;

  h4 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.dark};
  }

  ul {
    padding-left: 1.2rem;
  }

  li {
    margin-bottom: 0.4rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: 500;
  }
`;
