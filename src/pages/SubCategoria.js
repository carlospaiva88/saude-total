import {  useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import articlesData from "../data/articles";
import Breadcrumbs from "../components/BreadCrumbs";

export default function Subcategoria() {
  const { categoria, subcategoria } = useParams();
  const navigate = useNavigate();

  const seen = new Set();
  const subArticles = Object.values(articlesData)
    .filter(article => article.category === categoria && article.subcategory === subcategoria)
    .filter(article => {
      if (seen.has(article.slug)) return false;
      seen.add(article.slug);
      return true;
    });

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      <Container>
        <Title>
          Artigos sobre {subcategoria} ({categoria})
        </Title>
        <ArticlesGrid>
          {subArticles.map(article => (
            <ArticleCard as="button" key={article.slug} onClick={() => navigate(`./${article.friendlySlug}`)} onKeyDown={(e) => { if(e.key === 'Enter') navigate(`./${article.friendlySlug}`); }}>
              <ArticleImage src={article.image} alt={article.title} />
              <ArticleContent>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleDescription>{article.description}</ArticleDescription>
                <ReadButton>Ler artigo</ReadButton>
              </ArticleContent>
            </ArticleCard>
          ))}
        </ArticlesGrid>
      </Container>
      <Footer />
    </>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: center;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ArticleCard = styled.button`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: transform 0.3s ease, box-shadow 0.3s;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover,
  &:focus {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.md};
    outline: none;
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  flex-shrink: 0;
`;

const ArticleContent = styled.div`
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ArticleTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ArticleDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  flex-grow: 1;
  margin-bottom: 1.25rem;
`;

const ReadButton = styled.span`
  align-self: flex-start;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  transition: background ${({ theme }) => theme.transitions.fast}, color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    outline: none;
  }
`;
