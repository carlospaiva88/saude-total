// src/pages/BlogHome.jsx
import React, { useMemo, useRef } from "react";
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
import viagensData from "../../data/viagens/index";
import productsData from "../../data/products";
import MiniQuizSaude from "../../components/BlogPage/MiniQuizSaude";
import FraseDoDia from "./FraseDoDia";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

/* ---------------- helpers ---------------- */

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
  return item?.image || item?.imagem || item?.thumb || item?.imagem || "/placeholder-16x9.png";
}

function buildPostLink(post) {
  const categoria = encodeURIComponent(post.category || post.categoria || "geral");
  const slug = encodeURIComponent(post.slug || post.friendlySlug || post.id || "");
  return `/blog/${categoria}/${slug}`;
}

/* ---------------- UnifiedCarousel (novo, premium) ----------------
   Recebe items com forma:
   { type: 'article' | 'receita' | 'product' | 'trip', title, image, link, excerpt?, badge? , meta? }
*/
function UnifiedCarousel({ items = [] }) {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  if (!items || items.length === 0) return null;

  const slidePrev = () => { if (swiperRef.current) swiperRef.current.slidePrev(); };
  const slideNext = () => { if (swiperRef.current) swiperRef.current.slideNext(); };

  return (
    <UnifiedWrapper aria-label="Carrossel de conteúdos recomendados">
      <UnifiedHeader>
        <h2>Em destaque</h2>
        <p>Conteúdos, receitas e produtos selecionados para você.</p>
      </UnifiedHeader>

      <Swiper
        modules={[Navigation, Autoplay, A11y]}
        // NÃO passar `navigation` para evitar setas default do Swiper
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        speed={600}
        spaceBetween={18}
        slidesPerView={3}
        onSwiper={(s) => (swiperRef.current = s)}
        breakpoints={{
          320: { slidesPerView: 1.05 },
          640: { slidesPerView: 1.35 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }}
        a11y={{ prevSlideMessage: "Anterior", nextSlideMessage: "Próximo" }}
        style={{ paddingBottom: 12, position: "relative" }}
      >
        {items.map((it, i) => (
          <SwiperSlide key={`${it.type}-${it.title}-${i}`}>
            <CardLink to={it.link} aria-label={`${it.type} - ${it.title}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Card>
                <Thumb role="img" aria-label={it.title} style={{ backgroundImage: `url(${safeImage(it)})` }} />
                <CardBody>
                  <Badge type={it.type}>{it.badge || (it.type === "article" ? "Artigo" : it.type === "receita" ? "Receita" : it.type === "product" ? "Produto" : "Viagem")}</Badge>
                  <CardTitle>{it.title}</CardTitle>
                  {it.excerpt ? <CardExcerpt>{it.excerpt}</CardExcerpt> : (it.meta ? <CardMeta>{it.meta}</CardMeta> : null)}
                  <CardFooter>
                    <ReadMore>Ver conteúdo →</ReadMore>
                    {it.type === "product" && it.price ? <Price>{it.price}</Price> : null}
                  </CardFooter>
                </CardBody>
              </Card>
            </CardLink>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* setas customizadas */}
      <NavButtonLeft onClick={slidePrev} aria-label="Anterior" />
      <NavButtonRight onClick={slideNext} aria-label="Próximo" />
    </UnifiedWrapper>
  );
}


/* ---------------- main page component ---------------- */

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

  // build unified carousel items with type metadata
  const carouselItems = useMemo(() => {
    const produtos = safeArray(productsData?.products).map(p => ({
      type: "product",
      title: p.name,
      image: p.image || "/placeholder-16x9.png",
      link: `/produtos/${encodeURIComponent(p.slug || p.id)}`,
      excerpt: p.summary || p.description || "",
      badge: "Produto",
      price: p.price ? `R$ ${p.price}` : null,
    }));

    const recs = (Array.isArray(receitas) ? receitas.flat() : [].concat(...Object.values(receitas || {})))
      .map(r => ({
        type: "receita",
        title: r.titulo || r.title || "Receita",
        image: r.imagem || r.image || "/placeholder-16x9.png",
        link: `/receitas/${encodeURIComponent(r.slug)}`,
        excerpt: (r.descricaoCurta || r.descricao || "").slice(0, 120),
        badge: r.categoria || "Receita",
        meta: r.tempo ? `${r.tempo}` : undefined,
      }));

    // <-- Aqui corrigido: garantimos que viagensData seja "achatado" caso seja objeto com arrays
    const viagensArr = safeArray(viagensData).flat();
    const viagens = viagensArr.map(v => ({
      type: "trip",
      title: v.title || v.nome || v.titulo,
      image: v.image || v.imagem || "/placeholder-16x9.png",
      link: `/viagens/${encodeURIComponent(v.slug || v.id || v.nome || "")}`,
      excerpt: (v.description || v.excerpt || "").slice(0, 110),
      badge: "Viagem",
    }));

    const artigos = safeArray(articlesData)
      .slice()
      .map(a => ({
        type: "article",
        title: a.title || a.titulo || "Artigo",
        image: safeImage(a),
        link: buildPostLink(a),
        excerpt: (a.excerpt || a.descricao || a.description || "").slice(0, 120),
        badge: a.category || a.categoria || "Artigo",
      }));

    const mixed = [
      ...artigos.slice(0, 8),
      ...recs.slice(0, 6),
      ...produtos.slice(0, 4),
      ...viagens.slice(0, 4)
    ];

    const seen = new Set();
    const dedup = mixed.filter(it => {
      const key = it.link || it.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return dedup.slice(0, 18);
  }, [articlesData, receitas, productsData, viagensData]);


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

          <HeroImg
            src="https://images.pexels.com/photos/3791134/pexels-photo-3791134.jpeg"
            alt="Pessoa praticando exercício ao ar livre — saúde e bem-estar"
            loading="lazy"
          />
        </Hero>

        <SectionTitle>Categorias</SectionTitle>
                <Swiper
          modules={[Navigation, Autoplay, A11y]}
          loop
          centeredSlides
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={700}
          spaceBetween={18}
          slidesPerView={"auto"}
          breakpoints={{
            320: { slidesPerView: 1.05 },
            640: { slidesPerView: 1.4 },
            900: { slidesPerView: 2.2 },
            1200: { slidesPerView: 3 }
          }}
          style={{ paddingBottom: "1.25rem", marginBottom: "1.5rem" }}
          aria-label="Carrossel de categorias"
        >
          {categories.map(c => (
            <SwiperSlide key={c.id} style={{ width: 320 }}>
              <CatCard to={`/blog/${encodeURIComponent(c.id)}`} aria-label={`Categoria ${c.name}`}>
                <CatThumb style={{ backgroundImage: `url(${c.image})` }} role="img" aria-label={`${c.name} imagem`} />
                <CatOverlay>
                  <h4>{c.name}</h4>
                  <p>Conteúdos sobre {c.name.toLowerCase()} para seu bem-estar.</p>
                </CatOverlay>
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

        {/* ----- NOVO CAROUSEL UNIFICADO (substitui CarouselFinal) ----- */}
        <UnifiedCarousel items={carouselItems} />

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

/* ---------------- Styled (mantive a maior parte do seu original + novos estilos pro unified carousel) ---------------- */

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

/* Category cards (mantidos) */
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

/* Layout columns (mantidos) */
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

  & > a, & > article, & > div { height: 100%; }

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
  div { display: flex; flex-direction: column; }
  strong { font-size: 0.95rem; color: ${({ theme }) => theme.colors.primaryDark}; }
  span { font-size: 0.85rem; color: ${({ theme }) => theme.colors.text}; opacity: 0.9; }
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
  img { width: 64px; height: 56px; object-fit: cover; border-radius: 8px; }
  strong { font-size: 0.95rem; color: ${({ theme }) => theme.colors.primaryDark}; }
  small { font-size: 0.8rem; color: ${({ theme }) => theme.colors.text}; }
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

  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

const Wrapper = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth || "1200px"};
  margin: 2.5rem auto;
  padding: 0 1rem;
`;

/* ---------------- Styles do UnifiedCarousel (cards) ---------------- */

const UnifiedWrapper = styled.section`
  margin: 2rem 0;
`;

const UnifiedHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom: 1rem;
  h2 { margin: 0; color: ${({ theme }) => theme.colors.primaryDark}; }
  p { margin: 0; color: ${({ theme }) => theme.colors.secondaryDark}; font-size: .95rem; }
`;

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 220px;
  transition: transform .18s ease, box-shadow .18s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

const Thumb = styled.div`
  width: 100%;
  height: 140px;
  background-size: cover;
  background-position: center;
`;

const CardBody = styled.div`
  padding: 0.9rem 0.9rem 1rem;
  display:flex;
  flex-direction:column;
  gap: 0.5rem;
`;

const Badge = styled.span`
  display:inline-block;
  font-size: 0.75rem;
  padding: .28rem .5rem;
  border-radius: 999px;
  background: ${({ theme, type }) =>
    type === "product" ? "#FFF3E0" :
    type === "receita" ? "#E8F6EF" :
    type === "trip" ? "#E8F0FF" :
    "#F4F4F4"};
  color: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: fit-content;
`;

const CardTitle = styled.h4`
  margin: 0;
  font-size: 1.02rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  line-height: 1.2;
  min-height: 2.2rem;
`;

const CardExcerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  opacity: .95;
  flex: 1 1 auto;
`;

const CardMeta = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.secondaryDark};
`;

const CardFooter = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: .6rem;
  margin-top: .25rem;
`;

const ReadMore = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight:600;
`;

const Price = styled.span`
  background: ${({ theme }) => theme.colors.surfaceAlt || "#f5f5f5"};
  padding: .25rem .5rem;
  border-radius: 6px;
  font-weight:700;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

/* ---------------- end file ---------------- */
/* ---------- Botões customizados do UnifiedCarousel ---------- */
const NavButtonBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 12;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: transform .14s ease, background .14s ease;

  &:hover {
    transform: translateY(-50%) scale(1.06);
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavButtonLeft = styled(NavButtonBase)`
  left: 6px;
  &::after { content: "‹"; }
`;

const NavButtonRight = styled(NavButtonBase)`
  right: 6px;
  &::after { content: "›"; }
`;
const CatOverlay = styled.div`
  margin-top: 0.6rem;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%);
  padding: .6rem;
  border-radius: 8px;
  h4 { margin:0; color: ${({ theme }) => theme.colors.primaryDark}; }
  p { margin:0; font-size:0.9rem; color: ${({ theme }) => theme.colors.secondaryDark}; opacity:0.95; }
`;

/* melhora visual do CatThumb: adiciona radius e subtle shadow */
const CatThumb = styled.div`
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
