// src/pages/ArtigoPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import blogPosts from "../data/blogPosts";
import ProductCardComponent from "../components/ProductCard/ProductCard";

const PageContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
`;

const Breadcrumb = styled.nav`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  a {
    color: #43aa8b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ArticleHeader = styled.header`
  margin-bottom: 2rem;

  h1 {
    font-size: 2.2rem;
    color: #2a6f61;
    margin-bottom: 0.5rem;
  }

  img {
    width: 100%;
    max-height: 350px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
  }
`;

const ArticleContent = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  color: #40514e;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: #264653;
  }

  ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const RelatedProducts = styled.section`
  margin-top: 3rem;

  h2 {
    font-size: 1.5rem;
    color: #2a6f61;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

export default function ArtigoPage() {
  const { categoria, slug } = useParams();
  const artigo = blogPosts.find((post) => post.slug === slug);

  if (!artigo) return <p>Artigo não encontrado</p>;

  return (
    <>
      <Navbar />
      <PageContainer>
        <Breadcrumb>
          <Link to="/dicas-saude">Dicas de Saúde</Link> &gt;{" "}
          <Link to={`/dicas-saude/${categoria}`}>
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </Link>{" "}
          &gt; {artigo.title}
        </Breadcrumb>

        <ArticleHeader>
          <h1>{artigo.title}</h1>
          {artigo.image && <img src={artigo.image} alt={artigo.title} />}
        </ArticleHeader>

        <ArticleContent>
          {artigo.content.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </ArticleContent>

        {artigo.relatedProducts && artigo.relatedProducts.length > 0 && (
          <RelatedProducts>
            <h2>Produtos relacionados</h2>
            {artigo.relatedProducts.map((prod) => (
              <ProductCardComponent
                key={prod.id}
                id={prod.id}
                name={prod.name}
                price={prod.price}
                image={prod.image}
                description={prod.description}
                affiliateLink={prod.affiliateLink}
              />
            ))}
          </RelatedProducts>
        )}
      </PageContainer>
      <Footer />
    </>
  );
}
