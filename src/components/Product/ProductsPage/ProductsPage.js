// src/pages/ProductsPage.jsx
import React, { useMemo, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import ProductCard from "../ProductCard/ProductCard";
import productsData from "../../../data/products";

// Fade in up animation for product cards
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedCard = styled.div`
  opacity: 0;
  animation: ${css`${fadeInUp} 420ms forwards`};
  animation-delay: ${props => props.delay || 0}s;
`;

/* ---------------- Page Component ---------------- */

export default function ProductsPage() {
  const todasCategorias = productsData?.categories || [];

  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // featured | price-asc | price-desc | newest
  const [page, setPage] = useState(1);
  const perPage = 12;

  // filtered + search + sort
// filtered + search + sort
const produtosFiltrados = useMemo(() => {
  const todosProdutos = productsData?.products || [];
  let list = todosProdutos.slice();

  if (categoriaAtiva && categoriaAtiva !== "todos") {
    list = list.filter(p =>
      String(p.category || p.categoryId || "").toLowerCase()
      === String(categoriaAtiva).toLowerCase()
    );
  }

  if (query && query.trim().length > 0) {
    const q = query.trim().toLowerCase();
    list = list.filter(p =>
      (p.name || p.title || "").toLowerCase().includes(q) ||
      (p.description || p.desc || "").toLowerCase().includes(q) ||
      (p.tags || []).join(" ").toLowerCase().includes(q)
    );
  }

  if (sortBy === "price-asc") {
    list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  } else if (sortBy === "price-desc") {
    list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  } else if (sortBy === "newest") {
    list.sort(
      (a, b) =>
        new Date(b.publishedAt || b.date || 0) -
        new Date(a.publishedAt || a.date || 0)
    );
  } else {
    list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return list;
}, [categoriaAtiva, query, sortBy]);

  const total = produtosFiltrados.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const paginated = produtosFiltrados.slice((page - 1) * perPage, page * perPage);

  function gotoPage(n) {
    setPage(Math.max(1, Math.min(pages, n)));
    window.scrollTo({ top: 380, behavior: "smooth" });
  }

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      <PageContainer>
       <HeroSection role="banner" aria-labelledby="prod-hero-title">
      <HeroContent>
        <h1 id="prod-hero-title">Eleve seu desempenho com equipamentos e suplementos selecionados</h1>
        <p>Escolhas profissionais, testadas por atletas e especialistas — entregues com segurança.</p>
        <HeroCTA onClick={() => document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" })}>
          Ver Produtos
        </HeroCTA>
      </HeroContent>

      <HeroVideoWrap aria-hidden>
        <HeroVideo
          autoPlay
          muted
          loop
          playsInline
          poster={productsData?.heroPoster || "/hero-poster.jpg"}
          src={
            productsData?.heroVideo ||
            "https://www.pexels.com/download/video/856132/" /* fallback - substitua pelo seu MP4 */
          }
        />
        <HeroOverlayTop />
      </HeroVideoWrap>
    </HeroSection>


        <ControlsRow>
          <LeftControls>
            <CategoryMenu role="tablist" aria-label="Filtrar por categoria">
              <CategoryButton
                aria-current={categoriaAtiva === "todos" ? "true" : "false"}
                onClick={() => { setCategoriaAtiva("todos"); setPage(1); }}
              >
                Todos
              </CategoryButton>

              {todasCategorias.map(cat => (
                <CategoryButton
                  key={cat.id}
                  aria-current={categoriaAtiva === cat.id ? "true" : "false"}
                  onClick={() => { setCategoriaAtiva(cat.id); setPage(1); }}
                >
                  {cat.name}
                </CategoryButton>
              ))}
            </CategoryMenu>
          </LeftControls>

          <RightControls>
            <SearchInput
              type="search"
              placeholder="Buscar por nome, benefício ou marca..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              aria-label="Pesquisar produtos"
            />

            <SortSelect value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} aria-label="Ordenar produtos">
              <option value="featured">Em destaque</option>
              <option value="newest">Mais recentes</option>
              <option value="price-asc">Preço: crescente</option>
              <option value="price-desc">Preço: decrescente</option>
            </SortSelect>
          </RightControls>
        </ControlsRow>

        <CountRow>
          <div><strong>{total}</strong> produtos encontrados</div>
          <div>Página {page} de {pages}</div>
        </CountRow>

        <ProductsGrid id="products-grid" role="list">
          {paginated.length === 0 ? (
            <EmptyState>Nenhum produto encontrado — tente outro filtro.</EmptyState>
          ) : paginated.map((product, idx) => (
            <AnimatedCard key={product.id || product.sku || idx} delay={0.06 * (idx % 8)}>
              <ProductCard
                product={product}
                onBuy={() => {
                  if (product.affiliateLink) window.open(product.affiliateLink, "_blank", "noopener noreferrer");
                  else if (product.link) window.open(product.link, "_blank", "noopener noreferrer");
                  // could add tracking/event here
                }}
              />
            </AnimatedCard>
          ))}
        </ProductsGrid>

        <Pagination aria-label="Navegação entre páginas" role="navigation">
          <PageButton onClick={() => gotoPage(page - 1)} disabled={page <= 1}>Anterior</PageButton>
          <PageInfo>{page} / {pages}</PageInfo>
          <PageButton onClick={() => gotoPage(page + 1)} disabled={page >= pages}>Próximo</PageButton>
        </Pagination>
      </PageContainer>

      <Footer />
    </>
  );
}

/* ---------------- Styled ---------------- */

const NavbarSpacer = styled.div`height: 80px;`;

const PageContainer = styled.main`
  padding: 2rem 4rem;
  max-width: ${({ theme }) => theme.layout?.maxWidth || "1200px"};
  margin: 0 auto;
  @media (max-width: ${({ theme }) => theme.breakpoints?.laptop || 1024}px) {
    padding: 1rem 2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || 480}px) {
    padding: 1rem;
  }
`;

/* Dentro do seu ProductsPage.jsx — substitua o bloco HeroSection/HeroImage/HeroContent */

const HeroSection = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 1.5rem;
  align-items: center;
  padding: 1.6rem;
  border-radius: ${({ theme }) => theme.radius?.lg || "12px"};
  background: ${({ theme }) => theme.gradients?.soft || "linear-gradient(135deg,#f6fdf9,#e8fff4)"};
  margin-bottom: 2rem;
  overflow: hidden;
  @media (max-width: 980px) { grid-template-columns: 1fr; text-align: center; padding: 1rem; }
`;

/* vídeo hero: toca em loop, muted, playsinline. Usa poster se provider não entregar video */
const HeroVideoWrap = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  border-radius: ${({ theme }) => theme.radius?.md || "10px"};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow?.sm || "0 6px 18px rgba(0,0,0,0.06)"};
  @media (max-width: 980px) { height: 180px; margin-top: 1rem; }
`;

const HeroVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* overlay para legibilidade do texto */
const HeroOverlayTop = styled.div`
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55));
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: ${({ theme }) => theme.colors?.primaryDark || "#002"};
  max-width: 680px;

  h1 { font-size: clamp(1.6rem, 3.6vw, 2.6rem); margin: 0 0 0.6rem; font-family: ${({ theme }) => theme.fonts?.heading || "inherit"}; }
  p { margin: 0 0 1rem; font-size: 1rem; color: ${({ theme }) => theme.colors?.text || "#444"}; }
`;

const HeroCTA = styled.button`
  padding: 0.75rem 1.6rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors?.primary || "#2a9d8f"}, ${({ theme }) => theme.colors?.primaryDark || "#1e7f6f"});
  color: ${({ theme }) => theme.colors?.surface || "#fff"};
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(42,157,143,0.12);
  transition: transform .12s ease, filter .12s ease;
  &:hover { transform: translateY(-3px); filter: brightness(.97); }
`;



/* controls */
const ControlsRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap: 1rem;
  margin: 1.25rem 0;
  flex-wrap:wrap;
`;

const LeftControls = styled.div``;
const RightControls = styled.div`
  display:flex;
  gap:0.75rem;
  align-items:center;
`;

/* category menu */
const CategoryMenu = styled.div`
  display:flex;
  gap:0.6rem;
  flex-wrap:wrap;
`;

const CategoryButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e9e9e9"};
  background: ${({ 'aria-current': current, theme }) => current === "true" ? theme.colors?.primary || "#2a9d8f" : theme.colors?.surface || "#fff"};
  color: ${({ 'aria-current': current, theme }) => current === "true" ? theme.colors?.surface || "#fff" : theme.colors?.text || "#333"};
  font-weight: 600;
  cursor: pointer;
`;

/* search and sort */
const SearchInput = styled.input`
  padding: 0.55rem 0.9rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e9e9e9"};
  min-width: 220px;
`;

const SortSelect = styled.select`
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e9e9e9"};
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
`;

/* count row */
const CountRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  color: ${({ theme }) => theme.colors?.secondaryDark || "#666"};
  margin-bottom: 0.6rem;
`;

/* grid */
const ProductsGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-bottom: 1.25rem;
`;

/* pagination */
const Pagination = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:0.75rem;
  margin: 1.25rem 0 3rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e9e9e9"};
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  cursor: pointer;
  &:disabled { opacity: .5; cursor: not-allowed; }
`;

const PageInfo = styled.div`color: ${({ theme }) => theme.colors?.secondaryDark || "#666"};`;

const EmptyState = styled.div`padding: 2rem; text-align:center; color: ${({ theme }) => theme.colors?.secondaryDark || "#777"};`;
