// src/pages/BlogHome.jsx
import React, { useMemo } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import articlesData from "../../data/articles/index"; 
import receitas from "../../data/receitas/index"; 
import CalculadoraPreview from "../../components/Calculadora/CalculadoraPreview";
import ContinueExploring from "./ContinueExploring";
import TagsCloud from "../../components/BlogPage/TagsCloud";
import NewsletterCTA from "../../components/BlogPage/NewsletterCTA";
import viagensData from "../../data/viagens/index"
import productsData from "../../data/products";
import CarouselFinal from "../../components/BlogPage/CarouselFinal";



import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { id: "fisica", name: "Física", image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg" },
  { id: "mental", name: "Mental", image: "https://images.pexels.com/photos/4804320/pexels-photo-4804320.jpeg" },
  { id: "emocional", name: "Emocional", image: "https://images.pexels.com/photos/6765024/pexels-photo-6765024.jpeg" },
  { id: "espiritual", name: "Espiritual", image: "https://images.pexels.com/photos/999309/pexels-photo-999309.jpeg" },
];

export default function BlogHome() {
  const navigate = useNavigate();

  // Flatten articles (works whether user exports array or object)
  const postsArray = useMemo(() => {
    if (!articlesData) return [];
    return Array.isArray(articlesData) ? articlesData : Object.values(articlesData);
  }, []);

  // Ordena por data (mais recentes primeiro)
  const recent = useMemo(() => {
    return postsArray
      .slice()
      .sort((a, b) => {
        const da = new Date(a.date || a.datePublished || 0).getTime();
        const db = new Date(b.date || b.datePublished || 0).getTime();
        return db - da;
      })
      .slice(0, 9);
  }, [postsArray]);

  const popular = useMemo(() => {
    return postsArray
      .filter(p => p.featured || p.destaque || p.popular)
      .slice(0, 6);
  }, [postsArray]);


const carouselItems = useMemo(() => {
  
  // produtos
  const produtos = (productsData.products || []).map(p => ({
    title: p.name,
    image: p.image,
    link: `/produtos/${p.slug || p.id}`
  }));

  // receitas (vem agrupadas por categoria dentro de um objeto)
  const recs = Object.values(receitas || {})
    .flat()
    .map(r => ({
      title: r.titulo,
      image: r.imagem,
      link: `/receitas/${r.slug}`
    }));

  // viagens – usando a estrutura correta que você me mostrou
  const viagens = Object.values(viagensData || {})
    .flat()
    .map(v => ({
      title: v.title,
      image: v.image,
      link: `/viagens/${v.slug}`
    }));

  // combina tudo
  return [...produtos, ...recs, ...viagens];

}, []);

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <Wrapper>
        <Hero>
          <HeroText>
            <h1>Como está a sua saúde hoje?</h1>
            <p>Conteúdo confiável sobre corpo, mente e hábitos para uma vida com mais energia e bem-estar.</p>
            <PrimaryCta onClick={() => navigate("/blog")}>Explorar o Blog</PrimaryCta>
          </HeroText>
          <HeroImg src="https://images.pexels.com/photos/28061/pexels-photo.jpg" alt="Saúde e bem-estar" />
        </Hero>

        <SectionTitle>Categorias</SectionTitle>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          style={{ paddingBottom: "1.25rem", marginBottom: "1.5rem" }}
        >
          {categories.map(c => (
            <SwiperSlide key={c.id}>
              <CatCard to={`/blog/${c.id}`}>
                <CatThumb style={{ backgroundImage: `url(${c.image})` }} />
                <CatBody>
                  <h4>{c.name}</h4>
                  <p>Conteúdos sobre {c.name.toLowerCase()} para seu bem-estar.</p>
                </CatBody>
              </CatCard>
            </SwiperSlide>
          ))}
        </Swiper>

        <TwoColumnRow>
          <Column flex="2">
            <SectionTitle>Artigos Recentes</SectionTitle>
            <Grid>
              {recent.map((post) => (
                <ArticleCard
                  key={post.slug || post.id}
                  item={post}
                  to={`/blog/${post.category || post.categoria || "geral"}/${post.slug || post.friendlySlug || post.id}`}
                />
              ))}
            </Grid>

            {/* final: continue exploring + tags + newsletter */}
            <ContinueSection>
            <ContinueExploring
              posts={postsArray}
              receitas={Object.values(receitas || {}).flat()}
              products={productsData.products}
              trips={viagensData}
            />              
                <TagsNewsletterRow>
                <TagsCloud articles={postsArray} />
                <NewsletterCTA />
              </TagsNewsletterRow>
            </ContinueSection>
          </Column>

          <Column flex="1">
            <SideBox>
              <h3>Populares</h3>
              <PopularList>
                {popular.length ? popular.map(p => (
                  <SmallPopular key={p.slug || p.id} to={`/blog/${p.category || p.categoria || "geral"}/${p.slug || p.friendlySlug || p.id}`}>
                    <img src={p.image || p.imagem} alt={p.title || p.titulo} />
                    <div>
                      <strong>{p.title || p.titulo}</strong>
                      <span>{(p.excerpt || p.descricao || p.description || "").slice(0, 90)}...</span>
                    </div>
                  </SmallPopular>
                )) : <Empty>Sem artigos em destaque</Empty>}
              </PopularList>

              <Divider />

              <h3>Calculadoras Rápidas</h3>
              <CalculadoraPreview />

              <Divider />

              <h3>Receitas recomendadas</h3>
              <MiniRecipes>
                {Object.values(receitas || {}).flat().slice(0, 3).map(r => (
                  <MiniRecipe key={r.slug} to={`/receitas/${r.slug}`}>
                    <img src={r.imagem || r.image} alt={r.titulo || r.title} />
                    <div>
                      <strong>{r.titulo}</strong>
                      <small>{r.tempo || ""}</small>
                    </div>
                  </MiniRecipe>
                ))}
              </MiniRecipes>
            </SideBox>
          </Column>
        </TwoColumnRow>
          <CarouselFinal items={carouselItems} />

      </Wrapper>

      <Footer />
    </>
  );
}

/* ---------------- Styled ---------------- */

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2.5rem;
  padding: 1.6rem;
  background: ${({ theme }) => theme.gradients.soft};
  border-radius: ${({ theme }) => theme.radius.lg};
  
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroText = styled.div`
  h1 { 
    font-size: 2.4rem; 
    margin-bottom: 0.6rem; 
    color: ${({ theme }) => theme.colors.primaryDark}; 
    font-family: ${({ theme }) => theme.fonts.heading}; 
  }
  p { 
    font-size: 1.05rem; 
    color: ${({ theme }) => theme.colors.text}; 
    margin-bottom: 1rem; 
  }
`;

const PrimaryCta = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.7rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 700;
  cursor: pointer;
  border: none;
  box-shadow: ${({ theme }) => theme.shadow.xs};
  
  &:hover { 
    opacity: 0.95; 
    transform: translateY(-2px); 
  }
`;

const HeroImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  
  @media (max-width: 980px) { 
    margin-top: 1rem; 
    height: 220px; 
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 1.75rem 0 1rem;
  text-align: center;
`;

const CatCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.9rem;
  text-decoration: none;
  color: inherit;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  cursor: pointer;
  height: 100%;
`;

const CatThumb = styled.div`
  width: 100%;
  height: 140px;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

const CatBody = styled.div`
  h4 { 
    margin: 0 0 0.25rem; 
    color: ${({ theme }) => theme.colors.primaryDark}; 
    font-size: 1.05rem; 
  }
  p { 
    margin: 0; 
    color: ${({ theme }) => theme.colors.text}; 
    font-size: 0.95rem; 
    opacity: 0.95; 
  }
`;

const TwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.25rem;
  margin-top: 1rem;

  @media (max-width: 980px) { 
    grid-template-columns: 1fr; 
  }
`;

const Column = styled.div`
  flex: ${(p) => p.flex || 1};
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 0.6rem;

  @media (max-width: 1100px) { 
    grid-template-columns: repeat(2, 1fr); 
  }
  @media (max-width: 720px) { 
    grid-template-columns: 1fr; 
  }
`;

const SideBox = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
`;

const PopularList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SmallPopular = styled(Link)`
  display: flex;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
  align-items: center;
  img { 
    width: 72px; 
    height: 60px; 
    object-fit: cover; 
    border-radius: 8px; 
    flex-shrink: 0; 
  }
  div { 
    display: flex; 
    flex-direction: column; 
  }
  strong { 
    font-size: 0.95rem; 
    color: ${({ theme }) => theme.colors.primaryDark}; 
  }
  span { 
    font-size: 0.85rem; 
    color: ${({ theme }) => theme.colors.text}; 
    opacity: 0.9; 
  }
`;

const MiniRecipes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.6rem;
`;

const MiniRecipe = styled(Link)`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  img { 
    width: 64px; 
    height: 56px; 
    object-fit: cover; 
    border-radius: 8px; 
  }
  strong { 
    font-size: 0.95rem; 
    color: ${({ theme }) => theme.colors.primaryDark}; 
  }
  small { 
    font-size: 0.8rem; 
    color: ${({ theme }) => theme.colors.text}; 
  }
`;

const Empty = styled.div`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  font-size: 0.95rem;
  padding: 0.6rem 0;
`;

const Divider = styled.hr`
  margin: 1rem 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContinueSection = styled.section`
  margin-top: 2.5rem;
`;

const TagsNewsletterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1rem;
  margin-top: 1.25rem;

  @media (max-width: 980px) { 
    grid-template-columns: 1fr; 
  }
`;

const Wrapper = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth || "1200px"};
  margin: 2.5rem auto;
  padding: 0 1rem;
`;

