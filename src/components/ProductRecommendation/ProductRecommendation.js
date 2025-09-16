import styled from "styled-components";

const ProductGrid = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const ProductCard = styled.div`
  background: #e9f5f2;
  border-radius: 12px;
  padding: 1rem;
  text-align: left;
  flex: 1 1 240px;
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
`;

export default function ProductRecommendation({ products }) {
  if (!products) return null;
  return (
    <ProductGrid>
      {products.map((prod, idx) => (
        <ProductCard key={idx}>
          <b>{prod.name}</b>
          <p>{prod.description}</p>
          <BuyButton href={prod.link} target="_blank" rel="nofollow noopener noreferrer">
            Comprar
          </BuyButton>
        </ProductCard>
      ))}
    </ProductGrid>
  );
}
