// src/components/ui/CardBase.jsx
import styled from "styled-components";

/*
  CardBase central — usado por ArticleCard, ProductCard, TravelCard, etc.
  Exporta: CardBase, CardImage (tag <img>), CardBody, CardTitle, CardSubtitle,
          CardDescription, CardPrice, CardScience, CardButton, CardSticker
*/

export const CardBase = styled.article`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: transform ${({ theme }) => theme.transitions.normal}, box-shadow ${({ theme }) => theme.transitions.normal};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  height: 100%;
  min-height: 0;

  &:hover,
  &:focus {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    outline: none;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  flex-shrink: 0;
  user-select: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 160px;
  }
`;

export const CardBody = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
`;

export const CardTitle = styled.h3`
  font-size: 1.18rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  margin: 0 0 0.4rem 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.secondaryDark};
  font-size: 0.95rem;
  margin: 0 0 0.5rem 0;
  font-style: italic;
`;

export const CardDescription = styled.p`
  font-size: 0.97rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1rem 0;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const CardPrice = styled.p`
  font-size: 1.08rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  margin: 0 0 0.6rem 0;
`;

export const CardScience = styled.p`
  font-size: 0.89rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-style: italic;
  margin: 0 0 0.7rem 0;
`;

export const CardButton = styled.a`
  display: inline-block;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-top: auto;
  transition: background ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  align-self: flex-start;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primaryDark};
    outline: none;
  }
`;

export const CardSticker = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(108,188,163,0.14);
  color: ${({ theme }) => theme.colors.surface};
  font-weight: 700;
  font-size: 1rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  box-shadow: none;
  pointer-events: none;
  user-select: none;
  z-index: 5;
  text-transform: none;
`;

