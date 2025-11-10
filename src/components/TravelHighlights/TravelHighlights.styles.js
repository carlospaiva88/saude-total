import styled from "styled-components";

export const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
  background: #f8fcfb;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #264653;
  margin-bottom: 2.5rem;
`;

export const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #2a6f61;
  margin: 2rem 0 1rem;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

export const Card = styled.article`
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(67, 170, 139, 0.1);
  padding: 1.5rem;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(67, 170, 139, 0.2);
  }
`;

export const CardBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 0.35rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 12px;
  color: white;
  background: ${({ category }) =>
    category === "nacionais" ? "#43aa8b" : "#264653"};
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #2a6f61;
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #40514e;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

export const CardButton = styled.button`
  padding: 0.65rem 1.5rem;
  background: #43aa8b;
  color: white;
  font-weight: 600;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2a6f61;
  }
`;
