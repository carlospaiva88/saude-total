import styled from "styled-components";

// Card base de produto relacionado, igual Viagem/Product
export const ProductCardBlogBase = styled.article`
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(42, 157, 143, 0.12);
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(42, 157, 143, 0.18);
  }
`;

export const ProductCardBlogImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid #e9f5f2;
  user-select: none;
`;

export const ProductCardBlogBody = styled.div`
  padding: 1.05rem 1.2rem;
  display: flex;
  flex-direction: column;
`;

export const ProductCardBlogTitle = styled.h3`
  font-size: 1.12rem;
  color: #2a6f61;
  margin: 0 0 0.6rem 0;
  font-weight: 600;
`;

export const ProductCardBlogDescription = styled.p`
  font-size: 0.98rem;
  color: #40514e;
  flex-grow: 1;
  margin-bottom: 1rem;
`;

export const ProductCardBlogPrice = styled.p`
  font-size: 1.02rem;
  color: #43aa8b;
  font-weight: 600;
  margin-bottom: 0.9rem;
`;

export const ProductCardBlogButton = styled.a`
  display: inline-block;
  font-weight: 600;
  background: #43aa8b;
  color: #fff;
  text-decoration: none;
  border-radius: 28px;
  padding: 0.65rem 1.2rem;
  text-align: center;
  font-size: 1rem;
  margin-top: 0.6rem;
  transition: background .25s;
  &:hover {
    background: #2a6f61;
  }
`;
