import React from "react";
import styled from "styled-components";

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-block: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProductCard = styled.div`
  background: #f8fcfb;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(67,170,139,0.10);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.2rem;
  width: 100%;
  max-width: 320px;
  min-width: 240px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 0.7rem;
    max-width: 98vw;
    min-width: unset;
    box-shadow: 0 2px 12px rgba(67,170,139,0.12);
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: 600px) {
    width: 64vw;
    max-width: 150px;
    height: 50vw;
    min-height: 90px;
    display: block;
    margin-inline: auto;
    margin-bottom: 0.7rem;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
  color: #264653;
`;

const ProductDescription = styled.p`
  font-size: 0.97rem;
  margin-top: 0.3rem;
  margin-bottom: 0;
  color: #506068;
`;

const BuyButton = styled.a`
  display: inline-block;
  margin-top: 0.6rem;
  width: auto;
  padding: 0.5rem 1.2rem;
  background: #43aa8b;
  color: #fff;
  font-weight: 600;
  font-size: 0.97rem;
  border-radius: 18px;
  text-align: center;
  text-decoration: none;
  transition: background 0.22s;

  &:hover, &:focus {
    background: #2a6f61;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.55rem 0;
  }
`;

export default function ProductRecommendation({ products }) {
  if (!products) return null;
  return (
    <ProductGrid>
      {products.map((prod, idx) => (
        <ProductCard key={idx}>
          <ProductImage src={prod.image} alt={prod.name} />
          <ProductInfo>
            <ProductTitle>{prod.name}</ProductTitle>
            <ProductDescription>{prod.description}</ProductDescription>
            <BuyButton href={prod.link} target="_blank" rel="nofollow noopener noreferrer">
              Comprar
            </BuyButton>
          </ProductInfo>
        </ProductCard>
      ))}
    </ProductGrid>
  );
}
