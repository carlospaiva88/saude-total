// src/components/Viagens/ViagemCard.style.jsx
import styled from "styled-components";

export const ViagemCardBase = styled.article`
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  box-shadow: 0 6px 24px rgba(16, 88, 71, 0.06);
  transition: transform .22s ease, box-shadow .22s ease;
  display:flex;
  flex-direction:column;
  cursor:pointer;
  height:100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 46px rgba(16, 88, 71, 0.12);
  }
`;

export const ViagemCardImage = styled.img`
  width:100%;
  height: 180px;
  object-fit: cover;
  flex-shrink:0;
  display:block;
`;

export const ViagemCardBody = styled.div`
  padding: 0.9rem 1rem;
  display:flex;
  flex-direction:column;
  gap: .4rem;
  flex:1;
`;

export const ViagemCardTitle = styled.h3`
  font-size:1.05rem;
  margin:0;
  color: ${({theme})=>theme.colors?.primaryDark || "#163d35"};
`;

export const ViagemCardSubtitle = styled.p`
  color: ${({theme})=>theme.colors?.secondaryDark || "#6b8a7b"};
  font-size:.9rem;
  margin:0;
`;

export const ViagemCardDescription = styled.p`
  margin-top:.4rem;
  font-size:.95rem;
  color: ${({theme})=>theme.colors?.text || "#333"};
  flex:1;
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;

/* Produto recomendado pequeno usado na ViagemPage */
export const ProductRecommendationCard = styled(ViagemCardBase)`
  flex-direction: row;
  align-items: center;
  padding: 0.8rem;
  gap: 0.8rem;

  img { width: 96px; height: 96px; object-fit: cover; border-radius: 8px; }
  div { flex:1; }
`;
export default null;
