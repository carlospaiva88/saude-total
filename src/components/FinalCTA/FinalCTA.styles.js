import styled from "styled-components";

export const CTASection = styled.section`
  background: ${({ theme }) => theme.gradients.hero};
  color: ${({ theme }) => theme.colors.white};
  padding: 6rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const CTACard = styled.div`
  max-width: 700px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 3rem 2rem;
  box-shadow: ${({ theme }) => theme.shadow.medium};
  backdrop-filter: blur(6px);
`;

export const CTATitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

export const CTASubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

export const CTAButton = styled.a`
  padding: 1rem 2.5rem;
  background: ${({ theme }) => theme.gradients.button};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.button};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  box-shadow: ${({ theme }) => theme.shadow.light};

  &:hover {
    background: ${({ theme }) => theme.gradients.buttonHover};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.medium};
  }
`;
