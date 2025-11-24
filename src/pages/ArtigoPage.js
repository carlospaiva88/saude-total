// src/pages/ArticlePage.jsx
import React, { useMemo, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Breadcrumbs from "../components/BreadCrumbs";
import Comentarios from "../components/Comentarios";
import AudioReader from "../components/AudioReader";

import ArticleTOC from "../components/ArticleToc";
import ShareSticky from "../components//ShareSticky";
import ProductInline from "../components//ProductInline";
import NewsletterInline from "../components/NewsLetterInline";
import AuthorBox from "../components/AuthorBox";
import ContentRenderer from "../components/ContentRenderer";

import articlesData from "../data/articles"; // pode ser array ou objeto
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ---------- Helpers ---------- */
const toArray = (d) => (Array.isArray(d) ? d : Object.values(d || {}));
const safe = (v, fallback = "") => (v || v === 0 ? v : fallback);
const safeImage = (a) => a?.image || a?.imagem || a?.thumbnail || a?.thumb || "/placeholder-16x9.png";
const parseDate = (d) => {
  if (!d) return null;
  const t = Date.parse(d);
  if (isNaN(t)) return null;
  return new Date(t);
};
const formatShortDate = (d) => {
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(d);
  } catch {
    return String(d).split("T")[0];
  }
};
const buildArticlePath = (a) => {
  const cat = encodeURIComponent(a.category || a.categoria || "geral");
  const sub = encodeURIComponent(a.subCategory || a.subcategoria || a.sub || "");
  const slug = encodeURIComponent(a.slug || a.friendlySlug || a.id || "");
  return `/blog/${cat}/${sub}/${slug}`.replace(/\/+$/,'');
};

/* ---------- Component ---------- */
export default function ArticlePage() {
  const { categoria, subcategoria, slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const carouselRef = useRef(null);

  const articles = useMemo(() => toArray(articlesData), [articlesData]);

  const article = useMemo(() => {
    // 1) hierarchical route: /blog/:categoria/:subcategoria/:slug
    if (categoria && subcategoria && slug) {
      const found = articles.find((a) => {
        const cat = (a.category || a.categoria || "").toString();
        const sub = (a.subCategory || a.subcategoria || a.sub || "").toString();
        const s = (a.slug || a.friendlySlug || a.id || "").toString();
        return cat === categoria && sub === subcategoria && s === slug;
      });
      if (found) return found;
    }

    // 2) slug only route
    if (slug && !(categoria && subcategoria)) {
      const found = articles.find((a) => {
        const s = (a.slug || a.friendlySlug || a.id || "").toString();
        return s === slug;
      });
      if (found) return found;
    }

    // 3) try using categoria as slug (legacy)
    const trySlug = slug || categoria;
    if (trySlug) {
      const found = articles.find((a) => {
        const s = (a.slug || a.friendlySlug || a.id || "").toString();
        return s === trySlug;
      });
      if (found) return found;
    }

    return null;
  }, [articles, categoria, subcategoria, slug]);

  // prepare related posts (same subcategory first, then same category)
  const related = useMemo(() => {
    if (!article) return [];
    const seen = new Set([article.slug || article.id]);
    const sameSub = articles.filter(a => {
      const sub = a.subCategory || a.subcategoria || a.sub || "";
      const matches = sub && (article.subCategory === sub || article.subcategoria === sub || article.sub === sub);
      return matches && !seen.has(a.slug || a.id);
    });
    const sameCat = articles.filter(a => {
      const cat = a.category || a.categoria || "";
      const matches = cat && (article.category === cat || article.categoria === cat);
      return matches && !seen.has(a.slug || a.id);
    });
    const combined = [...sameSub, ...sameCat].filter(a => a.slug !== article.slug);
    return combined.slice(0, 8);
  }, [articles, article]);

  // redirect to canonical hierarchical path if needed
  useEffect(() => {
    if (!article) return;
    const cat = article.category || article.categoria || null;
    const sub = article.subCategory || article.subcategoria || article.sub || null;
    const s = article.slug || article.friendlySlug || article.id || null;
    const isHierarchical = categoria && subcategoria && slug;
    if (!isHierarchical && cat && sub && s) {
      navigate(`/blog/${encodeURIComponent(cat)}/${encodeURIComponent(sub)}/${encodeURIComponent(s)}`, { replace: true });
    }
  }, [article, categoria, subcategoria, slug, navigate]);

  if (!article) {
    return (
      <>
        <Navbar />
        <Breadcrumbs />
        <Container>
          <Title>Artigo não encontrado</Title>
          <p>Desculpe — não foi possível localizar o artigo solicitado.</p>
          <p><Link to="/blog">Voltar ao Blog</Link></p>
        </Container>
        <Footer />
      </>
    );
  }

  const publishedDate = parseDate(article.date || article.datePublished || article.publishedAt);
  const readingTime = safe(article.readingTime || article.tempo || article.read, "");

  const scroll = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth || 320;
    const target = dir === "left" ? Math.max(0, el.scrollLeft - amount) : el.scrollLeft + amount;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const hasTOC = !!(contentRef.current && contentRef.current.querySelectorAll && contentRef.current.querySelectorAll("h2, h3").length > 0);
  const hasSidebar = !!(article.product || hasTOC || related.length > 0);

  return (
    <>
      <Helmet>
        <title>{safe(article.title || article.titulo, "Artigo")} | Viva no Flow</title>
        <meta name="description" content={safe(article.description || article.excerpt || "").slice(0, 160)} />
        <meta property="og:title" content={safe(article.title || article.titulo)} />
        <meta property="og:description" content={safe(article.description || article.excerpt)} />
        <meta property="og:image" content={safeImage(article)} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
      </Helmet>

      <Navbar />
      <Breadcrumbs />

      <MainWrapper hasSidebar={hasSidebar}>
        <ArticleColumn>
          <Title>{safe(article.title || article.titulo)}</Title>

          <MetaInfo>
            {publishedDate ? <time dateTime={publishedDate.toISOString()}>{formatShortDate(publishedDate)}</time> : null}
            {publishedDate && readingTime ? <> • </> : null}
            {readingTime ? <span>{readingTime}</span> : null}
          </MetaInfo>

          <HeroImage src={safeImage(article)} alt={safe(article.title || article.titulo, "Imagem do artigo")} loading="lazy" />

          {article.content && <AudioReader texto={String(article.content).replace(/<[^>]+>/g, "")} />}

          <ArticleContent ref={contentRef} dangerouslySetInnerHTML={{ __html: article.content || article.html || "" }} />

          {/* Newsletter integrada no fluxo */}
          <NewsletterInline />

          {/* Produto recomendado (editorial) */}
          <ProductInline product={article.product} />


          {/* comentários */}
          <Comentarios slug={article.slug || article.id || slug} />

          {/* posts relacionados (aparece abaixo) */}
          {related.length > 0 && (
            <RecentPostsSection>
              <h2>Últimos posts relacionados</h2>

              <CarouselWrapper>
                <ArrowLeft onClick={() => scroll("left")} aria-label="Scroll left">
                  <FaChevronLeft size={16} />
                </ArrowLeft>

                <RecentPostsCarousel ref={carouselRef} tabIndex={0} aria-label="Carrossel de posts relacionados">
                  {related.map(r => (
                    <PostCard key={r.slug || r.id} to={buildArticlePath(r)}>
                      <img src={safeImage(r)} alt={safe(r.title || r.titulo)} loading="lazy" />
                      <PostTitle>{safe(r.title || r.titulo)}</PostTitle>
                    </PostCard>
                  ))}
                </RecentPostsCarousel>

                <ArrowRight onClick={() => scroll("right")} aria-label="Scroll right">
                  <FaChevronRight size={16} />
                </ArrowRight>
              </CarouselWrapper>
            </RecentPostsSection>
          )}

          <BackRow>
            {article.subCategory || article.subcategoria ? (
              <BackLink to={`/blog/${encodeURIComponent(article.category || article.categoria || "geral")}/${encodeURIComponent(article.subCategory || article.subcategoria || "")}`}>
                ← Voltar para {String(article.subCategory || article.subcategoria).replace(/[-_]/g, " ")}
              </BackLink>
            ) : article.category || article.categoria ? (
              <BackLink to={`/blog/${encodeURIComponent(article.category || article.categoria)}`}>← Voltar para {String(article.category || article.categoria)}</BackLink>
            ) : (
              <BackLink to="/blog">← Voltar ao Blog</BackLink>
            )}
          </BackRow>
        </ArticleColumn>

        {/* Sidebar condicional — só renderiza se existir conteúdo relevante */}
        {hasSidebar && (
          <SideColumn>
            <StickySidebar>
              {/* TOC (compacto e rolável) */}
              <ArticleTOC contentRef={contentRef} />
              {/* share lateral discreto */}
              <ShareSticky title={article.title} />
              {/* product sticky is handled inside ProductInline (small sticky) */}
            </StickySidebar>
          </SideColumn>
        )}
      </MainWrapper>

      <Footer />
    </>
  );
}

/* ---------- Styled ---------- */

/* container principal */
const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  line-height: 1.75;
`;

/* titulo */
const Title = styled.h1`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.primaryDark || "#264653"};
  margin-bottom: 0.4rem;
  text-align: left;
  word-break: break-word;
`;

/* meta */
const MetaInfo = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text || "#6c757d"};
  margin-bottom: 1rem;
`;

/* Main wrapper condicional */
const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 2.25rem auto;
  display: grid;
  grid-template-columns: ${({ hasSidebar }) => (hasSidebar ? "1fr 320px" : "1fr")};
  gap: 1.25rem;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

/* colunas — min-width:0 é crucial para evitar overflow em grids */
const ArticleColumn = styled.div`
  min-width: 0;
`;
const SideColumn = styled.aside`
  min-width: 0;
  display:flex;
  justify-content:flex-end;
`;

/* sticky wrapper para sidebar — TOC top-aligned */
const StickySidebar = styled.div`
  /* permanece sticky mas agora alinha o índice ao topo da coluna */
  position: sticky;
  top: 96px;                 /* fica logo abaixo do navbar (ajuste se necessário) */
  align-self: start;
  max-height: calc(100vh - 110px); /* deixa um pouco de folga no topo/rodapé */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-left: 0.5rem;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > * { margin: 0; } /* evita espaçamento duplo */

  @media (max-width: 980px) {
    position: static;
    max-height: none;
    overflow: visible;
    padding-left: 0;
  }
`;


/* hero image */
const HeroImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md || "16px"};
  margin: 1rem 0 1.25rem;
  transition: transform ${({ theme }) => theme.transitions.fast || "0.2s"};
  display:block;

  &:hover { transform: scale(1.02); }

  @media (max-width: 720px) {
    height: 240px;
  }
`;

/* conteúdo do artigo */
const ArticleContent = styled.section`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text || "#40514e"};
  margin-top: 0.5rem;
  line-height: 1.75;

  h2 { font-size: 1.6rem; margin: 1.25rem 0 0.75rem; color: ${({ theme }) => theme.colors.primaryDark}; }
  h3 { font-size: 1.2rem; margin: 1rem 0; color: ${({ theme }) => theme.colors.primary}; }
  p { margin: 0.75rem 0; }
  ul, ol { margin: 1rem 0 1.5rem 1.25rem; }

  img, iframe, video, table { max-width: 100%; height: auto !important; display: block; }
  code, pre { white-space: pre-wrap; word-break: break-word; }
`;

/* product section (if used standalone) */
const ProductSection = styled.section`
  margin-top: 2.25rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

/* related posts */
const RecentPostsSection = styled.section`
  margin-top: 2.25rem;
  h2 { text-align: center; color: ${({ theme }) => theme.colors.primaryDark}; margin-bottom: 1rem; }
`;
const CarouselWrapper = styled.div`
  position: relative;
  display:flex;
  align-items:center;
  gap: 0.5rem;
`;
const RecentPostsCarousel = styled.div`
  display:flex;
  gap: 1rem;
  overflow-x:auto;
  padding: 0.5rem 0.25rem;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  min-width: 0;

  &::-webkit-scrollbar { height: 8px; }
  &::-webkit-scrollbar-thumb { background: ${({ theme }) => theme.colors.primary || "#43aa8b"}; border-radius: 999px; }
`;
const PostCard = styled(Link)`
  flex: 0 0 220px;
  scroll-snap-align: start;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  text-decoration:none;
  color:inherit;
  box-shadow: ${({ theme }) => theme.shadow.xs};
  transition: transform ${({ theme }) => theme.transitions.fast};
  img { width:100%; height:120px; object-fit:cover; display:block; }
  &:hover { transform: translateY(-6px); box-shadow: ${({ theme }) => theme.shadow.md}; }
`;
const PostTitle = styled.div`
  padding: 0.75rem;
  font-size: 0.95rem;
  min-height: 3.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* arrows */
const ArrowLeft = styled.button`
  background: ${({ theme }) => theme.colors.primary || "#2a6f61"};
  color: white;
  border: none;
  padding: 0.45rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 5;
  @media (max-width: 700px) { display:none; }
`;
const ArrowRight = styled(ArrowLeft)``;

/* back link */
const BackRow = styled.div` margin-top: 1.8rem; display:flex; justify-content:center; `;
const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary || "#2a6f61"};
  text-decoration: none;
  font-weight: 600;
  &:hover { color: ${({ theme }) => theme.colors.primaryDark || "#1f6b59"}; }
`;

/* quick safety: ensure body/html box-sizing & hide x overflow if anything slips */
if (typeof document !== "undefined") {
  document.documentElement.style.boxSizing = document.documentElement.style.boxSizing || "border-box";
  document.body.style.boxSizing = document.body.style.boxSizing || "border-box";
  // not forcing overflow hidden globally — left commented. Uncomment if you still see horizontal scroll
  // document.documentElement.style.overflowX = "hidden";
  // document.body.style.overflowX = "hidden";
}
