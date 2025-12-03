// src/components/BlogPage/BlogHome.js
import React, { useMemo, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import articlesData from "../../data/articles/index";
import receitas from "../../data/receitas/index";
import TagsCloud from "../../components/BlogPage/TagsCloud";
import NewsletterCTA from "../../components/BlogPage/NewsletterCTA";
import viagensData from "../../data/viagens/index";
import productsData from "../../data/products/";
import MiniQuizSaude from "../../components/BlogPage/MiniQuizSaude";
import FraseDoDia from "../BlogPage/FraseDoDia";
import CategoryCarousel from "./CategoryCarousel";
import * as S from "./BlogHome.styles";

import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper";
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

/**
 * safeImage:
 * - tenta images[0]
 * - depois image/img/imagem/thumb
 */
function safeImage(item) {
  if (!item) return "/placeholder-16x9.png";

  const fromArray =
    Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : null;

  return (
    fromArray ||
    item.image ||
    item.img ||
    item.imagem ||
    item.thumb ||
    "/placeholder-16x9.png"
  );
}

function buildPostLink(post) {
  const categoria = encodeURIComponent(post.category || post.categoria || "geral");
  const slug = encodeURIComponent(post.slug || post.friendlySlug || post.id || "");
  return `/blog/${categoria}/${slug}`;
}

function buildTripLink(v) {
  const cat = v.category || v.categorySlug || v.region || v.tipo || v.type || "nacionais";
  const slug = v.slug || v.id || v.nome || v.title || "";
  return `/viagens/${encodeURIComponent(String(cat).toLowerCase())}/${encodeURIComponent(String(slug))}`;
}

/**
 * getAllProducts:
 * - aceita o formato atual { products, categories }
 * - ou um array direto de produtos (fallback)
 */
function getAllProducts(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.products)) return data.products;
  return safeArray(data.products);
}

/**
 * getProductPriceDisplay:
 * - normaliza preço para SEMPRE string (nada de objeto no JSX)
 * - aceita:
 *   - string: "R$ 199,90"
 *   - number: 199.9
 *   - objeto: { display, formatted, raw, amount, currency }
 */
function getProductPriceDisplay(p) {
  if (!p) return null;

  const v = p.price ?? p.priceText ?? p.priceFormatted;

  if (typeof v === "string" || typeof v === "number") {
    return String(v);
  }

  if (v && typeof v === "object") {
    if (v.display) return String(v.display);
    if (v.formatted) return String(v.formatted);
    if (v.raw) return String(v.raw);

    if (v.amount != null && !isNaN(Number(v.amount))) {
      const currency = v.currency || p.currency || "BRL";
      const locale = currency === "BRL" ? "pt-BR" : "pt-PT";
      try {
        return Number(v.amount).toLocaleString(locale, { style: "currency", currency });
      } catch {
        return String(v.amount);
      }
    }
  }

  return null;
}

/* ---------------- dedupe helpers ---------------- */

function normalizeString(str = "") {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function keyForPost(p = {}) {
  if (!p) return "";
  if (p.slug && String(p.slug).trim()) return normalizeString(String(p.slug));
  if (p.id && String(p.id).trim()) return normalizeString(String(p.id));
  if (p.friendlySlug && String(p.friendlySlug).trim()) return normalizeString(String(p.friendlySlug));
  if (p.link && String(p.link).trim()) return normalizeString(String(p.link));
  return normalizeString(p.title || p.titulo || p.nome || "");
}

function preferPost(existing, candidate) {
  const getBool = (x) => !!(x && (x.featured || x.destaque || x.popular));
  if (!existing) return candidate;
  const eFeatured = getBool(existing);
  const cFeatured = getBool(candidate);
  if (cFeatured && !eFeatured) return candidate;
  if (eFeatured && !cFeatured) return existing;

  const eDate = safeDate(existing.date || existing.datePublished);
  const cDate = safeDate(candidate.date || candidate.datePublished);
  if (cDate > eDate) return candidate;
  if (eDate > cDate) return existing;

  const eLen = (existing.excerpt || existing.descricao || existing.description || "").length;
  const cLen = (candidate.excerpt || candidate.descricao || candidate.description || "").length;
  if (cLen > eLen) return candidate;

  return existing;
}

function uniquePosts(posts = []) {
  const map = new Map();
  for (const p of posts || []) {
    const key = keyForPost(p);
    if (!key) {
      const fallback =
        normalizeString(JSON.stringify(p)).slice(0, 40) || Math.random().toString(36).slice(2, 8);
      if (!map.has(fallback)) map.set(fallback, p);
      continue;
    }
    if (!map.has(key)) {
      map.set(key, p);
    } else {
      const kept = preferPost(map.get(key), p);
      map.set(key, kept);
    }
  }
  return Array.from(map.values());
}

/* ---------------- shortenTitle (safe) ---------------- */
function shortenTitle(title = "", max = 36) {
  try {
    const raw = title == null ? "" : String(title);
    const parts = raw
      .split(/[:—\-–]/)
      .map((p) => String(p || "").trim())
      .filter(Boolean);
    let base = parts.length ? parts[0] : raw.trim();
    if (base.length <= max) return base;
    const words = base.split(/\s+/);
    let out = "";
    for (const w of words) {
      if ((out + " " + w).trim().length > max) break;
      out = (out + " " + w).trim();
    }
    return out + (out.length < base.length ? "…" : "");
  } catch (err) {
    const s = (title == null ? "" : String(title)).slice(0, max);
    return s + (s.length < String(title || "").length ? "…" : "");
  }
}

/* trunc helper */
function trunc(str = "", n = 120) {
  if (!str) return "";
  const s = String(str).trim();
  return s.length > n ? s.slice(0, n - 1).trim() + "…" : s;
}

/* ---------------- UnifiedCarousel (cards) ---------------- */
function UnifiedCarousel({ items = [] }) {
  const swiperRef = useRef(null);

  const effectiveItems = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const it of items || []) {
      const key = (it.link || it.title || JSON.stringify(it)).toString();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(it);
      }
    }
    return out;
  }, [items]);

  if (!effectiveItems || effectiveItems.length === 0) return null;

  const slidePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };
  const slideNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const loopedSlides = Math.max(Math.min(effectiveItems.length, 12), 1);

  return (
    <S.UnifiedWrapper aria-label="Carrossel de conteúdos recomendados">
      <S.UnifiedHeader>
        <div>
          <h2>Em destaque</h2>
          <p>Conteúdos, receitas e produtos selecionados para você.</p>
        </div>

        <S.Controls>
          <S.NavButton onClick={slidePrev} aria-label="Anterior">
            ‹
          </S.NavButton>
          <S.NavButton onClick={slideNext} aria-label="Próximo">
            ›
          </S.NavButton>
        </S.Controls>
      </S.UnifiedHeader>

      <S.SwiperActiveStyles>
        <Swiper
          modules={[Autoplay, A11y]}
          loop={effectiveItems.length > 1}
          loopedSlides={loopedSlides}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          speed={600}
          spaceBetween={18}
          slidesPerView={3}
          onSwiper={(s) => (swiperRef.current = s)}
          breakpoints={{
            320: { slidesPerView: 1.05 },
            640: { slidesPerView: 1.35 },
            900: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          a11y={{ prevSlideMessage: "Anterior", nextSlideMessage: "Próximo" }}
          style={{ paddingBottom: 12, position: "relative" }}
        >
          {effectiveItems.map((it, i) => (
            <SwiperSlide key={`${it.link || it.title}-${i}`} style={{ height: "100%" }}>
              <S.Slide>
                <S.CardLink
                  to={it.link}
                  aria-label={`${it.type} - ${it.title}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <S.Card>
                    <S.Thumb
                      role="img"
                      aria-label={it.title}
                      style={{ backgroundImage: `url(${safeImage(it)})` }}
                    />
                    <S.CardBody>
                      <S.Badge type={it.type}>
                        {it.badge ||
                          (it.type === "article"
                            ? "Artigo"
                            : it.type === "receita"
                            ? "Receita"
                            : it.type === "product"
                            ? "Produto"
                            : "Viagem")}
                      </S.Badge>
                      <S.CardTitle>{it.title}</S.CardTitle>

                      <S.CardExcerpt
                        dangerouslySetInnerHTML={{
                          __html:
                            it.excerpt && it.excerpt.length > 0
                              ? it.excerpt.length > 140
                                ? `${it.excerpt.slice(0, 137)}…`
                                : it.excerpt
                              : "&nbsp;",
                        }}
                        aria-hidden={!(it.excerpt && it.excerpt.length > 0)}
                      />

                      <S.CardFooter>
                        <S.ReadMore>Ver conteúdo →</S.ReadMore>
                        {it.type === "product" && it.price ? <S.Price>{it.price}</S.Price> : null}
                      </S.CardFooter>
                    </S.CardBody>
                  </S.Card>
                </S.CardLink>
              </S.Slide>
            </SwiperSlide>
          ))}
        </Swiper>
      </S.SwiperActiveStyles>
    </S.UnifiedWrapper>
  );
}

/* ---------------- LocalContinueExploring (4 col) ---------------- */
function LocalContinueExploring({ posts = [], receitas = [], products = [], trips = [] }) {
  const uniqPosts = useMemo(() => uniquePosts(posts).slice(0, 6), [posts]);
  const uniqRecipes = useMemo(() => safeArray(receitas).flat().slice(0, 6), [receitas]);
  const uniqProducts = useMemo(() => safeArray(products).slice(0, 6), [products]);
  const uniqTrips = useMemo(() => uniquePosts(trips).slice(0, 6), [trips]);

  return (
    <ContinueGrid>
      <Column>
        <h4>Artigos</h4>
        <List>
          {uniqPosts.map((p) => (
            <ListItem key={p.slug || p.id || p.title}>
              <a href={buildPostLink(p)}>
                <img src={safeImage(p)} alt={p.title} />
                <div>
                  <strong>{shortenTitle(p.title || p.titulo)}</strong>
                  <small>{trunc(p.excerpt || p.descricao || "", 90)}</small>
                </div>
              </a>
            </ListItem>
          ))}
        </List>
      </Column>

      <Column>
        <h4>Receitas</h4>
        <List>
          {uniqRecipes.map((r) => (
            <ListItem key={r.slug}>
              <a href={`/receitas/${encodeURIComponent(r.slug)}`}>
                <img src={r.imagem || r.image || "/placeholder-4x3.png"} alt={r.titulo} />
                <div>
                  <strong>{shortenTitle(r.titulo)}</strong>
                  <small>
                    {r.tempo ? r.tempo : ""}
                    {r.calorias ? ` • ${r.calorias} kcal` : ""}
                    <br />
                    {r.shortDescription}
                  </small>
                </div>
              </a>
            </ListItem>
          ))}
        </List>
      </Column>

      <Column>
      <h4>Produtos</h4>
      <List>
        {uniqProducts.map((p) => {
          const priceText = getProductPriceDisplay(p);

          return (
            <ListItem key={p.id || p.slug}>
              <a href={p.affiliateLink || p.link} target="_blank" rel="noreferrer">
                <img src={safeImage(p) || "/placeholder-4x3.png"} alt={p.name || p.title} />
                <div>
                  <strong>{shortenTitle(p.name || p.title || p.nome || "Produto")}</strong>
                  <small>
                    {priceText || p.brand || ""}
                    <br />
                    {p.shortDescription}
                  </small>
                </div>
              </a>
            </ListItem>
          );
        })}
      </List>
    </Column>


      <Column>
        <h4>Viagens</h4>
        <List>
          {uniqTrips.map((t) => (
            <ListItem key={t.slug || t.title}>
              <a href={t.slug ? buildTripLink(t) : "/viagens"}>
                <img src={safeImage(t) || "/placeholder-4x3.png"} alt={t.title} />
                <div>
                  <strong>{shortenTitle(t.title || t.titulo)}</strong>
                  <small>{trunc(t.shortDescription || t.excerpt || "", 90)}</small>
                </div>
              </a>
            </ListItem>
          ))}
        </List>
      </Column>
    </ContinueGrid>
  );
}

/* ---------------- main page component ---------------- */

export default function BlogHome() {
  const postsArray = useMemo(() => safeArray(articlesData), []);

  const recent = useMemo(() => {
    return postsArray
      .slice()
      .sort((a, b) => safeDate(b.date || b.datePublished) - safeDate(a.date || a.datePublished))
      .slice(0, 9);
  }, [postsArray]);

  const popular = useMemo(() => {
    const raw = postsArray.filter((p) => p.featured || p.destaque || p.popular);
    const seen = new Set();
    const dedup = [];
    for (const p of raw) {
      const key = (p.slug || p.id || p.title || p.titulo || "").toString();
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      dedup.push(p);
      if (dedup.length >= 6) break;
    }
    return dedup;
  }, [postsArray]);

  const carouselItems = useMemo(() => {
    const allProducts = getAllProducts(productsData);

    const produtos = allProducts.map((p) => ({
      type: "product",
      title: p.name || p.title || "Produto",
      image: safeImage(p),
      link: p.affiliateLink || p.link || `/produtos/${encodeURIComponent(p.slug || p.id || "")}`,
      excerpt: (p.shortDescription || p.excerpt || p.description || "").slice(0, 140),
      badge: p.category || "Produto",
      price: getProductPriceDisplay(p),
    }));

    const recs = safeArray(receitas)
      .flat()
      .map((r) => ({
        type: "receita",
        title: r.titulo || r.title || "Receita",
        image: r.imagem || r.image || "/placeholder-16x9.png",
        link: `/receitas/${encodeURIComponent(r.slug)}`,
        excerpt: (r.descricaoCurta || r.descricao || "").slice(0, 140),
        badge: r.categoria || "Receita",
        meta: r.tempo ? `${r.tempo}` : undefined,
      }));

    const viagensArr = Array.isArray(viagensData)
      ? viagensData.flat(Infinity).filter(Boolean)
      : Object.values(viagensData || {})
          .flat(Infinity)
          .filter(Boolean);

    const viagens = safeArray(viagensArr).map((v) => ({
      type: "trip",
      title: v.title || v.titulo || v.nome || "Viagem",
      image: safeImage(v),
      link: v.slug ? buildTripLink(v) : v.link || "/viagens",
      excerpt: (v.shortDescription || v.excerpt || v.description || "").slice(0, 140),
      badge: "Viagem",
    }));

    const artigos = safeArray(articlesData).slice().map((a) => ({
      type: "article",
      title: a.title || a.titulo || "Artigo",
      image: safeImage(a),
      link: buildPostLink(a),
      excerpt: (a.excerpt || a.descricao || a.description || a.shortDescription || "").slice(
        0,
        140
      ),
      badge: a.category || a.categoria || "Artigo",
    }));

    const mixed = [
      ...artigos.slice(0, 8),
      ...recs.slice(0, 6),
      ...produtos.slice(0, 4),
      ...viagens.slice(0, 8),
    ];

    const dedup = uniquePosts(mixed).slice(0, 18);
    return dedup;
  }, []);

  const dedupPosts = useMemo(() => uniquePosts(postsArray), [postsArray]);

  const receitasFlat = safeArray(receitas).flat();
  const productsFlat = getAllProducts(productsData);

  const viagensFlat = useMemo(() => {
    const arr = Array.isArray(viagensData)
      ? viagensData.flat(Infinity)
      : Object.values(viagensData || {}).flat(Infinity);
    return safeArray(arr).filter(Boolean);
  }, []);

  return (
    <>
      <Navbar />
      <NavbarSpacer />
      <S.Wrapper>
        <S.Hero aria-labelledby="hero-title" role="region">
          <S.HeroText>
            <h1 id="hero-title">Como está a sua saúde hoje?</h1>
            <p>Conteúdo confiável sobre corpo, mente e hábitos para uma vida com mais energia e bem-estar.</p>
          </S.HeroText>

          <S.HeroImg
            src="https://images.pexels.com/photos/3791134/pexels-photo-3791134.jpeg"
            alt="Pessoa praticando exercício ao ar livre — saúde e bem-estar"
            loading="lazy"
          />
        </S.Hero>

        <S.SectionTitle>Categorias</S.SectionTitle>
        <CategoryCarousel categories={categories} />

        <S.TwoColumnRow>
          <S.Column flex="2" as="section" aria-labelledby="recent-title">
            <S.SectionTitle id="recent-title">Artigos Recentes</S.SectionTitle>
            <S.Grid>
              {recent.map((post) => (
                <ArticleCard key={post.slug || post.id} item={post} to={buildPostLink(post)} />
              ))}
            </S.Grid>
          </S.Column>

          <S.Column flex="1" as="aside" aria-labelledby="side-title">
            <S.SideBox>
              <FraseDoDia />

              <h3 id="side-title">Populares</h3>
              <S.PopularList>
                {popular.length ? (
                  popular.map((p) => (
                    <S.SmallPopular
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
                        <span>
                          {(p.excerpt || p.descricao || p.description || "").slice(0, 90)}
                          {(p.excerpt || p.descricao || p.description || "").length > 90 ? "…" : ""}
                        </span>
                      </div>
                    </S.SmallPopular>
                  ))
                ) : (
                  <S.Empty>Sem artigos em destaque</S.Empty>
                )}
              </S.PopularList>

              <S.Divider />

              <h3>Receitas recomendadas</h3>
              <S.MiniRecipes>
                {receitasFlat.slice(0, 3).map((r) => (
                  <S.MiniRecipe
                    key={r.slug}
                    to={`/receitas/${encodeURIComponent(r.slug)}`}
                  >
                    <img
                      src={r.imagem || r.image || "/placeholder-1x1.png"}
                      alt={r.titulo || r.title}
                      loading="lazy"
                    />
                    <div>
                      <strong>{r.titulo}</strong>
                      <small>{r.tempo || ""}</small>
                    </div>
                  </S.MiniRecipe>
                ))}
              </S.MiniRecipes>

              <S.Divider />

              <MiniQuizSaude />
            </S.SideBox>
          </S.Column>
        </S.TwoColumnRow>

        <UnifiedCarousel items={carouselItems} />

        <S.ContinueSection>
          <LocalContinueExploring
            posts={dedupPosts}
            receitas={receitasFlat}
            products={productsFlat}
            trips={viagensFlat}
          />

          <S.TagsNewsletterRow>
            <TagsCloud articles={postsArray} />
            <NewsletterCTA />
          </S.TagsNewsletterRow>
        </S.ContinueSection>
      </S.Wrapper>

      <Footer />
    </>
  );
}

/* ---------------- local styled for ContinueExploring ---------------- */

const ContinueGrid = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  overflow: hidden;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors?.surface || "#f8fafc"};
  padding: 0.9rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 6px 18px rgba(15,23,42,0.04)"};
  min-width: 0;

  h4 {
    margin: 0 0 0.6rem 0;
    color: ${({ theme }) => theme.colors?.primaryDark || "#0f172a"};
    font-size: 0.98rem;
    font-weight: 700;
  }
`;


const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  box-sizing: border-box;
`;

const ListItem = styled.li`
  box-sizing: border-box;

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    padding: 0.6rem;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors?.surfaceAlt || "rgba(255,255,255,0.9)"};
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
    gap: 0.45rem;
    min-width: 0;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  }

  a:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    background: ${({ theme }) => theme.colors?.surface || "#fff"};
  }

  img {
    width: 100%;
    /* mantém proporção agradável em todas colunas */
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
    overflow: hidden;
  }

  strong {
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors?.primaryDark || "#0f172a"};
    line-height: 1.25;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* no máximo 2 linhas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  small {
    font-size: 0.82rem;
    line-height: 1.25;
    color: ${({ theme }) => theme.colors?.secondaryDark || "#64748b"};
    display: -webkit-box;
    -webkit-line-clamp: 2; /* segura a descrição em 2 linhas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  @media (max-width: 900px) {
    a {
      padding: 0.5rem;
      border-radius: 10px;
    }
    img {
      border-radius: 8px;
    }
  }

  @media (max-width: 520px) {
    a {
      padding: 0.45rem;
      gap: 0.35rem;
    }
    strong {
      font-size: 0.9rem;
    }
    small {
      font-size: 0.8rem;
    }
  }
`;

