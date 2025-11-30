// src/components/Viagens/FeaturedCarousel.jsx
import React, { useRef, useMemo } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import viagensData from "../../data/viagens";
import { Link } from "react-router-dom";

/**
 * FeaturedCarousel
 * - props:
 *    items?: array of viagem objects (if não passado, constrói a partir do viagensData)
 *    title?: string (título do bloco)
 *    maxItems?: number (limite de slides mostrados)
 */
export default function FeaturedCarousel({ items = null, title = "Destinos em destaque", maxItems = 12 }) {
  const swiperRef = useRef(null);

  // build items from viagensData if not provided
  const effectiveItems = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) {
      return dedupeAndNormalize(items).slice(0, maxItems);
    }

    // flatten viagensData: pega nacionais + internacionais
    const flat = Object.values(viagensData).flat().filter(Boolean);
    // priorizar: internacionais primeiro (opcional) -> aqui mantemos ordem original
    return dedupeAndNormalize(flat).slice(0, maxItems);
  }, [items, maxItems]);

  const loopedSlides = Math.max(Math.min(effectiveItems.length, 12), 1);

  if (!effectiveItems || effectiveItems.length === 0) return null;

  const prev = () => swiperRef.current?.slidePrev();
  const next = () => swiperRef.current?.slideNext();

  return (
    <Wrapper aria-label={title}>
      <Header>
        <div>
          <H2>{title}</H2>
          <Sub>Destinos selecionados para inspirar sua próxima viagem.</Sub>
        </div>

        <Controls>
          <Arrow onClick={prev} aria-label="Anterior">‹</Arrow>
          <Arrow onClick={next} aria-label="Próximo">›</Arrow>
        </Controls>
      </Header>

      <SwiperContainer>
        <Swiper
          modules={[Autoplay, A11y, Navigation]}
          onSwiper={(s) => (swiperRef.current = s)}
          loop={effectiveItems.length > 1}
          loopedSlides={loopedSlides}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          speed={600}
          spaceBetween={18}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1.05 },
            640: { slidesPerView: 1.3 },
            900: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
          }}
          a11y={{ prevSlideMessage: "Anterior", nextSlideMessage: "Próximo" }}
          style={{ paddingBottom: 12 }}
        >
          {effectiveItems.map((v, i) => (
            <SwiperSlide key={`${v.slug || v.title}-${i}`} style={{ height: "100%" }}>
              <SlideCard to={`/viagens/${(v.category||v.categoria)||v.category || guessCategory(v)}/${encodeURIComponent(v.slug || v.id || slugify(v.title || ""))}`}>
                <CardThumb style={{ backgroundImage: `url(${v.image || v.imagem || "/placeholder-16x9.png"})` }} role="img" aria-label={v.title} />
                <CardBody>
                  <CardMeta>
                    <time dateTime={formatISODate(v.date)}>{v.date || ""}</time>
                    <small> • </small>
                    <small>{v.readingTime || v.duration || ""}</small>
                  </CardMeta>
                  <CardTitle>{v.title}</CardTitle>
                  <CardExcerpt dangerouslySetInnerHTML={{ __html: truncateHtml(v.shortDescription || v.excerpt || v.content || "", 140) }} />
                </CardBody>
              </SlideCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Wrapper>
  );
}

/* ---------------- helpers ---------------- */

function slugify(s = "") {
  return String(s || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

function dedupeAndNormalize(list = []) {
  const seen = new Set();
  const out = [];
  for (const it of list) {
    const key = (it.slug || it.id || normalizeString(it.title || "")).toString();
    if (!key) {
      // fallback por title
      const fk = normalizeString(JSON.stringify(it)).slice(0, 40);
      if (seen.has(fk)) continue;
      seen.add(fk);
      out.push(it);
      continue;
    }
    const norm = normalizeString(key);
    if (seen.has(norm)) continue;
    seen.add(norm);
    out.push(it);
  }
  return out;
}

function normalizeString(s = "") {
  return String(s || "").normalize?.("NFD")?.replace(/[\u0300-\u036f]/g, "")?.trim()?.toLowerCase() || String(s || "").trim().toLowerCase();
}

function truncateHtml(str = "", max = 140) {
  const plain = str.replace(/<[^>]+>/g, "").trim();
  if (!plain) return "&nbsp;"; // mantém altura quando não há descrição
  if (plain.length <= max) return escapeHtml(plain);
  return escapeHtml(plain.slice(0, max - 1)) + "…";
}

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatISODate(d) {
  if (!d) return "";
  // tenta interpretar dd/mm/yyyy
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(d)) {
    const [dd, mm, yyyy] = d.split("/");
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  return d;
}

function guessCategory(v) {
  return (v.category || v.categoria || "nacionais");
}

/* ---------------- styles ---------------- */

const Wrapper = styled.section`
  margin: 2rem 0;
`;

const Header = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom: 0.75rem;
  gap: 1rem;
  @media(max-width:720px){flex-direction:column; align-items:flex-start;}
`;

const H2 = styled.h3`
  margin:0;
  font-size:1.15rem;
  color: ${({theme})=>theme.colors?.primaryDark || "#163d35"};
`;

const Sub = styled.p`
  margin:0;
  font-size:0.92rem;
  color: ${({theme})=>theme.colors?.secondaryDark || "#667"};
`;

const Controls = styled.div`
  display:flex;
  gap:0.5rem;
`;

const Arrow = styled.button`
  width:36px;
  height:36px;
  border-radius:999px;
  border:1px solid ${({theme})=>theme.colors?.border || "#e6e6e6"};
  background:${({theme})=>theme.colors?.surface || "#fff"};
  color:${({theme})=>theme.colors?.primaryDark || "#163d35"};
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  font-size:1.15rem;
  &:hover{ transform:scale(1.03); background:${({theme})=>theme.colors?.primary || "#2a9d8f"}; color:#fff;}
  @media(max-width:900px){ display:none; }
`;

const SwiperContainer = styled.div`
  .swiper-slide { height:100%; display:flex; align-items:stretch; }
`;

const SlideCard = styled(Link)`
  display:flex;
  flex-direction:column;
  gap:0.6rem;
  background: ${({theme})=>theme.colors?.surface || "#fff"};
  border-radius:12px;
  overflow:hidden;
  text-decoration:none;
  color:inherit;
  min-height: 300px;
  box-shadow: ${({theme})=>theme.shadow?.sm || "0 4px 12px rgba(0,0,0,0.04)"};
  transition: transform .12s ease, box-shadow .12s ease;
  &:hover{ transform: translateY(-6px); box-shadow: ${({theme})=>theme.shadow?.lg || "0 10px 28px rgba(0,0,0,0.08)"}; }
`;

const CardThumb = styled.div`
  width:100%;
  height:160px;
  background-size:cover;
  background-position:center;
  flex-shrink:0;
`;

const CardBody = styled.div`
  padding:.9rem;
  display:flex;
  flex-direction:column;
  gap:.5rem;
  flex:1 1 auto;
`;

const CardMeta = styled.div`
  font-size:.85rem;
  color: ${({theme})=>theme.colors?.secondaryDark || "#777"};
  display:flex;
  gap:.5rem;
  align-items:center;
`;

const CardTitle = styled.h4`
  margin:0;
  font-size:1rem;
  color: ${({theme})=>theme.colors?.primaryDark || "#163d35"};
  line-height:1.18;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;

const CardExcerpt = styled.p`
  margin:0;
  font-size:0.95rem;
  color: ${({theme})=>theme.colors?.text || "#444"};
  opacity:.95;
  flex:1 1 auto;
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;
