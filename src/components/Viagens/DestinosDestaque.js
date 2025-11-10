import React from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const destaques = [
  {
    title: "Rio de Janeiro, Brasil",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    slug: "rio-de-janeiro",
    type: "nacionais",
  },
  {
    title: "Serra Gaúcha, Brasil",
    image: "https://images.pexels.com/photos/22809319/pexels-photo-22809319.jpeg",
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
    const { current } = scrollRef;
    if (direction === "left") current.scrollBy({ left: -400, behavior: "smooth" });
    else current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <Wrapper>
      <h2>🌎 Destinos em Destaque</h2>
      <CarouselContainer>
        <ArrowButtonLeft onClick={() => scroll("left")}><FiChevronLeft /></ArrowButtonLeft>
        <Carousel ref={scrollRef}>
          {destaques.map((destino) => (
            <Card
              key={destino.slug}
              onClick={() => navigate(`/viagens/${destino.type}/${destino.slug}`)}
            >
              <img src={destino.image} alt={destino.title} />
              <CardOverlay>
                <h3>{destino.title}</h3>
              </CardOverlay>
            </Card>
          ))}
        </Carousel>
        <ArrowButtonRight onClick={() => scroll("right")}><FiChevronRight /></ArrowButtonRight>
      </CarouselContainer>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: 4rem 2rem 2rem;
  position: relative;
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 2rem;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 1.5rem;
  padding: 0 2rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  position: relative;
  min-width: 260px;
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.5s ease;
  }

  &:hover img {
    filter: brightness(80%);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  text-align: left;

  h3 {
    font-size: 1.1rem;
    margin: 0;
    font-weight: 600;
  }
`;

const ArrowButtonLeft = styled.button`
  position: absolute;
  left: 0;
  z-index: 5;
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 50%;
  font-size: 1.8rem;
  cursor: pointer;
  height: 45px;
  width: 45px;
  transition: 0.3s;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const ArrowButtonRight = styled(ArrowButtonLeft)`
  right: 0;
  left: auto;
`;
