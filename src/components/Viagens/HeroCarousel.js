// src/components/Viagens/HeroCarousel.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const slides = [
  { title: "Santorini, Grécia", image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg", slug: "santorini-grecia", categoria: "internacionais" },
  { title: "Kyoto, Japão", image: "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg", slug: "kyoto-japao", categoria: "internacionais" },
  { title: "Bali, Indonésia", image: "https://images.pexels.com/photos/1643130/pexels-photo-1643130.jpeg", slug: "bali-indonesia", categoria: "internacionais" },
  { title: "Lisboa, Portugal", image: "https://images.pexels.com/photos/1187520/pexels-photo-1187520.jpeg", slug: "lisboa-portugal", categoria: "internacionais" },
  { title: "Chapada dos Veadeiros, Brasil", image: "https://images.pexels.com/photos/30135393/pexels-photo-30135393.jpeg", slug: "chapada-dos-veadeiros", categoria: "nacionais" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % length), 5500);
    return () => clearInterval(t);
  }, [length]);

  const prev = () => setCurrent((c) => (c - 1 + length) % length);
  const next = () => setCurrent((c) => (c + 1) % length);

  return (
    <Container>
      <Arrow onClick={prev} left aria-label="Anterior"><FiChevronLeft /></Arrow>
      <Arrow onClick={next} aria-label="Próximo"><FiChevronRight /></Arrow>

      {slides.map((s, i) => (
        <Slide key={s.slug} active={i === current}>
          <img src={s.image} alt={s.title} loading="lazy" />
          <Gradient />
          <Overlay>
            <h2 onClick={() => navigate(`/viagens/${s.categoria}/${s.slug}`)}>{s.title}</h2>
            <p>Descubra o melhor deste destino — roteiro, dicas e como aproveitar ao máximo.</p>
            <HeroButton onClick={() => navigate(`/viagens/${s.categoria}/${s.slug}`)}>Ver destino</HeroButton>
          </Overlay>
        </Slide>
      ))}
    </Container>
  );
}

/* styles */
const Container = styled.div`position:relative; width:100%; height:60vh; overflow:hidden;`;
const Slide = styled.div`
  position:absolute; inset:0; opacity:${({active})=>active?1:0}; transition:opacity 1s ease;
  img{width:100%; height:100%; object-fit:cover; filter: brightness(${({active})=>active?0.7:0.6}); transform: scale(${({active})=>active?1:1.02}); transition:transform 1.6s ease;}
`;
const Gradient = styled.div`position:absolute; inset:0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%);`;
const Overlay = styled.div`position:absolute; left:6%; bottom:12%; color:white; max-width:520px; h2{font-size:2.6rem;margin:0;} p{opacity:.95;margin:.6rem 0 1rem;}`;
const Arrow = styled.button`
  position:absolute; top:50%; transform:translateY(-50%); z-index:6; background:rgba(0,0,0,0.36); border:none; color:white; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;
  left:${({left})=>left?16:"auto"}; right:${({left})=>left?"auto":16};
  &:hover{background:rgba(0,0,0,0.6);}
`;
const HeroButton = styled.button`padding:.6rem 1rem; border:none; border-radius:8px; background: ${({theme})=>theme.colors?.primary||"#2a9d8f"}; color:white; font-weight:700; cursor:pointer;`;
