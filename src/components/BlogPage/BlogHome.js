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

function safeImage(item) {
  return item?.image || item?.imagem || item?.thumb || item?.imagem || "/placeholder-16x9.png";
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

/* ---------------- dedupe helpers ---------------- */

// normaliza strings: remove acentos, trim, toLower, colapsa espaços
function normalizeString(str = "") {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

// retorna chave única preferindo slug/id, senão title normalizado
function keyForPost(p = {}) {
  if (!p) return "";
  if (p.slug && String(p.slug).trim()) return normalizeString(String(p.slug));
  if (p.id && String(p.id).trim()) return normalizeString(String(p.id));
  if (p.friendlySlug && String(p.friendlySlug).trim()) return normalizeString(String(p.friendlySlug));
  if (p.link && String(p.link).trim()) return normalizeString(String(p.link));
  return normalizeString(p.title || p.titulo || p.nome || "");
}

// regras de preferência para manter melhor versão do post
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

// uniquePosts: retorna array deduplicado preservando prioridade
function uniquePosts(posts = []) {
  const map = new Map();
  for (const p of posts || []) {
    const key = keyForPost(p);
    if (!key) {
      const fallback = normalizeString(JSON.stringify(p)).slice(0, 40) || Math.random().toString(36).slice(2,8);
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

/* ---------------- replace shortenTitle (safe) ---------------- */
/* shortenTitle: reduz título em listagens quando apropriado
   - remove subtítulos após ":" ou "—" ou "-" e limita comprimento
   - robusto contra valores não-string
*/
function shortenTitle(title = "", max = 36) {
  try {
    // garante string
    const raw = title == null ? "" : String(title);
    // corta por separadores comuns e mantem apenas partes não vazias
    const parts = raw.split(/[:—\-–]/).map(p => String(p || "").trim()).filter(Boolean);
    let base = parts.length ? parts[0] : raw.trim();
    if (base.length <= max) return base;
    // corta por palavra sem quebrar no meio
    const words = base.split(/\s+/);
    let out = "";
    for (const w of words) {
      if ((out + " " + w).trim().length > max) break;
      out = (out + " " + w).trim();
    }
    return out + (out.length < base.length ? "…" : "");
  } catch (err) {
    // fallback seguro
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

  // garantir items únicos por link/title (não-condicional)
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

  const slidePrev = () => { if (swiperRef.current) swiperRef.current.slidePrev(); };
  const slideNext = () => { if (swiperRef.current) swiperRef.current.slideNext(); };

  const loopedSlides = Math.max(Math.min(effectiveItems.length, 12), 1);

  return (
    <S.UnifiedWrapper aria-label="Carrossel de conteúdos recomendados">
      <S.UnifiedHeader>
        <div>
          <h2>Em destaque</h2>
          <p>Conteúdos, receitas e produtos selecionados para você.</p>
        </div>

        <S.Controls>
          <S.NavButton onClick={slidePrev} aria-label="Anterior">‹</S.NavButton>
          <S.NavButton onClick={slideNext} aria-label="Próximo">›</S.NavButton>
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
            1200: { slidesPerView: 3 }
          }}
          a11y={{ prevSlideMessage: "Anterior", nextSlideMessage: "Próximo" }}
          style={{ paddingBottom: 12, position: "relative" }}
        >
          {effectiveItems.map((it, i) => (
            <SwiperSlide key={`${(it.link||it.title)}-${i}`} style={{ height: "100%" }}>
              <S.Slide>
                <S.CardLink
                  to={it.link}
                  aria-label={`${it.type} - ${it.title}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <S.Card>
                    <S.Thumb role="img" aria-label={it.title} style={{ backgroundImage: `url(${safeImage(it)})` }} />
                    <S.CardBody>
                      <S.Badge type={it.type}>
                        {it.badge || (it.type === "article" ? "Artigo" : it.type === "receita" ? "Receita" : it.type === "product" ? "Produto" : "Viagem")}
                      </S.Badge>
                      <S.CardTitle>{it.title}</S.CardTitle>

                      <S.CardExcerpt
                        dangerouslySetInnerHTML={{
                          __html: (it.excerpt && it.excerpt.length > 0)
                            ? (it.excerpt.length > 140 ? `${it.excerpt.slice(0, 137)}…` : it.excerpt)
                            : '&nbsp;'
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

/* ---------------- LocalContinueExploring (4 col) ----------------
   Columns:
    - Artigos (lista compacta com título curto + meta)
    - Receitas (mini recipes)
    - Produtos (product mini card)
    - Viagens (mini trip card)
*/
function LocalContinueExploring({ posts = [], receitas = [], products = [], trips = [] }) {
  // dedupe posts again and keep top N
  const uniqPosts = useMemo(() => uniquePosts(posts).slice(0, 6), [posts]);
  const uniqRecipes = useMemo(() => (safeArray(receitas).flat().slice(0, 6)), [receitas]);
  const uniqProducts = useMemo(() => safeArray(products).slice(0, 6), [products]);
  const uniqTrips = useMemo(() => uniquePosts(trips).slice(0, 6), [trips]);

  return (
    <ContinueGrid>
      <Column>
        <h4>Artigos</h4>
        <List>
          {uniqPosts.map(p => (
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
          {uniqRecipes.map(r => (
            <ListItem key={r.slug}>
              <a href={`/receitas/${encodeURIComponent(r.slug)}`}>
                <img src={r.imagem || r.image ||"/placeholder-4x3.png"} alt={r.titulo} />
                <div>
                  <strong>{shortenTitle(r.titulo)}</strong>
                  <small>
                    {r.tempo ? r.tempo : ""}
                    {r.calorias ? ` • ${r.calorias} kcal` : ""}
                    <br/> 
                    {r.shortDescription}</small>
                </div>
              </a>
            </ListItem>
          ))}
        </List>
      </Column>

      <Column>
        <h4>Produtos</h4>
        <List>
          {uniqProducts.map(p => (
            <ListItem key={p.id || p.slug}>
              <a href={p.affiliateLink || p.link} target="_blank" rel="noreferrer">
                <img src={p.image || "/placeholder-4x3.png"} alt={p.name} />
                <div>
                  <strong>{shortenTitle(p.name)}</strong>
                  <small>
                    {p.price ? `${p.price}` : (p.brand || "")}
                    <br/>
                    {p.shortDescription}
                    </small>
                </div>
              </a>
            </ListItem>
          ))}
        </List>
      </Column>

      <Column>
        <h4>Viagens</h4>
        <List>
          {uniqTrips.map(t => (
            <ListItem key={t.slug || t.title}>
              <a href={t.slug ? buildTripLink(t) : "/viagens"}>
                <img src={t.image || t.imagem || "/placeholder-4x3.png"} alt={t.title} />
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
  // postsArray: fonte estática vindo dos módulos
  const postsArray = useMemo(() => safeArray(articlesData), []);

  const recent = useMemo(() => {
    return postsArray
      .slice()
      .sort((a, b) => safeDate(b.date || b.datePublished) - safeDate(a.date || a.datePublished))
      .slice(0, 9);
  }, [postsArray]);

  const popular = useMemo(() => {
    const raw = postsArray.filter(p => p.featured || p.destaque || p.popular);
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

  // carouselItems: monta mix de conteúdos (dependências vazias intencionais porque os módulos são estáticos)
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

    const recs = safeArray(receitas).flat().map(r => ({
      type: "receita",
      title: r.titulo || r.title || "Receita",
      image: r.imagem || r.image || "/placeholder-16x9.png",
      link: `/receitas/${encodeURIComponent(r.slug)}`,
      excerpt: (r.descricaoCurta || r.descricao || "").slice(0, 140),
      badge: r.categoria || "Receita",
      meta: r.tempo ? `${r.tempo}` : undefined,
    }));

    // Flatten robusto de viagensData: aceita objeto com categorias
    const viagensArr = Array.isArray(viagensData)
      ? viagensData.flat(Infinity).filter(Boolean)
      : Object.values(viagensData || {}).flat(Infinity).filter(Boolean);

    const viagens = safeArray(viagensArr).map(v => ({
      type: "trip",
      title: v.title || v.titulo || v.nome || "Viagem",
      image: v.image || v.imagem || "/placeholder-16x9.png",
      link: v.slug ? buildTripLink(v) : (v.link || "/viagens"),
      excerpt: (v.shortDescription || v.excerpt || v.description || "").slice(0, 140),
      badge: "Viagem",
    }));

    const artigos = safeArray(articlesData)
      .slice()
      .map(a => ({
        type: "article",
        title: a.title || a.titulo || "Artigo",
        image: safeImage(a),
        link: buildPostLink(a),
        excerpt: (a.excerpt || a.descricao || a.description || a.shortDescription || "").slice(0, 140),
        badge: a.category || a.categoria || "Artigo",
      }));

    const mixed = [
      ...artigos.slice(0, 8),
      ...recs.slice(0, 6),
      ...produtos.slice(0, 4),
      ...viagens.slice(0, 8)
    ];

    // dedup robusto por posts (aplica preferências já definidas)
    const dedup = uniquePosts(mixed).slice(0, 18);
    return dedup;
  }, []);

  // dedup de artigos antes de enviar para ContinueExploring (evita repetir posts recomendados)
  const dedupPosts = useMemo(() => uniquePosts(postsArray), [postsArray]);

  // prepare small arrays for continue exploring
  // <-- removi useMemo aqui porque receitas e productsData são módulos estáticos (evita warnings eslint sobre depender de variáveis de módulo)
  const receitasFlat = safeArray(receitas).flat();
  const productsFlat = safeArray(productsData?.products);

  const viagensFlat = useMemo(() => {
    const arr = Array.isArray(viagensData) ? viagensData.flat(Infinity) : Object.values(viagensData || {}).flat(Infinity);
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
                <ArticleCard
                  key={post.slug || post.id}
                  item={post}
                  to={buildPostLink(post)}
                />
              ))}
            </S.Grid>
          </S.Column>

          <S.Column flex="1" as="aside" aria-labelledby="side-title">
            <S.SideBox>
              <FraseDoDia />

              <h3 id="side-title">Populares</h3>
              <S.PopularList>
                {popular.length ? popular.map(p => (
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
                      <span>{(p.excerpt || p.descricao || p.description || "").slice(0, 90)}{(p.excerpt || p.descricao || p.description || "").length > 90 ? "…" : ""}</span>
                    </div>
                  </S.SmallPopular>
                )) : <S.Empty>Sem artigos em destaque</S.Empty>}
              </S.PopularList>

              <S.Divider />

              <h3>Receitas recomendadas</h3>
              <S.MiniRecipes>
                {receitasFlat.slice(0, 3).map(r => (
                  <S.MiniRecipe key={r.slug} to={`/receitas/${encodeURIComponent(r.slug)}`}>
                    <img src={r.imagem || r.image || "/placeholder-1x1.png"} alt={r.titulo || r.title} loading="lazy" />
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

        {/* unified carousel */}
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

  /* evita que conteúdos internos causem overflow do container pai */
  overflow: hidden;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

/* Column: cartão que contém lista — garante que o conteúdo interno pode encolher */
const Column = styled.div`
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  padding: 0.9rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 6px 18px rgba(16,88,71,0.04)"};
  min-width: 0; /* CRUCIAL: permite que filhos flex encolham sem forçar overflow */

  h4 {
    margin: 0 0 0.6rem 0;
    color: ${({ theme }) => theme.colors?.primaryDark};
  }
`;

/* List: coluna de itens (vertical) */
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display:flex;
  flex-direction:column;
  gap:0.6rem;
  box-sizing: border-box;
`;

/* ListItem: força a imagem ocupar espaço fixo, evita que o texto empurre, e garante que texto quebre */
const ListItem = styled.li`
  box-sizing: border-box;

  a {
    display:flex;
    gap:0.8rem;
    text-decoration:none;
    color:inherit;
    align-items:center;
    padding: 0.25rem 0;
    min-width: 0; /* permite que o link encolha dentro do Column */
  }

  /* imagem: tamanho fixo (responda via media queries) */
  img {
    width: 120px;
    height: 84px;
    flex: 0 0 120px; /* reserva o espaço, não encolhe além disso */
    object-fit: cover;
    border-radius: 8px;
    display:block;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  }

  /* content wrapper: permite truncamento interno em flex */
  div {
    min-width: 0; /* ESSENCIAL: permite truncamento do texto em flexbox */
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    overflow: hidden;
  }

  /* título: até 2 linhas sem estourar e com ellipsis */
  strong {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.12;
    font-size: 0.98rem;
    color: ${({ theme }) => theme.colors?.primaryDark};
    word-break: break-word;
  }

  /* descrição/meta: quebra palavras longas e limita linhas (ou usar nowrap se preferir) */
  small {
    display: block;
    color: ${({ theme }) => theme.colors?.secondaryDark};
    font-size: 0.86rem;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    /* permite quebra de palavras longas sem forçar overflow */
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  /* media queries para reduzir imagem em telas menores */
  @media (max-width: 900px) {
    img { width: 110px; height: 76px; flex: 0 0 110px; }
  }
  @media (max-width: 520px) {
    img { width: 96px; height: 64px; flex: 0 0 96px; }
    a { gap: 0.6rem; }
    strong { -webkit-line-clamp: 2; font-size: 0.95rem; }
    small { font-size: 0.82rem; }
  }
`;
