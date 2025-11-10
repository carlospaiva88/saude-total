import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Santorini, Grécia",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
    slug: "santorini-grecia",
  },
  {
    title: "Kyoto, Japão",
    image: "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg",
    slug: "kyoto-japao",
  },
  {
    title: "Bali, Indonésia",
    image: "https://images.pexels.com/photos/34659743/pexels-photo-34659743.jpeg",
    slug: "bali-indonesia",
  },
  {
    title: "Lisboa, Portugal",
    image: "https://images.pexels.com/photos/1187520/pexels-photo-1187520.jpeg",
    slug: "lisboa-portugal",
  },
  {
    title: "Paris, França",
    image: "https://images.pexels.com/photos/161901/paris-sunset-france-monument-161901.jpeg",
    slug: "paris-franca",
  },
  {
    title: "Chapada dos Veadeiros, Brasil",
    image: "https://images.pexels.com/photos/32788350/pexels-photo-32788350.jpeg",
    slug: "chapada-dos-veadeiros",
  },
  {
    title: "Serra Gaúcha, Brasil",
    image: "https://images.pexels.com/photos/27638225/pexels-photo-27638225.jpeg",
    slug: "serra-gaucha",
  },
  {
    title: "Fernando de Noronha, Brasil",
    image: "https://images.pexels.com/photos/24963033/pexels-photo-24963033.jpeg",
    slug: "fernando-de-noronha",
  },
  {
    title: "Tulum, México",
    image: "https://images.pexels.com/photos/2631613/pexels-photo-2631613.jpeg",
    slug: "tulum-mexico",
  },
  {
    title: "Maldivas",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    slug: "maldivas",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <CarouselContainer>
      <ArrowLeft onClick={prevSlide}><FiChevronLeft /></ArrowLeft>
      <ArrowRight onClick={nextSlide}><FiChevronRight /></ArrowRight>

      {slides.map((slide, index) => (
        <Slide key={index} active={index === current}>
          <img src={slide.image} alt={slide.title} />
          <Gradient />
          <Overlay>
            <h1 onClick={() => navigate(`/viagens/${slide.slug}`)}>
              {slide.title}
            </h1>
          </Overlay>
        </Slide>
      ))}
    </CarouselContainer>
  );
}

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: scale(${({ active }) => (active ? 1 : 1.05)});
  transition: opacity 1.3s ease-in-out, transform 2s ease;
  z-index: ${({ active }) => (active ? 1 : 0)};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(70%) blur(${({ active }) => (active ? "0px" : "4px")});
    transition: filter 1.5s ease;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 70%);
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 15%;
  left: 10%;
  color: white;
  cursor: pointer;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    text-shadow: 0px 4px 12px rgba(0,0,0,0.6);
    transition: transform 0.3s ease, color 0.3s;
  }

  h1:hover {
    color: #ffd700;
    transform: translateX(5px);
  }
`;

const ArrowLeft = styled.button`
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  transition: 0.3s;
  padding: 0.5rem;

  &:hover {
    background: rgba(255,255,255,0.4);
    color: black;
  }
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 2%;
`;
