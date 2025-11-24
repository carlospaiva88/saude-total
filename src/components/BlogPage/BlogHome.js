import React, { useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
import viagensData from "../../data/viagens/index";
import productsData from "../../data/products";
import CarouselFinal from "../../components/BlogPage/CarouselFinal";
import MiniQuizSaude from "../../components/BlogPage/MiniQuizSaude";
import FraseDoDia from "./FraseDoDia";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { id: "fisica", name: "Física", image: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg" },
  { id: "mental", name: "Mental", image: "https://images.pexels.com/photos/4804320/pexels-photo-4804320.jpeg" },
  { id: "emocional", name: "Emocional", image: "https://images.pexels.com/photos/6765024/pexels-photo-6765024.jpeg" },
  { id: "espiritual", name: "Espiritual", image: "https://images.pexels.com/photos/999309/pexels-photo-999309.jpeg" },
];

function safeArray(input) {
  if (!input) return [];
  return Array.isArray(input) ? input : Object.values(input);
}

function safeDate(d) {
  const t = d || d === 0 ? d : null;
  const parsed = Date.parse(t);
  return isNaN(parsed) ? 0 : parsed;
}

function safeImage(item) {
  return item?.image || item?.imagem || item?.thumb || "/placeholder-16x9.png";
}

function buildPostLink(post) {
  const categoria = encodeURIComponent(post.category || post.categoria || "geral");
  const slug = encodeURIComponent(post.slug || post.friendlySlug || post.id || "");
  return `/blog/${categoria}/${slug}`;
}

export default function BlogHome() {
  const postsArray = useMemo(() => safeArray(articlesData), [articlesData]);

  const recent = useMemo(() => {
    return postsArray
      .slice()
      .sort((a, b) => safeDate(b.date || b.datePublished) - safeDate(a.date || a.datePublished))
      .slice(0, 9);
  }, [postsArray]);

  const popular = useMemo(() => {
    return postsArray.filter(p => p.featured || p.destaque || p.popular).slice(0, 6);
  }, [postsArray]);

  const carouselItems = useMemo(() => {
    const produtos = safeArray(productsData?.products).map(p => ({
      title: p.name,
      image: p.image || "/placeholder-16x9.png",
      link: `/produtos/${encodeURIComponent(p.slug || p.id)}`,
    }));

    const recs = safeArray(receitas)
      .flat()
      .map(r => ({ title: r.titulo, image: r.imagem || r.image || "/placeholder-16x9.png", link: `/receitas/${encodeURIComponent(r.slug)}` }));

    const viagens = safeArray(viagensData)
      .flat()
      .map(v => ({ title: v.title, image: v.image || "/placeholder-16x9.png", link: `/viagens/${encodeURIComponent(v.slug)}` }));

    return [...produtos, ...recs, ...viagens].slice(0, 18);
  }, []);

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <Wrapper>
        <Hero aria-labelledby="hero-title" role="region">
          <HeroText>
            <h1 id="hero-title">Como está a sua saúde hoje?</h1>
            <p>Conteúdo confiável sobre corpo, mente e hábitos para uma vida com mais energia e bem-estar.</p>
          </HeroText>

          {/* Use <img loading="lazy"> e alt fallback */}
          <HeroImg
            src="https://images.pexels.com/photos/3791134/pexels-photo-3791134.jpeg"
            alt="Pessoa praticando exercício ao ar livre — saúde e bem-estar"
            loading="lazy"
          />
        </Hero>

        <SectionTitle>Categorias</SectionTitle>
        <Swiper
          modules={[Navigation, Autoplay, A11y]}
          navigation
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={800}
          spaceBetween={20}
          slidesPerView={3}
          a11y={{ prevSlideMessage: 'Anterior', nextSlideMessage: 'Próximo' }}
          breakpoints={{
            320: { slidesPerView: 1.05 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          style={{ paddingBottom: "1.25rem", marginBottom: "1.5rem" }}
          aria-label="Carrossel de categorias"
        >
          {categories.map(c => (
            <SwiperSlide key={c.id}>
              <CatCard to={`/blog/${encodeURIComponent(c.id)}`} aria-label={`Categoria ${c.name}`}>
                <CatThumb style={{ backgroundImage: `url(${c.image})` }} role="img" aria-label={`${c.name} imagem`} />
                <CatBody>
                  <h4>{c.name}</h4>
                  <p>Conteúdos sobre {c.name.toLowerCase()} para seu bem-estar.</p>
                </CatBody>
              </CatCard>
            </SwiperSlide>
          ))}
        </Swiper>

        <TwoColumnRow>
          <Column flex="2" as="section" aria-labelledby="recent-title">
            <SectionTitle id="recent-title">Artigos Recentes</SectionTitle>
            <Grid>
              {recent.map((post) => (
                <ArticleCard
                  key={post.slug || post.id}
                  item={post}
                  to={buildPostLink(post)}
                />
              ))}
            </Grid>
          </Column>

          <Column flex="1" as="aside" aria-labelledby="side-title">
            <SideBox>
              <FraseDoDia />

              <h3 id="side-title">Populares</h3>
              <PopularList>
                {popular.length ? popular.map(p => (
                  <SmallPopular
                    key={p.slug || p.id}
                    to={buildPostLink(p)}
                    aria-label={`Abrir artigo ${p.title || p.titulo}`}
                  >
                    <img
                      src={safeImage(p)}
                      alt={p.title || p.titulo || "Artigo popular"}
                      loading="lazy"
                      width={72}
                      height={60}
                    />
                    <div>
                      <strong>{p.title || p.titulo}</strong>
                      <span>{(p.excerpt || p.descricao || p.description || "").slice(0, 90)}{(p.excerpt || p.descricao || p.description || "").length > 90 ? "…" : ""}</span>
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
                {safeArray(receitas).flat().slice(0, 3).map(r => (
                  <MiniRecipe key={r.slug} to={`/receitas/${encodeURIComponent(r.slug)}`}>
                    <img src={r.imagem || r.image || "/placeholder-1x1.png"} alt={r.titulo || r.title} loading="lazy" />
                    <div>
                      <strong>{r.titulo}</strong>
                      <small>{r.tempo || ""}</small>
                    </div>
                  </MiniRecipe>
                ))}
              </MiniRecipes>

              <Divider />

              <MiniQuizSaude />
            </SideBox>
          </Column>
        </TwoColumnRow>

        <CarouselFinal items={carouselItems} />

        <ContinueSection>
          <ContinueExploring
            posts={postsArray}
            receitas={safeArray(receitas).flat()}
            products={safeArray(productsData?.products)}
            trips={safeArray(viagensData)}
          />
          <TagsNewsletterRow>
            <TagsCloud articles={postsArray} />
            <NewsletterCTA />
          </TagsNewsletterRow>
        </ContinueSection>
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

const HeroImg = styled.img`
  width: 100%;
  max-height: 320px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  @media (max-width: 980px) {
    margin-top: 1rem;
    max-height: 220px;
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
  grid-auto-rows: 1fr;

  /* garante que cada filho preencha a célula */
  & > a, & > article, & > div {
    height: 100%;
  }

  @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 720px) { grid-template-columns: 1fr; }
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

