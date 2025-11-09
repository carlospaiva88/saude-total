import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import articlesData from "../data/articles";
import Breadcrumbs from "../components/BreadCrumbs";

export default function Subcategoria() {
  const { categoria, subcategoria } = useParams();

  // Evita duplicações ao filtrar artigos
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
            <ArticleCard key={article.slug}>
              <ArticleImage src={article.image} alt={article.title} />
              <ArticleContent>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleDescription>{article.description}</ArticleDescription>
                <ArticleLink to={`./${article.friendlySlug}`}>
                  Ler artigo &gt;
                </ArticleLink>
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
  color: #264653;
  text-align: center;
  margin-bottom: 2rem;
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ArticleCard = styled.div`
  background: #edf7f4;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(42, 157, 143, 0.15);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ArticleContent = styled.div`
  padding: 1.5rem;
`;

const ArticleTitle = styled.h3`
  font-size: 1.5rem;
  color: #2a6f61;
`;

const ArticleDescription = styled.p`
  font-size: 0.95rem;
  color: #40514e;
`;

const ArticleLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  color: #43aa8b;
  text-decoration: none;

  &:hover {
    color: #2a6f61;
  }
`;
