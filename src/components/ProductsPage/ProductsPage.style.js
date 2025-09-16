import styled from "styled-components";

export const PageContainer = styled.div`
  max- width: 1100px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  min-height: 80vh; 
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

 export const CategoryHighlight = styled.section`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.75rem 2rem;
  background: #edf7f4;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(42, 157, 143, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

 export const HighlightImage = styled.img`
  height: 180px;
  border-radius: 12px;
  object-fit: cover;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

 export const HighlightText = styled.div`
  flex: 1;

  h2 {
    font-size: 2rem;
    color: #2a6f61;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.05rem;
    color: #40514e;
    line-height: 1.5;
  }
`;

 export const CategoryMenu = styled.div`
  display: flex;
  gap: 1.7rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
`;

 export const CategoryButton = styled.button`
  padding: 0.6rem 1.5rem;
  border-radius: 24px;
  border: none;
  background: ${(props) => (props.active ? "#43aa8b" : "#d8eae5")};
  color: ${(props) => (props.active ? "white" : "#264653")};
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: ${(props) =>
    props.active ? "0 8px 18px rgba(67,170,139,0.45)" : "none"};
  transition: all 0.3s ease;

  &:hover {
    background: #2a6f61;
    color: white;
    box-shadow: 0 8px 20px rgba(42, 157, 143, 0.6);
  }
`;

 export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap: 2rem;
`;

 export const ProductCard = styled.article`
  background: #e9f5f2;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(42, 157, 143, 0.15);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.35s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

 export const ProductImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

 export const ProductName = styled.h3`
  color: #264653;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;

export const ProductPrice = styled.p`
  color: #2a6f61;
  font-weight: 700;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
`;

export const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #40514e;
  flex-grow: 1;
  min-height: 70px; /* altura fixa para alinhar o conteúdo */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* limita a 3 linhas */
  -webkit-box-orient: vertical;
  margin-bottom: 1rem;
`;

export const ProductScience = styled.p`
  font-size: 0.85rem;
  font-style: italic;
  color: #496c5f;
  line-height: 1.35;
  margin-bottom: 1rem;
`;

export const BuyButton = styled.a`
  display: inline-block;
  padding: 0.65rem 1.6rem;
  background: #43aa8b;
  color: white;
  font-weight: 600;
  border-radius: 32px;
  text-align: center;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: #2a6f61;
  }
`;
export const ProductCardStyled = styled.article`
  &.highlight {
    background-color: #d1f7ff;
    box-shadow: 0 0 0 2px #43aa8b;
    transition: all 0.5s ease;
  }
`;