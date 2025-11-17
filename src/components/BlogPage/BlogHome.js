import React, { useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import NavbarSpacer from "../Navbar/NavbarSpacer";
import Footer from "../Footer/Footer";

import { CardBase, CardImage, CardBody, CardTitle, CardDescription } from "../CardBase/cardBase";

const blogCategories = [
  {
    id: "fisica",
    name: "Saúde Física",
    description: "Fortaleça seu corpo com dicas, exercícios e hábitos saudáveis.",
    image: "https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg",
    slug: "fisica",
  },
  {
    id: "mental",
    name: "Saúde Mental",
    description: "Cuide da mente, reduza o estresse e melhore seu bem-estar.",
    image: "https://images.pexels.com/photos/7605733/pexels-photo-7605733.jpeg",
    slug: "mental",
  },
  {
    id: "emocional",
    name: "Saúde Emocional",
    description: "Equilibre emoções e fortaleça a inteligência emocional.",
    image: "https://images.pexels.com/photos/791764/pexels-photo-791764.jpeg",
    slug: "emocional",
  },
  {
    id: "espiritual",
    name: "Saúde Espiritual",
    description: "Encontre a sua força interior e fortaleça a sua fé.",
    image: "https://images.pexels.com/photos/32593588/pexels-photo-32593588.jpeg",
    slug: "espiritual",
  },
];

const popularPosts = [
  {
    id: "1",
    title: "10 Dicas para Saúde Física Completa",
    excerpt: "Descubra hábitos simples para fortalecer seu corpo e aumentar sua disposição diária.",
    image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
    slug: "dicas-saude-fisica",
  },
  {
    id: "2",
    title: "Como reduzir o estresse com meditação",
    excerpt: "Técnicas comprovadas para melhorar seu foco e reduzir ansiedade.",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
    slug: "reduzir-estresse-meditacao",
  },
  {
    id: "3",
    title: "Fortalecendo a saúde emocional no dia a dia",
    excerpt: "Passos práticos para uma vida emocional equilibrada e feliz.",
    image: "https://images.pexels.com/photos/3991613/pexels-photo-3991613.jpeg",
    slug: "saude-emocional",
  },
];

export default function BlogHome() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Funções para scroll manual no carrossel
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <Container>
        <HeroBanner>
          <HeroText>
            <h1>Como está a sua saúde hoje?</h1>
            <p>Explore nosso conteúdo para cuidar do corpo, mente e emoções.</p>
          </HeroText>
          <HeroImage
            src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg"
            alt="Saúde e Bem-estar"
          />
        </HeroBanner>

        <SectionTitle>Categorias</SectionTitle>
        <CarouselWrapper>
          <ArrowButtonLeft onClick={scrollLeft} aria-label="Scroll Left">&#8249;</ArrowButtonLeft>
          <CarouselContainer ref={carouselRef} tabIndex={0} aria-label="Carrossel de categorias">
            <CarouselTrack>
              {blogCategories.map((cat) => (
                <CategoryCard key={cat.id} as={Link} to={`/blog/${cat.slug}`}>
                  <CardBase>
                    <CardImage src={cat.image} alt={cat.name} />
                    <CardBody>
                      <CardTitle>{cat.name}</CardTitle>
                      <CardDescription>{cat.description}</CardDescription>
                    </CardBody>
                  </CardBase>
                </CategoryCard>
              ))}
            </CarouselTrack>
          </CarouselContainer>
          <ArrowButtonRight onClick={scrollRight} aria-label="Scroll Right">&#8250;</ArrowButtonRight>
        </CarouselWrapper>

        <SectionTitle>Artigos Populares</SectionTitle>
        <PopularPostsSection>
          {popularPosts.map((post) => (
            <PopularPost
              key={post.id}
              onClick={() => navigate(`/blog/artigo/${post.slug}`)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if(e.key === "Enter") navigate(`/blog/artigo/${post.slug}`); }}
            >
              <CardImage src={post.image} alt={post.title} />
              <PopularPostContent>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <MoreDetailsLink to={`/blog/artigo/${post.slug}`}>Mais detalhes &rarr;</MoreDetailsLink>
              </PopularPostContent>
            </PopularPost>
          ))}
        </PopularPostsSection>
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

const HeroBanner = styled.section`
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
  padding: 2rem;
  background: ${({ theme }) => theme.gradients.soft};
  border-radius: ${({ theme }) => theme.radius.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const HeroText = styled.div`
  flex: 1;

  h1 {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 2rem;
    font-weight: 300;
  }
`;

const HeroImage = styled.img`
  flex: 1;
  border-radius: ${({ theme }) => theme.radius.md};
  max-height: 300px;
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.shadow.sm};

  @media (max-width: 768px) {
    max-height: 220px;
    width: 100%;
    margin-top: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CarouselWrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;
`;

const CarouselContainer = styled.div`
  overflow-x: auto;
  scroll-behavior: smooth;
  white-space: nowrap;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primaryDark};
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

const CarouselTrack = styled.div`
  display: inline-flex;
  gap: 1rem;
`;

const CategoryCard = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: inherit;
  width: 280px;
  vertical-align: top;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  color: white;
  border-radius: 50%;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  transition: background 0.3s;

  &:hover {
    background: rgba(0,0,0,0.5);
  }
`;

const ArrowButtonLeft = styled(ArrowButton)`
  left: 8px;
`;

const ArrowButtonRight = styled(ArrowButton)`
  right: 8px;
`;

const PopularPostsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PopularPost = styled.section`
  display: flex;
  gap: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  cursor: pointer;
  padding: 1rem;
  transition: box-shadow 0.3s;

  &:hover, &:focus {
    box-shadow: ${({ theme }) => theme.shadow.md};
    outline: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  img {
    width: 180px;
    height: 140px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.sm};
    pointer-events: none;
    user-select: none;
  }
`;

const PopularPostContent = styled.div`
  flex: 1;

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }
`;

const MoreDetailsLink = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }
`;
