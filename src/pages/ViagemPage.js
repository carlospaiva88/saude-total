// src/pages/ViagemPage.js
import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar/Navbar";
import NavbarSpacer from "../components/Navbar/NavbarSpacer";
import BreadcrumbsViagens from "../components/BreadcrumbsViagens";
import RelatedCarousel from "../components/RelatedCarousel";
import AdBlock from "../components/AdBlock";
import Footer from "../components/Footer/Footer";
import viagensDataDefault from "../data/viagens";
import { ViagemCardBase } from "../components/Viagens/ViagemCard.style";

/* ---------------- helpers ---------------- */

function normalizeStr(v = "") {
  return String(v || "")
    .normalize?.("NFD")?.replace(/[\u0300-\u036f]/g, "") // remove acentos quando possível
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function findViagem({ viagensData, categoria, slug }) {
  const normSlug = normalizeStr(slug || "");
  const normCategoria = normalizeStr(categoria || "");

  // busca direta: categoria + slug
  if (normCategoria && normSlug && viagensData[normCategoria]) {
    const found = (viagensData[normCategoria] || []).find(v => normalizeStr(v.slug) === normSlug);
    if (found) return { ...found, categoria: normCategoria };
  }

  // busca por slug em todas as categorias
  if (normSlug) {
    for (const [cat, arr] of Object.entries(viagensData || {})) {
      const found = (arr || []).find(v => {
        return normalizeStr(v.slug) === normSlug
          || normalizeStr(v.friendlySlug) === normSlug
          || normalizeStr(v.title) === normSlug;
      });
      if (found) return { ...found, categoria: cat };
    }
  }

  // fallback: talvez slug foi passado como categoria
  if (normCategoria) {
    for (const [cat, arr] of Object.entries(viagensData || {})) {
      const found = (arr || []).find(v => normalizeStr(v.slug) === normCategoria);
      if (found) return { ...found, categoria: cat };
    }
  }

  return null;
}

function flattenViagens(viagensData) {
  const out = [];
  for (const [cat, arr] of Object.entries(viagensData || {})) {
    if (!Array.isArray(arr)) continue;
    for (const v of arr) out.push({ categoria: cat, ...v });
  }
  return out;
}

function parseDateToTime(d) {
  if (!d) return 0;
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(d)) {
    const [dd, mm, yyyy] = d.split("/");
    const iso = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    const ts = Date.parse(iso);
    return isNaN(ts) ? 0 : ts;
  }
  const ts = Date.parse(d);
  return isNaN(ts) ? 0 : ts;
}

/* ---------------- component ---------------- */

export default function ViagemPage() {
  const { categoria, slug } = useParams();

  // flatten once (dados estáticos do módulo -> deps vazias)
  const viagensArray = useMemo(() => flattenViagens(viagensDataDefault), []);

  // find viagem robustamente
  const viagem = useMemo(() => findViagem({ viagensData: viagensDataDefault, categoria, slug }), [categoria, slug]);

  // related deve ser calculado antes de qualquer early return para não violar regras de hooks
  const related = useMemo(() => {
    if (!viagem) return [];
    const sameCat = (viagensDataDefault[viagem.categoria] || []).filter(v => v.slug !== viagem.slug);
    sameCat.sort((a, b) => parseDateToTime(b.date) - parseDateToTime(a.date));
    const max = 12;
    const picked = sameCat.slice(0, max);
    if (picked.length >= Math.min(6, max)) return picked;
    const others = viagensArray.filter(v => v.slug !== viagem.slug && v.categoria !== viagem.categoria);
    others.sort((a, b) => parseDateToTime(b.date) - parseDateToTime(a.date));
    const fill = others.slice(0, Math.max(0, max - picked.length));
    return [...picked, ...fill].slice(0, max);
  }, [viagem, viagensArray]);

  // se não encontrou, renderiza fallback (hooks já foram todos chamados)
  if (!viagem) {
    return (
      <>
        <Navbar />
        <NavbarSpacer />
        <Centered>
          <h2>Viagem não encontrada 😕</h2>
          <p>Verifique a URL ou explore outros destinos.</p>
          <Link to="/viagens">Ir para Viagens</Link>
        </Centered>
        <Footer />
      </>
    );
  }

  const metaTitle = viagem.seo?.metaTitle || `${viagem.title} — Viva no Flow`;
  const metaDesc = viagem.seo?.metaDescription || viagem.shortDescription || viagem.excerpt || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": viagem.title,
    "image": viagem.image,
    "datePublished": viagem.date ? (new Date(parseDateToTime(viagem.date)).toISOString()) : undefined,
    "author": { "@type": "Organization", "name": "Viva no Flow" },
    "description": metaDesc,
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        {viagem.image && <meta property="og:image" content={viagem.image} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />
      <NavbarSpacer />

      <Article>
        <BreadcrumbsViagens
          paths={[
            { name: "Viagens", url: "/viagens" },
            { name: viagem.categoria || "Categoria", url: `/viagens/${viagem.categoria || ""}` },
            { name: viagem.title, url: `/viagens/${viagem.categoria}/${viagem.slug}` },
          ]}
        />

        <Header>
          <HeroMedia>
            {viagem.heroVideo ? (
              <HeroVideo src={viagem.heroVideo} poster={viagem.image} autoPlay muted loop playsInline />
            ) : (
              <HeroImg src={viagem.image || "/placeholder-16x9.png"} alt={viagem.title} />
            )}
            <HeroOverlay>
              <Badge>{viagem.region || viagem.categoria || "Destino"}</Badge>
              <Title>{viagem.title}</Title>
              <MetaRow>
                <span>{viagem.duration || viagem.readingTime || "—"}</span>
                <span>{viagem.bestTimeToGo || viagem.season || "—"}</span>
              </MetaRow>
            </HeroOverlay>
          </HeroMedia>
        </Header>

        <MainGrid>
          <Content>
            <Intro dangerouslySetInnerHTML={{ __html: viagem.intro || viagem.shortDescription || viagem.excerpt || (viagem.content?.slice?.(0, 320) ?? "") }} />

            <QuickFacts>
              <Fact><strong>Local:</strong> {viagem.location || viagem.region || viagem.title}</Fact>
              <Fact><strong>Como chegar:</strong> {viagem.howToReach || "Avião / Ônibus"}</Fact>
              <Fact><strong>Melhor época:</strong> {viagem.bestTimeToGo || "—"}</Fact>
              <Fact><strong>Duração sugerida:</strong> {viagem.duration || "3-5 dias"}</Fact>
            </QuickFacts>

            {viagem.gallery?.length > 0 && (
              <Section>
                <h3>Galeria</h3>
                <Gallery>
                  {viagem.gallery.map((src, i) => (
                    <GalleryItem key={i}>
                      <img src={src} alt={`${viagem.title} foto ${i + 1}`} loading="lazy" />
                    </GalleryItem>
                  ))}
                </Gallery>
              </Section>
            )}

            <Section>
              <h3>Detalhes e roteiro</h3>
              <div dangerouslySetInnerHTML={{ __html: viagem.content || viagem.longDescription || "" }} />
            </Section>

            {viagem.itinerary?.length > 0 && (
              <Section>
                <h3>Itinerário sugerido</h3>
                <Itinerary>
                  {viagem.itinerary.map((day, i) => (
                    <li key={i}><strong>{day.title || `Dia ${i + 1}`}</strong>: {day.desc}</li>
                  ))}
                </Itinerary>
              </Section>
            )}

            <Section>
              <h3>Onde fica</h3>
              {viagem.locationCoords ? (
                <MapFrame src={`https://www.openstreetmap.org/export/embed.html?bbox=${viagem.locationCoords.join(",")}`} title="Mapa do destino" />
              ) : (
                <MapPlaceholder>Mapa não disponível — use GPS/Busca</MapPlaceholder>
              )}
            </Section>

            {viagem.tips?.length > 0 && (
              <Section>
                <h3>Dicas locais</h3>
                <ul>
                  {viagem.tips.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>
              </Section>
            )}

            <AdBlock />

            {viagem.product && (
              <Section>
                <h3>Produto recomendado</h3>

                <InlineProductCard role="link" onClick={() => window.open(viagem.product.link || "#", "_blank", "noopener noreferrer")}>
                  <div className="imgWrap">
                    <img src={viagem.product.image} alt={viagem.product.name} loading="lazy" />
                  </div>
                  <div className="body">
                    <h4>{viagem.product.name}</h4>
                    <p>{viagem.product.description}</p>
                    {viagem.product.price && <small style={{ fontWeight: 700, color: "#2a6f61" }}>{viagem.product.price}</small>}
                  </div>
                </InlineProductCard>
              </Section>
            )}

            {viagem.reviews && viagem.reviews.length > 0 && (
              <Section>
                <h3>Avaliações de viajantes</h3>
                {viagem.reviews.map((r, i) => (
                  <blockquote key={i}>
                    <strong>{r.name}</strong> — <small>{r.date}</small>
                    <p>{r.text}</p>
                  </blockquote>
                ))}
              </Section>
            )}
          </Content>

          <Side>
            <StickyPanel>
              <PanelTitle>Planeje sua viagem</PanelTitle>
              <PanelCTA onClick={() => window.open(viagem.bookingLink || "#", "_blank", "noopener noreferrer")}>
                Ver opções & reservar
              </PanelCTA>

              <SmallNote>
                <strong>Tempo médio:</strong> {viagem.duration || "—"} • <strong>Melhor época:</strong> {viagem.bestTimeToGo || "—"}
              </SmallNote>

              <Checklist>
                <li>Passaporte / Documentos</li>
                <li>Seguro viagem</li>
                <li>Vacinas (se aplicável)</li>
                <li>Reservar atividades</li>
              </Checklist>

              <TagList>
                {(viagem.tags || []).slice(0, 8).map((t) => <Tag key={t}>{t}</Tag>)}
              </TagList>
            </StickyPanel>
          </Side>
        </MainGrid>

        <Section>
          <h3>Outros destinos na mesma categoria</h3>
          <RelatedCarousel items={related.map(r => ({ slug: r.slug, title: r.title, image: r.image, categoria: viagem.categoria }))} renderCard={(r) => (
          <ViagemCardBase onClick={() => window.location.assign(`/viagens/${viagem.categoria}/${r.slug}`)}>
                <img src={r.image} alt={r.title} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <h4 style={{ margin: 0 }}>{r.title}</h4>
                </div>
              </ViagemCardBase>
            )}
          />
        </Section>
      </Article>

      <Footer />
    </>
  );
}

/* -------- styled (mantive padrões do anterior) -------- */

const Centered = styled.div`padding:3rem; text-align:center;`;

const Article = styled.article`padding: 2rem; max-width: 1200px; margin: 0 auto;`;

const Header = styled.header``;

const HeroMedia = styled.div`position: relative; width: 100%; height: 420px; border-radius: 12px; overflow: hidden; margin-bottom: 1rem;`;

const HeroImg = styled.img`width:100%; height:100%; object-fit:cover; display:block;`;

const HeroVideo = styled.video`width:100%; height:100%; object-fit:cover; display:block;`;

const HeroOverlay = styled.div`position:absolute; left:0; right:0; bottom:0; padding: 18px; color: #fff; background: linear-gradient(180deg, transparent, rgba(0,0,0,0.45));`;

const Badge = styled.span`background: rgba(255,255,255,0.12); padding:6px 10px; border-radius:999px; font-weight:700; margin-bottom:8px; display:inline-block;`;

const Title = styled.h1`margin: 6px 0 6px; font-size: clamp(1.4rem, 2.6vw, 2.2rem); color: #fff;`;

const MetaRow = styled.div`display:flex; gap:0.6rem; color: #fff; opacity: 0.95; font-size: .95rem;`;

const MainGrid = styled.div`display:grid; grid-template-columns: 1fr 320px; gap: 1.5rem; margin-top:1.25rem; @media(max-width:980px){grid-template-columns:1fr;}`;

const Content = styled.div``;

const Side = styled.aside``;

const Intro = styled.div`margin-bottom:1rem; color: ${({theme})=>theme.colors?.text || "#333"};`;

const QuickFacts = styled.div`display:flex; gap: .8rem; flex-wrap:wrap; margin-bottom:1rem;`;
const Fact = styled.div`background: ${({theme})=>theme.colors?.surfaceAlt || "#f7f7f7"}; padding: .5rem .8rem; border-radius: 10px; font-size: .95rem;`;

const Section = styled.section`margin-top:1rem; background: transparent; padding: 0;`;

const Gallery = styled.div`display:grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 0.6rem; margin-top: .6rem;`;
const GalleryItem = styled.div`overflow:hidden; border-radius:8px; img{width:100%;height:140px;object-fit:cover;display:block;}`;

const Itinerary = styled.ul`padding-left:1rem; li{margin-bottom:.6rem;}`;

const MapFrame = styled.iframe`width:100%;height:300px;border:0;border-radius:8px;`;

const MapPlaceholder = styled.div`padding: 1rem;background:#fafafa;border-radius:8px;color:#666;`;

const StickyPanel = styled.div`position:sticky; top:100px; background: ${({theme})=>theme.colors?.surface || "#fff"}; padding:1rem; border-radius:8px; box-shadow: ${({theme})=>theme.shadow?.xs || "0 4px 12px rgba(0,0,0,.03)"};`;

const PanelTitle = styled.h4`margin:0 0 .6rem 0;`;
const PanelCTA = styled.button`width:100%; padding:.65rem; border-radius:10px; border:none; background:${({theme})=>theme.colors?.primary||"#2a9d8f"}; color:#fff; font-weight:700; cursor:pointer; margin-bottom:.6rem;`;

const SmallNote = styled.p`font-size:.92rem; color:${({theme})=>theme.colors?.secondaryDark||"#666"}; margin:0 0 .8rem;`;

const Checklist = styled.ul`margin:0;padding-left:1rem; li{margin-bottom:.4rem;}`;

const TagList = styled.div`display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.6rem;`;
const Tag = styled.span`background:#effaf5;padding:.3rem .6rem;border-radius:999px;font-size:.85rem;`;

/* Inline product card */
const InlineProductCard = styled.div`
  display:flex;
  gap: 0.8rem;
  align-items: center;
  border-radius: 12px;
  padding: 0.8rem;
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 6px 18px rgba(16,88,71,0.04)"};
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  .imgWrap {
    width: 96px;
    height: 96px;
    flex: 0 0 96px;
    border-radius: 8px;
    overflow: hidden;
  }
  img { width:100%; height:100%; object-fit:cover; display:block; }
  .body { flex:1; text-align:left; }
  h4 { margin:0 0 .25rem 0; font-size:1rem; color: ${({theme})=>theme.colors?.primaryDark || "#163d35"}; }
  p { margin:0 0 0.5rem 0; color: ${({theme})=>theme.colors?.secondaryDark || "#6b8a7b"}; font-size:0.95rem; }
`;
