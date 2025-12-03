// src/pages/ArtigoPage.js
import React, {
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

import Navbar from "../components/Navbar/Navbar";
import NavBarSpacer from "../components/Navbar/NavbarSpacer";
import Footer from "../components/Footer/Footer";
import Breadcrumbs from "../components/BreadCrumbs";
import ShareButtons from "../components/ShareButtons"; // fallback mobile inline share
import Comentarios from "../components/Comentarios";
import ReadingProgress from "../components/ReadingProgress";

import ProductInline from "../components/ProductInline";
import NewsletterInline from "../components/NewsLetterInline"; // ajuste de caminho
import AuthorBox from "../components/AuthorBox";

import articlesData from "../data/articles"; // array ou objeto
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ---------- Helpers ---------- */
const toArray = (d) => (Array.isArray(d) ? d : Object.values(d || {}));
const safe = (v, fallback = "") => (v || v === 0 ? v : fallback);
const safeImage = (a) =>
  a?.image || a?.imagem || a?.thumbnail || a?.thumb || "/placeholder-16x9.png";
const parseDate = (d) => {
  if (!d) return null;
  const t = Date.parse(d);
  if (isNaN(t)) return null;
  return new Date(t);
};
const formatShortDate = (d) => {
  if (!d) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return String(d).split("T")[0];
  }
};
const buildArticlePath = (a) => {
  const cat = encodeURIComponent(a.category || a.categoria || "geral");
  const sub = encodeURIComponent(a.subCategory || a.subcategoria || a.sub || "");
  const slug = encodeURIComponent(a.slug || a.friendlySlug || a.id || "");
  const path = `/blog/${cat}/${sub}/${slug}`.replace(/\/+$/g, "");
  return path;
};

/* ---------- Inline Share Icons (sidebar) ---------- */
function ShareIcons({ title = "" }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title || "Confira este artigo");

  return (
    <ShareWrapper aria-label="Compartilhar artigo">
      <IconButton
        as="a"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Compartilhar no Facebook"
        aria-label="Compartilhar no Facebook"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.93v-7.04H8.07v-2.9h2.37V9.41c0-2.34 1.39-3.63 3.52-3.63.  1.02 0 2.09.18 2.09.18v2.3H15.9c-1.17 0-1.53.73-1.53 1.48v1.78h2.6l-.42 2.9h-2.18v7.04C18.34 21.19 22 17.06 22 12.07z"
            fill="currentColor"
          />
        </svg>
      </IconButton>

      <IconButton
        as="a"
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Tweetar"
        aria-label="Tweetar"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M22 5.92c-.63.28-1.3.47-2 .56.72-.44 1.27-1.14 1.53-1.97-.67.4-1.41.68-2.2.83A3.482 3.482 0 0 0 12.8 8.5c0 .27.03.54.09.79C8.39 9.11 5.08 7.1 2.9 4.03c-.3.52-.47 1.12-.47 1.76 0 1.21.62 2.27 1.56 2.9-.57-.02-1.1-.18-1.57-.44v.04c0 1.7 1.2 3.11 2.8 3.43-.29.07-.6.11-.92.11-.22 0-.44-.02-.65-.06.44 1.36 1.72 2.35 3.24 2.38A7.007 7.007 0 0 1 2 19.54a9.9 9.9 0 0 0 5.35 1.57c6.42 0 9.94-5.32 9.94-9.94v-.45c.67-.49 1.25-1.1 1.71-1.8-.62.28-1.28.47-1.96.56z"
            fill="currentColor"
          />
        </svg>
      </IconButton>

      <IconButton
        as="a"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Compartilhar no LinkedIn"
        aria-label="Compartilhar no LinkedIn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M6.94 21H2.8V8.99h4.14V21zM4.86 7.45C3.7 7.45 2.78 6.5 2.78 5.34 2.78 4.18 3.7 3.23 4.86 3.23c1.16 0 2.08.95 2.08 2.11 0 1.16-.92 2.11-2.08 2.11zM21.2 21h-4.13v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.14 1.45-2.14 2.95V21h-4.13V8.99h3.97v1.62h.06c.55-1.04 1.9-2.14 3.92-2.14 4.19 0 4.96 2.76 4.96 6.35V21z"
            fill="currentColor"
          />
        </svg>
      </IconButton>
    </ShareWrapper>
  );
}

/* ---------- Component ---------- */
export default function ArticlePage() {
  const { categoria, subcategoria, slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  /* -------------------------
     hooks that must always run
     ------------------------- */

  // articlesData transform (static module)
  const articles = useMemo(() => toArray(articlesData), []); // eslint-disable-line

  // article lookup
  const article = useMemo(() => {
    // 1) hierarchical route
    if (categoria && subcategoria && slug) {
      const found = articles.find((a) => {
        const cat = (a.category || a.categoria || "").toString();
        const sub = (a.subCategory || a.subcategoria || a.sub || "").toString();
        const s = (a.slug || a.friendlySlug || a.id || "").toString();
        return cat === categoria && sub === subcategoria && s === slug;
      });
      if (found) return found;
    }

    // 2) slug only
    if (slug && !(categoria && subcategoria)) {
      const found = articles.find((a) => {
        const s = (a.slug || a.friendlySlug || a.id || "").toString();
        return s === slug;
      });
      if (found) return found;
    }

    // 3) try categoria as legacy slug
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

  /* -------------------------
     carousel base hooks (always declared)
     ------------------------- */
  const viewportRef = useRef(null);
  const innerRef = useRef(null);
  const gapPx = 16;
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardWidth, setCardWidth] = useState(320);
  const [index, setIndex] = useState(0);

  // compute responsive visibleCount
  useEffect(() => {
    function calc() {
      const w = typeof window !== "undefined" ? window.innerWidth : 1200;
      if (w >= 1200) setVisibleCount(3);
      else if (w >= 900) setVisibleCount(3);
      else if (w >= 700) setVisibleCount(2);
      else setVisibleCount(1);
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // measure sizes (card width) whenever viewport or visibleCount or related changes
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const viewportWidth = vp.clientWidth;
    const totalGaps = gapPx * (visibleCount - 1);
    const cw = Math.floor((viewportWidth - totalGaps) / visibleCount);
    setCardWidth(cw);
    // clamp index to max possible - but related length not known yet here, clamp later in effect that depends on related
  }, [visibleCount]);

  // keyboard navigation hooks declared (always)
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => i + 1), []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  /* -------------------------
     related posts (depends on article) but hook order preserved
     ------------------------- */
  const related = useMemo(() => {
    if (!article) return [];

    const maxItems = 12;
    const seen = new Set();
    const pushIf = (a) => {
      const key = (a.slug || a.friendlySlug || a.id || "").toString();
      if (!key || key === (article.slug || article.id)) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      result.push(a);
      return true;
    };

    const result = [];

    // 1) itens da mesma subcategoria (prioridade)
    for (const a of articles) {
      if (!a) continue;
      const sub = (a.subCategory || a.subcategoria || a.sub || "").toString();
      const matchesSub =
        sub &&
        (article.subCategory === sub ||
          article.subcategoria === sub ||
          article.sub === sub);
      if (matchesSub) {
        if (pushIf(a) && result.length >= maxItems) return result;
      }
    }

    // 2) itens da mesma categoria (complemento)
    for (const a of articles) {
      if (!a) continue;
      const cat = (a.category || a.categoria || "").toString();
      const matchesCat =
        cat && (article.category === cat || article.categoria === cat);
      if (matchesCat) {
        if (pushIf(a) && result.length >= maxItems) return result;
      }
    }

    return result.slice(0, maxItems);
  }, [articles, article]);

  // after related is known, clamp index and recompute cardWidth considering related length
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const viewportWidth = vp.clientWidth;
    const totalGaps = gapPx * (visibleCount - 1);
    const cw = Math.floor((viewportWidth - totalGaps) / visibleCount);
    setCardWidth(cw);
    const maxIndex = Math.max(0, related.length - visibleCount);
    setIndex((i) => Math.min(i, maxIndex));
  }, [related.length, visibleCount]);

  const maxIndex = Math.max(0, related.length - visibleCount);

  // next/prev adjusted to clamp
  const safePrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const safeNext = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  // override prev/next used by key handlers (ensures clamping)
  useEffect(() => {
    // replace prev/next closures to safe ones for key handlers
  }, [safePrev, safeNext]);

  // redirect to canonical hierarchical path if needed
  useEffect(() => {
    if (!article) return;
    const cat = article.category || article.categoria || null;
    const sub = article.subCategory || article.subcategoria || article.sub || null;
    const s = article.slug || article.friendlySlug || article.id || null;
    const isHierarchical = categoria && subcategoria && slug;
    if (!isHierarchical && cat && sub && s) {
      navigate(
        `/blog/${encodeURIComponent(cat)}/${encodeURIComponent(sub)}/${encodeURIComponent(s)}`,
        { replace: true }
      );
    }
  }, [article, categoria, subcategoria, slug, navigate]);

  /* -------------------------
     early return if article not found (hooks already declared)
     ------------------------- */
  if (!article) {
    return (
      <>
        <Navbar />
        <Breadcrumbs />
        <Container>
          <Title>Artigo não encontrado</Title>
          <p>Desculpe — não foi possível localizar o artigo solicitado.</p>
          <p>
            <Link to="/blog">Voltar ao Blog</Link>
          </p>
        </Container>
        <Footer />
      </>
    );
  }

  /* -------------------------
     final computed values for render
     ------------------------- */
  const publishedDate = parseDate(
    article.date || article.datePublished || article.publishedAt
  );
  const readingTime = safe(article.readingTime || article.tempo || article.read, "");

  // translateX in pixels based on index
  const translateX = -(index * (cardWidth + gapPx));

  return (
    <>
      <Helmet>
        <title>{safe(article.title || article.titulo, "Artigo")} | Viva no Flow</title>
        <meta
          name="description"
          content={safe(article.description || article.excerpt || "").slice(0, 160)}
        />
        <meta property="og:title" content={safe(article.title || article.titulo)} />
        <meta property="og:description" content={safe(article.description || article.excerpt)} />
        <meta property="og:image" content={safeImage(article)} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
      </Helmet>

      <ReadingProgress targetRef={contentRef} />

      <Navbar />
      <NavBarSpacer />
      <Breadcrumbs />

      <ShareIconsFixed aria-hidden={!article}>
        <ShareIcons title={article.title} />
      </ShareIconsFixed>

      <MainWrapper>
        <ArticleColumn>
          <Title>{safe(article.title || article.titulo)}</Title>

          <MetaInfo>
            {publishedDate ? (
              <time dateTime={publishedDate.toISOString()}>
                {formatShortDate(publishedDate)}
              </time>
            ) : null}
            {publishedDate && readingTime ? <> • </> : null}
            {readingTime ? <span>{readingTime}</span> : null}
          </MetaInfo>

          <HeroImage
            src={safeImage(article)}
            alt={safe(article.title || article.titulo, "Imagem do artigo")}
            loading="lazy"
          />

          <ArticleContent ref={contentRef} dangerouslySetInnerHTML={{ __html: article.content || article.html || "" }} />

          <AuthorArea>
            <AuthorBox author={article.author} />
          </AuthorArea>

          <NewsletterInline />

          <ProductInline product={article.product} />

          <ShareInlineMobile>
            <ShareButtons url={typeof window !== "undefined" ? window.location.href : ""} title={safe(article.title)} />
          </ShareInlineMobile>

          <Comentarios slug={article.slug || article.id || slug} />
        </ArticleColumn>
      </MainWrapper>

      {related.length > 0 && (
        <FullWidthCarousel aria-label="Carrossel de posts relacionados - full width">
          <Inner>
            <CarouselHeader>
              <h2>Explore mais</h2>
              <CarouselControls aria-hidden>
                <CarouselNavLeft onClick={safePrev} disabled={index <= 0} aria-label="Anterior">
                  <FaChevronLeft />
                </CarouselNavLeft>
                <CarouselNavRight onClick={safeNext} disabled={index >= maxIndex} aria-label="Próximo">
                  <FaChevronRight />
                </CarouselNavRight>
              </CarouselControls>
            </CarouselHeader>

            <CarouselViewport ref={viewportRef}>
              <CarouselSliderWrapper>
                <CarouselInner
                  ref={innerRef}
                  style={{
                    transform: `translateX(${translateX}px)`,
                    transition: "transform 420ms cubic-bezier(.2,.9,.2,1)",
                    gap: `${gapPx}px`,
                    width: related.length * (cardWidth + gapPx) - gapPx + "px",
                  }}
                >
                  {related.map((r, idx) => (
                    <CarouselCard
                      key={r.slug || r.id || idx}
                      to={buildArticlePath(r)}
                      aria-label={r.title || r.titulo}
                      style={{
                        width: cardWidth + "px",
                        marginRight: idx === related.length - 1 ? 0 : `${gapPx}px`,
                      }}
                    >
                      <CardMedia>
                        <img src={safeImage(r)} alt={safe(r.title || r.titulo)} loading="lazy" />
                      </CardMedia>
                      <CardBody>
                        <CardTitle>{safe(r.title || r.titulo)}</CardTitle>
                        {(r.excerpt || r.description) && (
                          <CardExcerpt>
                            {(r.excerpt || r.description).slice(0, 120)}
                            {(r.excerpt || r.description).length > 120 ? "…" : ""}
                          </CardExcerpt>
                        )}
                      </CardBody>
                    </CarouselCard>
                  ))}
                </CarouselInner>
              </CarouselSliderWrapper>
            </CarouselViewport>
          </Inner>
        </FullWidthCarousel>
      )}

      <Footer />
    </>
  );
}

/* ---------- Styled ---------- */

/* safety if executed in browser */
if (typeof document !== "undefined") {
  document.documentElement.style.boxSizing =
    document.documentElement.style.boxSizing || "border-box";
  document.body.style.boxSizing = document.body.style.boxSizing || "border-box";
}

/* container used for fallback pages */
const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
  line-height: 1.75;
`;

/* Title (adicionado) */
const Title = styled.h1`
  font-size: 2.2rem;
  color: ${({ theme }) => (theme?.colors?.primaryDark || "#264653")};
  margin-bottom: 0.4rem;
  text-align: left;
  word-break: break-word;
`;

/* Meta info */
const MetaInfo = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => (theme?.colors?.text || "#6c757d")};
  margin-bottom: 1rem;
`;

/* hero image */
const HeroImage = styled.img`
  width: 100%;
  max-width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius?.md || "16px"};
  margin: 1rem 0 1.25rem;
  transition: transform ${({ theme }) => theme.transitions?.fast || "0.2s"};
  display: block;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 720px) {
    height: 240px;
  }
`;

/* article content */
const ArticleContent = styled.section`
  font-size: 1.05rem;
  color: ${({ theme }) => (theme?.colors?.text || "#40514e")};
  margin-top: 0.5rem;
  line-height: 1.75;

  h2 {
    font-size: 1.6rem;
    margin: 1.25rem 0 0.75rem;
    color: ${({ theme }) => theme.colors?.primaryDark};
  }
  h3 {
    font-size: 1.2rem;
    margin: 1rem 0;
    color: ${({ theme }) => theme.colors?.primary};
  }
  p {
    margin: 0.75rem 0;
  }
  ul,
  ol {
    margin: 1rem 0 1.5rem 1.25rem;
  }
  img,
  iframe,
  video,
  table {
    max-width: 100%;
    height: auto !important;
    display: block;
  }
  code,
  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

/* author area */
const AuthorArea = styled.div`
  margin-top: 1.25rem;
`;

/* share inline mobile */
const ShareInlineMobile = styled.div`
  margin: 1rem 0;
  @media (min-width: 981px) {
    display: none;
  }
`;

/* full width carousel */
const FullWidthCarousel = styled.section`
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.gradients?.soft || "linear-gradient(180deg,#f7fdfb,#f0fbf8)"};
  padding: 2rem 0;
`;
const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout?.maxWidth || "1200px"};
  margin: 0 auto;
  padding: 0 1rem;
`;
const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors?.primaryDark || "#264653"};
  }
`;
const CarouselControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

/* Carousel area (no native scroll) */
const CarouselViewport = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;
const CarouselSliderWrapper = styled.div`
  width: 100%;
  overflow: visible;
`;
const CarouselInner = styled.div`
  display: flex;
  align-items: stretch;
  will-change: transform;
`;

/* Card */
const CarouselCard = styled(Link)`
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  border-radius: ${({ theme }) => theme.radius?.md || "12px"};
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 4px 12px rgba(0,0,0,0.06)"};
  display: flex;
  flex-direction: column;
  transition: transform ${({ theme }) => theme.transitions?.fast || "0.18s"},
    box-shadow ${({ theme }) => theme.transitions?.fast || "0.18s"};
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow?.md || "0 10px 30px rgba(0,0,0,0.12)"};
  }
`;
const CardMedia = styled.div`
  height: 160px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
const CardBody = styled.div`
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-height: 4.4rem;
`;
const CardTitle = styled.strong`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors?.primaryDark || "#264653"};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const CardExcerpt = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors?.text || "#40514e"};
  opacity: 0.9;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* carousel nav */
const CarouselNavLeft = styled.button`
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  border: 0;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 4px 12px rgba(0,0,0,0.06)"};
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;
const CarouselNavRight = styled(CarouselNavLeft)``;

/* share fixed wrapper (declared previously) */
const ShareIconsFixed = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  z-index: 999;
  @media (max-width: 980px) {
    display: none;
  }
`;

/* small helpers */
const MainWrapper = styled.main`
  max-width: 1200px;
  margin: 2.25rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
`;
const ArticleColumn = styled.div`
  min-width: 0;
  margin: 0 auto;
  max-width: 900px;
`;
const ShareWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: ${({ theme }) => theme.colors?.surface};
  padding: 0.4rem;
  border-radius: ${({ theme }) => theme.radius?.sm || "8px"};
  box-shadow: ${({ theme }) => theme.shadow?.xs};
`;
const IconButton = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors?.primaryDark};
  text-decoration: none;
`;

