// src/components/BlogPage/CategoryCarousel.js
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function CategoryCarousel({ categories = [] }) {
  const swiperRef = useRef(null);

  if (!categories || categories.length === 0) return null;

  const slidePrev = () => swiperRef.current?.slidePrev();
  const slideNext = () => swiperRef.current?.slideNext();

  return (
    <CatWrapper aria-label="Carrossel de categorias">
      <Header>
        <h3>Categorias</h3>
        <Controls>
          <NavButton onClick={slidePrev} aria-label="Anterior">
            ‹
          </NavButton>
          <NavButton onClick={slideNext} aria-label="Próximo">
            ›
          </NavButton>
        </Controls>
      </Header>

      <Swiper
        modules={[Navigation, A11y]}
        onSwiper={(s) => (swiperRef.current = s)}
        navigation={false}
        loop={true}
        speed={600}
        spaceBetween={18}
        slidesPerView={1.05}
        breakpoints={{
          420: { slidesPerView: 1.2 },
          640: { slidesPerView: 1.4 },
          900: { slidesPerView: 2.2 },
          1200: { slidesPerView: 3 },
        }}
        a11y={{ prevSlideMessage: "Anterior", nextSlideMessage: "Próximo" }}
        style={{ paddingBottom: 8 }}
      >
        {categories.map((c) => (
          <SwiperSlide key={c.id} style={{ width: "auto" }}>
            <CatCard
              to={`/blog/${encodeURIComponent(c.id)}`}
              aria-label={`Categoria ${c.name}`}
            >
              <CatThumb
                style={{ backgroundImage: `url(${c.image})` }}
                role="img"
                aria-label={`Categoria ${c.name}`}
              />
              <CatOverlay>
                <h4>{c.name}</h4>
                <p>Conteúdos sobre {c.name.toLowerCase()} para seu bem-estar.</p>
              </CatOverlay>
            </CatCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </CatWrapper>
  );
}

/* ----- estilos locais ----- */

const CatWrapper = styled.section`
  margin-bottom: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primaryDark};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.03);
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

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
  height: 100%;
  width: 320px; /* largura constante por slide */
`;

const CatThumb = styled.div`
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const CatOverlay = styled.div`
  margin-top: 0.6rem;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.03) 100%);
  padding: 0.6rem;
  border-radius: 8px;

  h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.secondaryDark};
    opacity: 0.95;
  }
`;
