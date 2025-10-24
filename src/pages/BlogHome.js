// src/pages/BlogHome.js
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const blogCategories = [
  {
    id: "fisica",
    name: "Saúde Física",
    description: "Fortaleça seu corpo com dicas, exercícios e hábitos saudáveis.",
    image: "https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg",
  },
  {
    id: "mental",
    name: "Saúde Mental",
    description: "Cuide da mente, reduza o estresse e melhore seu bem-estar.",
    image: "https://images.pexels.com/photos/7605733/pexels-photo-7605733.jpeg",
  },
  {
    id: "emocional",
    name: "Saúde Emocional",
    description: "Equilibre emoções e fortaleça a inteligência emocional.",
    image: "https://images.pexels.com/photos/791764/pexels-photo-791764.jpeg",
  },
    {
    id: "espiritual",
    name: "Saúde Espiritual",
    description: "Encontre a sua força interior e fortaleça a sua fé.",
    image: "https://images.pexels.com/photos/32593588/pexels-photo-32593588.jpeg",
  },
];

export default function BlogHome() {
  return (
    <>
      <Navbar />
      <Container>
        <Title>Blog de Saúde</Title>
        <Subtitle>Escolha uma categoria e descubra artigos científicos e dicas práticas</Subtitle>

        <CategoriesGrid>
          {blogCategories.map((cat) => (
            <CategoryCard key={cat.id}>
              <CategoryImage src={cat.image} alt={cat.name} />
              <CategoryContent>
                <CategoryTitle>{cat.name}</CategoryTitle>
                <CategoryDescription>{cat.description}</CategoryDescription>
                <CategoryLink to={`/blog/${cat.id}`}>Ver artigos &gt;</CategoryLink>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Container>
      <Footer />
    </>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #264653;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  color: #40514e;
  margin-bottom: 3rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div`
  background: #edf7f4;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(42, 157, 143, 0.15);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #2a6f61;
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  font-size: 0.95rem;
  color: #40514e;
  margin-bottom: 1rem;
`;

const CategoryLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  color: #43aa8b;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #2a6f61;
  }
`;
