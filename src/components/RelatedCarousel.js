// src/components/RelatedCarousel/index.jsx
import React, { useRef, useMemo } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

/**
 * RelatedCarousel
 * props:
 *  - items: array of { slug, title, image, categoria|category, excerpt? }
 *  - renderCard: optional function(item) => ReactNode (custom card)
 *  - title: optional string
 *  - maxItems: optional number
 */
export default function RelatedCarousel({ items = [], renderCard = null, title = "Relacionados", maxItems = 12 }) {
  const swiperRef = useRef(null);

  const effective = useMemo(() => {
    if (!Array.isArray(items)) return [];
    const seen = new Set();
    const out = [];
    for (const it of items) {
      const key = String(it?.slug || it?.id || it?.title || JSON.stringify(it)).trim().toLowerCase();
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(it);
      if (out.length >= maxItems) break;
    }
    return out;
  }, [items, maxItems]);

  const loopedSlides = Math.max(Math.min(effective.length, 12), 1);

  if (!effective.length) return null;

  const prev = () => swiperRef.current?.slidePrev();
  const next = () => swiperRef.current?.slideNext();

  return (
    <Wrap aria-label={title}>
      <Header>
        <h3>{title}</h3>
        <Controls>
          <Arrow onClick={prev} aria-label="Anterior">‹</Arrow>
          <Arrow onClick={next} aria-label="Próximo">›</Arrow>
        </Controls>
      </Header>

      <SwiperBox>
        <Swiper
          modules={[Autoplay, A11y, Navigation]}
          onSwiper={(s) => (swiperRef.current = s)}
          loop={effective.length > 1}
          loopedSlides={loopedSlides}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={520}
          spaceBetween={14}
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
          {effective.map((item, idx) => (
            <SwiperSlide key={`${item.slug || item.title || idx}`} style={{ height: "100%" }}>
              {renderCard ? (
                <div style={{ height: "100%" }}>{renderCard(item)}</div>
              ) : (
                <DefaultCard to={`/viagens/${(item.categoria || item.category) || "nacionais"}/${encodeURIComponent(item.slug || item.id || slugify(item.title || ""))}`}>
                  <Thumb style={{ backgroundImage: `url(${item.image || "/placeholder-16x9.png"})` }} role="img" aria-label={item.title} />
                  <CardBody>
                    <SmallMeta>{(item.categoria || item.category || "").toUpperCase()}</SmallMeta>
                    <CardTitle>{item.title}</CardTitle>
                    <CardExcerpt>{truncate(item.excerpt || item.shortDescription || "", 120)}</CardExcerpt>
                  </CardBody>
                </DefaultCard>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperBox>
    </Wrap>
  );
}

/* ---------------- helpers ---------------- */

function slugify(s = "") {
  return String(s || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

function truncate(str = "", n = 120) {
  const plain = String(str || "").replace(/<[^>]+>/g, "").trim();
  if (!plain) return "";
  if (plain.length <= n) return plain;
  return plain.slice(0, n - 1).trim() + "…";
}

/* ---------------- styles ---------------- */

const Wrap = styled.section`
  margin-top: 1.25rem;
`;

const Header = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom: .6rem;
`;

const Controls = styled.div`
  display:flex;
  gap:.5rem;
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
  font-size:1.1rem;
  &:hover{ transform:scale(1.03); background:${({theme})=>theme.colors?.primary || "#2a9d8f"}; color:#fff; }
  @media(max-width:900px){ display:none; }
`;

const SwiperBox = styled.div`
  .swiper-slide { height:100%; display:flex; align-items:stretch; }
`;

const DefaultCard = styled(Link)`
  display:flex;
  flex-direction:column;
  gap:.6rem;
  background:${({theme})=>theme.colors?.surface || "#fff"};
  border-radius:10px;
  overflow:hidden;
  text-decoration:none;
  color:inherit;
  min-height:220px;
  box-shadow: ${({theme})=>theme.shadow?.sm || "0 4px 12px rgba(0,0,0,0.04)"};
  transition: transform .12s ease, box-shadow .12s ease;
  &:hover{ transform: translateY(-6px); box-shadow: ${({theme})=>theme.shadow?.lg || "0 10px 28px rgba(0,0,0,0.08)"}; }
`;

const Thumb = styled.div`
  width:100%;
  height:120px;
  background-size:cover;
  background-position:center;
  flex-shrink:0;
`;

const CardBody = styled.div`
  padding:.8rem;
  display:flex;
  flex-direction:column;
  gap:.4rem;
  flex:1 1 auto;
`;

const SmallMeta = styled.span`
  font-size:.72rem;
  color:${({theme})=>theme.colors?.secondaryDark || "#777"};
  font-weight:700;
`;

const CardTitle = styled.h4`
  margin:0;
  font-size: 0.98rem;
  color:${({theme})=>theme.colors?.primaryDark || "#163d35"};
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;

const CardExcerpt = styled.p`
  margin:0;
  font-size:.9rem;
  color:${({theme})=>theme.colors?.text || "#444"};
  opacity:.95;
  flex:1 1 auto;
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;
