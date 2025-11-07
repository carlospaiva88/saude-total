import styled from "styled-components";

export const Section = styled.section`
  padding: 4rem 2rem;
  background: #edf7f4;
  max-width: 1100px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #264653;
  margin-bottom: 2.5rem;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(67, 170, 139, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(67, 170, 139, 0.2);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

export const ProductTitle = styled.h3`
  font-size: 1.25rem;
  color: #2a6f61;
  margin-bottom: 0.5rem;
`;

export const ProductDescription = styled.p`
  font-size: 0.95rem;
  color: #40514e;
  margin-bottom: 1rem;
`;

export const BuyButton = styled.a`
  display: inline-block;
  padding: 0.65rem 1.5rem;
  background: #43aa8b;
  color: white;
  font-weight: 600;
  border-radius: 30px;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: #2a6f61;
  }
`;
