import React from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CardBase, CardImage, CardBody } from "../CardBase/cardBase";


const destaques = [
  {
    title: "Rio de Janeiro, Brasil",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    slug: "rio-de-janeiro",
    type: "nacionais",
  },
  {
    title: "Serra Gaúcha, Brasil",
    image: "https://images.pexels.com/photos/15241362/pexels-photo-15241362.jpeg",
    slug: "serra-gaucha",
    type: "nacionais",
  },
  {
    title: "Chapada dos Veadeiros, Brasil",
    image: "https://images.pexels.com/photos/30135393/pexels-photo-30135393.jpeg",
    slug: "chapada-dos-veadeiros",
    type: "nacionais",
  },
  {
    title: "Paris, França",
    image: "https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg",
    slug: "paris-franca",
    type: "internacionais",
  },
  {
    title: "Lisboa, Portugal",
    image: "https://images.pexels.com/photos/1559908/pexels-photo-1559908.jpeg",
    slug: "lisboa-portugal",
    type: "internacionais",
  },
  {
    title: "Bali, Indonésia",
    image: "https://images.pexels.com/photos/1643130/pexels-photo-1643130.jpeg",
    slug: "bali-indonesia",
    type: "internacionais",
  },
  {
    title: "Maldivas",
    image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
    slug: "maldivas",
    type: "internacionais",
  },
  {
    title: "Fernando de Noronha",
    image: "https://images.pexels.com/photos/12271415/pexels-photo-12271415.jpeg",
    slug: "fernando-de-noronha",
    type: "nacionais",
  },
  {
    title: "Tulum, México",
    image: "https://images.pexels.com/photos/3822155/pexels-photo-3822155.jpeg",
    slug: "tulum-mexico",
    type: "internacionais",
  },
  {
    title: "Kyoto, Japão",
    image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
    slug: "kyoto-japao",
    type: "internacionais",
  },
];



export default function DestinosDestaque() {
  const scrollRef = useRef();
  const navigate = useNavigate();
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <Wrapper>
      <h2>🌎 Destinos em Destaque</h2>
      <CarouselContainer>
        <ArrowButtonLeft onClick={() => scroll("left")} aria-label="Scroll left"><FiChevronLeft /></ArrowButtonLeft>
        <Carousel ref={scrollRef}>
          {destaques.map((destino) => (
            <ThumbCard key={destino.slug} onClick={() => navigate(`/viagens/${destino.type}/${destino.slug}`)} role="button" tabIndex={0}>
              <CardBase>
                <CardImage src={destino.image} alt={destino.title} loading="lazy" />
                <CardBody style={{ padding: 0 }}>
                  <Overlay>
                    <h3>{destino.title}</h3>
                  </Overlay>
                </CardBody>
              </CardBase>
            </ThumbCard>
          ))}
        </Carousel>
        <ArrowButtonRight onClick={() => scroll("right")} aria-label="Scroll right"><FiChevronRight /></ArrowButtonRight>
      </CarouselContainer>
    </Wrapper>
  );
}

/* styled (apenas os trechos relevantes) */
const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: 4rem 2rem 2rem;
  position: relative;
  text-align: center;
  h2 { font-size: 2rem; font-weight:700; color: ${({ theme }) => theme.colors.primary}; margin-bottom: 2rem; }
`;

const CarouselContainer = styled.div` position: relative; display:flex; align-items:center; `;
const Carousel = styled.div`
  display:flex;
  overflow-x:auto;
  scroll-behavior:smooth;
  gap:1.5rem;
  padding: 0 1rem;
  scrollbar-width:none;
  &::-webkit-scrollbar{display:none;}
`;
const ThumbCard = styled.div`
  min-width: 260px;
  height: 220px;
  flex-shrink: 0;
  cursor: pointer;
  display:block;
  outline: none;
`;
const Overlay = styled.div`
  position: absolute;
  left:0; right:0; bottom:0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
  color: white;
  h3 { margin:0; font-size:1.1rem; font-weight:600; }
`;
const ArrowButtonLeft = styled.button` position:absolute; left:0; z-index:5; /* ... */ `;
const ArrowButtonRight = styled(ArrowButtonLeft)` right:0; left:auto; `;
