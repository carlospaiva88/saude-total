import styled from "styled-components";

// CARD BASE PADRÃO SIMILAR AO CARD DE RECEITA
export const ProductCardBase = styled.article`
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 15px rgba(67, 170, 139, 0.10);
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 28px rgba(42, 157, 143, 0.16);
  }
`;

export const ProductCardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  user-select: none;
  border-bottom: 1px solid #e9f5f2;
`;

export const ProductCardBody = styled.div`
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ProductCardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
  color: #2a6f61;
  font-weight: 600;
`;

export const ProductCardPrice = styled.p`
  font-size: 1.08rem;
  color: #43aa8b;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const ProductCardDescription = styled.p`
  font-size: 0.95rem;
  color: #40514e;
  margin-bottom: 0.6rem;
  flex-grow: 1;
  min-height: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ProductCardScience = styled.p`
  font-size: 0.85rem;
  color: #496c5f;
  font-style: italic;
  margin-bottom: 1rem;
`;

export const ProductCardButton = styled.a`
  padding: 0.6rem 1.4rem;
  background: #43aa8b;
  color: white;
  border-radius: 30px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  margin-top: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #2a6f61;
  }
`;