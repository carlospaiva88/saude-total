import React, { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import blogPosts from "../data/blogPosts";
import Breadcrumbs from "../components/BreadCrumbs";
import Comentarios from '../components/Comentarios';
import ShareButtons from "../components/ShareButtons";
import AudioReader from "../components/AudioReader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ArtigoPage() {
  const { categoria, slug } = useParams();
  const navigate = useNavigate();

  const artigo = blogPosts.find((post) => post.slug === slug);
  const seenSlugs = new Set();

  const recentPosts = artigo
    ? Object.values(blogPosts)
        .filter(a => a.category === artigo.category && a.slug !== artigo.slug)
        .filter(a => {
          if (seenSlugs.has(a.slug)) return false;
          seenSlugs.add(a.slug);
          return true;
        })
        .slice(0, 5)
    : [];

  const carouselRef = useRef(null);

  if (!artigo) {
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

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const { clientWidth, scrollLeft } = carouselRef.current;
    const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    carouselRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Touch Handling
  let startX = 0;
  let scrollLeftStart = 0;

  const onTouchStart = (e) => {
    startX = e.touches[0].pageX;
    scrollLeftStart = carouselRef.current.scrollLeft;
  };

  const onTouchMove = (e) => {
    if (!carouselRef.current) return;
    const x = e.touches[0].pageX;
    const walk = startX - x; // distance moved
    carouselRef.current.scrollLeft = scrollLeftStart + walk;
  };

  return (
    <>
      <Helmet>
        <title>{artigo.title} - Saúde em Movimento</title>
        <meta name="description" content={artigo.description || artigo.excerpt || ''} />
        <meta property="og:title" content={artigo.title} />
        <meta property="og:description" content={artigo.description || artigo.excerpt || ''} />
        <meta property="og:image" content={artigo.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={artigo.title} />
        <meta name="twitter:description" content={artigo.description || artigo.excerpt || ''} />
        <meta name="twitter:image" content={artigo.image} />
      </Helmet>

      <Navbar />
      <Breadcrumbs />

      <Container>
        <Title>{artigo.title}</Title>
        
        <MetaInfo>
          Publicado em {artigo.date} • {artigo.readingTime}
        </MetaInfo>

        {artigo.image && <HeroImage src={artigo.image} alt={artigo.title} />}

        <AudioReader texto={artigo.content.replace(/<[^>]+>/g, "")} />

        <Content dangerouslySetInnerHTML={{ __html: artigo.content }} />

        {artigo.relatedProducts && artigo.relatedProducts.length > 0 && (
          <ProductSection>
            <h2>Produtos relacionados</h2>
            {artigo.relatedProducts.map((prod) => (
              <ProductCardBlogBase key={prod.id}>
                <ProductCardBlogImage src={prod.image} alt={prod.name} />
                <ProductCardBlogBody>
                  <ProductCardBlogTitle>{prod.name}</ProductCardBlogTitle>
                  {prod.price && <ProductCardBlogPrice>{prod.price}</ProductCardBlogPrice>}
                  <ProductCardBlogDescription>{prod.description}</ProductCardBlogDescription>
                  <ProductCardBlogButton
                    href={prod.affiliateLink}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Ver Produto
                  </ProductCardBlogButton>
                </ProductCardBlogBody>
              </ProductCardBlogBase>
            ))}
          </ProductSection>
        )}

        <ShareButtons />

        <Comentarios slug={slug} />

        {recentPosts.length > 0 && (
          <RecentPostsSection>
            <h2>Últimos Posts em {artigo.category.charAt(0).toUpperCase() + artigo.category.slice(1)}</h2>
            <CarouselWrapper>
              <ArrowLeft onClick={() => scroll("left")} aria-label="Scroll Left">
                <FaChevronLeft size={24} />
              </ArrowLeft>

              <RecentPostsCarousel
                ref={carouselRef}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                tabIndex={0}
                aria-label="Carrossel de últimos posts"
              >
                {recentPosts.map(post => (
                  <PostCard key={post.slug} to={`/blog/${post.category}/${post.slug}`}>
                    <img src={post.image} alt={post.title} />
                    <PostTitle>{post.title}</PostTitle>
                  </PostCard>
                ))}
              </RecentPostsCarousel>

              <ArrowRight onClick={() => scroll("right")} aria-label="Scroll Right">
                <FaChevronRight size={24} />
              </ArrowRight>
            </CarouselWrapper>
          </RecentPostsSection>
        )}

        <BackLink to={`/blog/${artigo.category}`}>
          ← Voltar para {artigo.category.charAt(0).toUpperCase() + artigo.category.slice(1)}
        </BackLink>
      </Container>

      <Footer />
    </>
  );
}

// Styled Components

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  line-height: 1.7;
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
  height: 400px;
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

const RecentPostsSection = styled.section`
  margin-top: 4rem;

  h2 {
    text-align: center;
    color: #2a6f61;
    margin-bottom: 1.5rem;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const RecentPostsCarousel = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #43aa8b;
    border-radius: 4px;
  }

  &:focus {
    outline: none;
  }
`;

const ArrowLeft = styled.button`
  position: absolute;
  left: 0;
  z-index: 1;
  background: rgba(66, 170, 139, 0.9);
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #2a6f61;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const ArrowRight = styled.button`
  position: absolute;
  right: 0;
  z-index: 1;
  background: rgba(66, 170, 139, 0.9);
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #2a6f61;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const PostCard = styled(Link)`
  flex: 0 0 200px;
  scroll-snap-align: start;
  background: #edf7f4;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(42, 157, 143, 0.12);
  text-decoration: none;
  color: #264653;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }

  &:focus {
    outline: 2px solid #2a6f61;
    outline-offset: 2px;
  }
`;

const PostTitle = styled.div`
  font-size: 1rem;
  padding: 0.75rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
