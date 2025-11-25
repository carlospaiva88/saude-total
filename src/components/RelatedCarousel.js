import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./Receitas/RecipeCard";

export default function RelatedCarousel({ items = [], renderCard }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  if (!items || items.length === 0) return null;

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const amount = container.clientWidth * 0.8;
    container.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <Wrapper>
      <Title>Você também pode gostar</Title>

      <CarouselArea>
        <FadeLeft />
        <FadeRight />

        <ArrowLeft onClick={() => scroll("left")}>‹</ArrowLeft>
        <ArrowRight onClick={() => scroll("right")}>›</ArrowRight>

        <Inner ref={scrollRef}>
          {items.map((item) => (
            <Slide key={item.slug || item.id}>
              <Clickable
                onClick={() => navigate(`/receitas/${encodeURIComponent(item.slug)}`)}
              >
                {renderCard ? renderCard(item) : <RecipeCard recipe={item} />}
              </Clickable>
            </Slide>
          ))}
        </Inner>
      </CarouselArea>
    </Wrapper>
  );
}

/* ---------------- STYLES ---------------- */

const Wrapper = styled.div`
  margin: 3rem 0 2rem;
  position: relative;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const CarouselArea = styled.div`
  position: relative;
  padding: 0 2rem;
`;

const Inner = styled.div`
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 8px;
  scroll-behavior: smooth;

  /* remove scrollbars visualmente */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.div`
  min-width: 260px;
  scroll-snap-align: start;
  flex: 0 0 auto;
`;

const Clickable = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
`;

/* --- Fade nas laterais para "profissional" --- */
const FadeLeft = styled.div`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to right, ${({ theme }) => theme.colors.background} 40%, transparent);
`;

const FadeRight = styled(FadeLeft)`
  left: auto;
  right: 0;
  background: linear-gradient(to left, ${({ theme }) => theme.colors.background} 40%, transparent);
`;

/* --- Setas premium --- */
const ArrowBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primaryDark};

  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(6px);

  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    transform: translateY(-50%) scale(1.07);
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const ArrowLeft = styled(ArrowBase)`
  left: 0;
`;

const ArrowRight = styled(ArrowBase)`
  right: 0;
`;
