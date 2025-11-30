// src/components/Viagens/DestinosDestaque.jsx
import React, { useRef, useMemo } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import viagensData from "../../data/viagens";
import { Link } from "react-router-dom";

/* --------------------- COMPONENTE PRINCIPAL --------------------- */

export default function DestinosDestaque({ title = "🌎 Destinos em Destaque", maxItems = 10 }) {
  const swiperRef = useRef();

  const viagens = useMemo(() => {
    const flat = Object.values(viagensData).flat().filter(Boolean);
    return dedupe(flat).slice(0, maxItems);
  }, [maxItems]);

  if (!viagens.length) return null;

  const prev = () => swiperRef.current?.slidePrev();
  const next = () => swiperRef.current?.slideNext();

  return (
    <Wrapper>
      <Header>
        <div>
          <H2>{title}</H2>
          <Sub>Escolha destinos inesquecíveis para sua próxima viagem.</Sub>
        </div>

        <Controls>
          <Arrow onClick={prev} aria-label="Anterior">‹</Arrow>
          <Arrow onClick={next} aria-label="Próximo">›</Arrow>
        </Controls>
      </Header>

      <SwiperBox>
        <Swiper
          modules={[Autoplay, A11y, Navigation]}
          onSwiper={(s) => (swiperRef.current = s)}
          loop={viagens.length > 1}
          loopedSlides={Math.max(Math.min(viagens.length, 10), 1)}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={600}
          spaceBetween={18}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1.05 },
            640: { slidesPerView: 1.3 },
            900: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
          }}
          style={{ paddingBottom: 12 }}
        >
          {viagens.map((v, i) => (
            <SwiperSlide key={v.slug + i}>
              <Card to={`/viagens/${v.category || v.categoria}/${v.slug}`}>
                <Thumb style={{ backgroundImage: `url(${v.image})` }} />
                <Body>
                  <Tag>{(v.category || v.categoria).toUpperCase()}</Tag>
                  <Title>{v.title}</Title>
                  <Excerpt>{truncate(v.shortDescription || v.excerpt || "", 140)}</Excerpt>
                </Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperBox>
    </Wrapper>
  );
}

/* --------------------- HELPERS --------------------- */

function truncate(str = "", max = 140) {
  const plain = str.replace(/<[^>]+>/g, "").trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max - 1).trim() + "…";
}

function normalize(s = "") {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function dedupe(list = []) {
  const seen = new Set();
  const out = [];
  for (const v of list) {
    const key = normalize(v.slug || v.title || JSON.stringify(v));
    if (!seen.has(key)) {
      seen.add(key);
      out.push(v);
    }
  }
  return out;
}

/* --------------------- STYLES --------------------- */

const Wrapper = styled.section`
  padding: 3rem 2rem;
`;

const Header = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:1rem;
  @media(max-width:720px){ flex-direction:column; align-items:flex-start; }
`;

const H2 = styled.h2`
  margin:0;
  font-size:1.4rem;
  color:${({theme})=>theme.colors?.primaryDark || "#163d35"};
`;
const Sub = styled.p`
  margin:0;
  font-size:0.95rem;
  color:${({theme})=>theme.colors?.secondaryDark || "#667"};
`;

const Controls = styled.div`
  display:flex;
  gap:0.5rem;
`;

const Arrow = styled.button`
  width:40px;
  height:40px;
  border-radius:999px;
  border:1px solid ${({theme})=>theme.colors?.border || "#ddd"};
  background:${({theme})=>theme.colors?.surface || "#fff"};
  color:${({theme})=>theme.colors?.primaryDark || "#163d35"};
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  font-size:1.2rem;
  &:hover{ background:${({theme})=>theme.colors?.primary || "#2a9d8f"}; color:#fff; transform:scale(1.05); }
  @media(max-width:900px){ display:none; }
`;

const SwiperBox = styled.div`
  .swiper-slide { height:100%; display:flex; align-items:stretch; }
`;

const Card = styled(Link)`
  display:flex;
  flex-direction:column;
  background:${({theme})=>theme.colors?.surface || "#fff"};
  overflow:hidden;
  border-radius:12px;
  text-decoration:none;
  color:inherit;
  height:100%;
  min-height:300px;
  box-shadow:${({theme})=>theme.shadow?.sm || "0 4px 12px rgba(0,0,0,0.04)"};
  transition: transform .12s ease, box-shadow .12s ease;
  &:hover{
    transform: translateY(-6px);
    box-shadow:${({theme})=>theme.shadow?.lg || "0 12px 28px rgba(0,0,0,0.1)"};
  }
`;

const Thumb = styled.div`
  width:100%;
  height:160px;
  background-size:cover;
  background-position:center;
`;

const Body = styled.div`
  padding:1rem;
  display:flex;
  flex-direction:column;
  gap:.5rem;
  flex:1 1 auto;
`;

const Tag = styled.span`
  font-size:.75rem;
  font-weight:700;
  color:${({theme})=>theme.colors?.primaryDark || "#163d35"};
  background:${({theme})=>theme.colors?.surfaceAlt || "#eef5f3"};
  padding:.2rem .6rem;
  border-radius:999px;
  width:fit-content;
`;

const Title = styled.h3`
  margin:0;
  font-size:1rem;
  color:${({theme})=>theme.colors?.primaryDark || "#163d35"};
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;

const Excerpt = styled.p`
  margin:0;
  font-size:.9rem;
  color:${({theme})=>theme.colors?.text || "#333"};
  opacity:.95;
  display:-webkit-box;
  flex:1 1 auto;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
`;
