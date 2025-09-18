import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import articlesData from "../data/articles";
import Breadcrumbs from "../components/BreadCrumbs";
import Comentarios from '../components/Comentarios';
import ShareButtons from "../components/ShareButtons";
import AudioReader from "../components/AudioReader";

export default function Artigo() {
  const { slug } = useParams();
  const article = articlesData[slug];

  if (!article) {
    return (
      <>
        <Navbar />
        <Breadcrumbs />
        <Container>
          <Title>Artigo não encontrado</Title>
          <Link to="/blog">Voltar ao Blog</Link>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Helmet para SEO e Open Graph */}
      <Helmet>
        <title>{article.title} - Saúde em Movimento</title>
        <meta name="description" content={article.description || article.excerpt || ''} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description || article.excerpt || ''} />
        <meta property="og:image" content={article.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description || article.excerpt || ''} />
        <meta name="twitter:image" content={article.image} />
      </Helmet>

      <Navbar />
      <Breadcrumbs />

      <Container>
        <Title>{article.title}</Title>
        
        <MetaInfo>
          Publicado em {article.date} • {article.readingTime}
        </MetaInfo>
        <HeroImage src={article.image} alt={article.title} />
        <AudioReader texto={article.content.replace(/<[^>]+>/g, "")} />
        <Content dangerouslySetInnerHTML={{ __html: article.content }} />
        {article.product && (
          <ProductSection>
            <h2>Produto Recomendado</h2>
            <ProductCard>
              <img src={article.product.image} alt={article.product.name} />
              <div>
                <h3>{article.product.name}</h3>
                <p>{article.product.description}</p>
                <a href={article.product.link} target="_blank" rel="noreferrer">Conhecer Agora</a>
              </div>
            </ProductCard>
          </ProductSection>
        )}

        <ShareButtons /> {/* Opcional: inclua se já criou o componente de compartilhamento */}

        <Comentarios slug={slug} />

        <BackLink to={`/blog/${article.category}`}>← Voltar para {article.categoryName}</BackLink>
      </Container>
      <Footer />
    </>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  line-height: 1.7;
`;

const Breadcrumb = styled.div`
  font-size: 0.9rem;
  color: #40514e;
  margin-bottom: 0.5rem;
  a {
    color: #43aa8b;
    text-decoration: none;
    &:hover {
      color: #2a6f61;
    }
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #264653;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const MetaInfo = styled.p`
  text-align: center;
  font-size: 0.95rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 400px; // Altere conforme preferência: 320px, 350px, 450px...
  object-fit: cover;
  border-radius: 16px;
  margin: 1.5rem 0;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const Content = styled.div`
  font-size: 1.05rem;
  color: #40514e;
  h2 {
    font-size: 1.6rem;
    margin: 1.5rem 0 1rem;
    color: #2a6f61;
  }
  h3 {
    font-size: 1.2rem;
    margin: 1rem 0;
    color: #43aa8b;
  }
  p {
    margin-bottom: 1rem;
  }
  ul,
  ol {
    margin: 1rem 0 1.5rem 1.5rem;
  }
`;

const ProductSection = styled.section`
  margin-top: 3rem;
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(42, 157, 143, 0.08);
  border: 1px solid rgba(42, 157, 143, 0.12);
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #264653;
    font-size: 1.4rem;
  }
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: #f8fcfb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 6px 24px rgba(42, 157, 143, 0.15);
    transform: translateY(-2px);
  }
  img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
  }
  div {
    flex: 1;
  }
  h3 {
    margin: 0 0 0.75rem 0;
    color: #264653;
    font-size: 1.3rem;
  }
  p {
    margin: 0.5rem 0;
    color: #536e70;
    line-height: 1.5;
  }
  a {
    display: inline-block;
    background: #43aa8b;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    margin-top: 1rem;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
    &:hover {
      background: #2a6f61;
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  font-weight: 600;
  color: #43aa8b;
  text-decoration: none;
  &:hover {
    color: #2a6f61;
  }
`;
