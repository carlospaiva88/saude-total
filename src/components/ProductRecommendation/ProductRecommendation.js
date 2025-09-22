import React from "react";
import styled from "styled-components";

const ProductGrid = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  max-width: 100%;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fcfb;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(67,170,139,0.08);
  flex-shrink: 0;
  max-width: 320px;

  @media(max-width: 650px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 1rem 0.5rem;
    gap: 0.5rem;
  }
`;

const ProductImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 11px;
  object-fit: cover;
  @media(max-width: 650px) {
    width: 70vw;
    max-width: 220px;
    height: auto;
    margin-bottom: 0.5rem;
  }
`;

const ProductDescription = styled.p`
  word-break: break-word;
  margin: 0;
  font-size: 0.95rem;
  color: #264653;
`;

const BuyButton = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  background: #43aa8b;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1.15rem;
  border-radius: 20px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a6f61;
  }
`;

export default function ProductRecommendation({ products }) {
  if (!products) return null;

  return (
    <ProductGrid>
      {products.map((prod, idx) => (
        <ProductCard key={idx}>
          {prod.image && <ProductImage src={prod.image} alt={prod.name} />}
          <div>
            <b>{prod.name}</b>
            <ProductDescription>{prod.description}</ProductDescription>
            <BuyButton
              href={prod.link}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Comprar
            </BuyButton>
          </div>
        </ProductCard>
      ))}
    </ProductGrid>
  );
}
