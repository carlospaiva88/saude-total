import styled from "styled-components";

export const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 960px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #264653;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: center;
`;


export const ProductImage = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;


export const ProductTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #264653;
`;

export const ProductDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #555;
`;

export const ProductButton = styled.a`
  padding: 0.7rem 1.5rem;
  background: #43aa8b;
  color: white;
  border-radius: 25px;
  font-weight: 600;
  transition: background 0.3s ease;
  cursor: pointer;
  &:hover {
    background: #2a9d8f;
  }
`;
