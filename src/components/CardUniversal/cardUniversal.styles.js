// src/components/CardUniversal/cardUniversal.styles.js
import styled from "styled-components";

export const CardBase = styled.article`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

/* FIXO — garante que todos os cards terão o mesmo tamanho visual */
export const CardImage = styled.img`
  width: 100%;
  height: 200px; 
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardBody = styled.div`
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CardTitle = styled.h3`
  font-size: 1.22rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.35rem;
  line-height: 1.3;

  /* Altura fixa opcional para títulos muito grandes */
  min-height: 48px;
`;

export const CardSubtitle = styled.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.secondaryDark};
  margin-bottom: 0.45rem;
  font-style: italic;
  opacity: 0.9;

  min-height: 20px;
`;

export const CardDescription = styled.p`
  font-size: 0.96rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.45;
  margin-bottom: 0.8rem;

  flex-grow: 1;

  /* FIXA 3 LINHAS — evita cards maiores */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardPrice = styled.p`
  font-size: 1.12rem;
  margin-bottom: 0.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CardButton = styled.a`
  margin-top: auto;
  padding: 0.65rem 1.3rem;
  text-align: center;
  font-weight: 600;

  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.pill};

  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadow.xs};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const CardSticker = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;

  background: ${({ theme }) => theme.colors.primary};
  color: white;

  padding: 0.32rem 0.9rem;
  font-size: 0.8rem;
  font-weight: 700;

  border-radius: ${({ theme }) => theme.radius.pill};

  text-transform: uppercase;
  pointer-events: none;

  /* tamanho fixo */
  min-width: 70px;
  text-align: center;
`;
