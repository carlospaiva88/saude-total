import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem 1.2rem;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #555;
`;

const RecipeCard = ({ receita }) => {
  return (
    <Card to={`/receitas/${receita.slug}`}>
      <Image src={receita.imagem} alt={receita.titulo} />
      <Info>
        <Title>{receita.titulo}</Title>
        <Description>{receita.descricao}</Description>
      </Info>
    </Card>
  );
};

export default RecipeCard;
