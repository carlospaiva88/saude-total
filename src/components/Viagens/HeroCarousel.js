// src/components/Viagens/HeroCarousel.jsx
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/**
 * HeroCarousel (fix):
 * - evita sobreposição de slides interceptando cliques (pointer-events)
 * - arrows com z-index alto e funcionais
 * - área do slide clicável + acessível
 */

const slides = [
  { title: "Toquio, Japão", image: "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg", slug: "toquio", categoria: "internacionais" },
  { title: "Bali, Indonésia", image: "https://images.pexels.com/photos/1643130/pexels-photo-1643130.jpeg", slug: "bali-indonesia", categoria: "internacionais" },
  { title: "Lisboa, Portugal", image: "https://images.pexels.com/photos/1187520/pexels-photo-1187520.jpeg", slug: "lisboa-portugal", categoria: "internacionais" },
  { title: "Chapada Diamantina, Brasil", image: "https://images.pexels.com/photos/30135393/pexels-photo-30135393.jpeg", slug: "chapada-diamantina", categoria: "nacionais" },
];

function quickSlug(s = "") {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % length), 5500);
    return () => clearInterval(t);
  }, [length]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + length) % length), [length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % length), [length]);

  const goTo = useCallback(
    (s) => {
      if (!s) return;
      const cat = quickSlug(s.categoria || s.category || "destinos");
      const slug = quickSlug(s.slug || s.id || s.title || "");
      navigate(`/viagens/${encodeURIComponent(cat)}/${encodeURIComponent(slug)}`);
    },
    [navigate]
  );

  const onSlideKey = (e, s) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goTo(s);
    }
  };

  return (
    <Container>
      <Arrow left aria-label="Anterior" onClick={(e) => { e.stopPropagation(); prev(); }}>
        <FiChevronLeft />
      </Arrow>

      <Arrow aria-label="Próximo" onClick={(e) => { e.stopPropagation(); next(); }}>
        <FiChevronRight />
      </Arrow>

      {slides.map((s, i) => {
        const isActive = i === current;
        return (
          <Slide
            key={s.slug || s.title || i}
            active={isActive}
            role="link"
            tabIndex={isActive ? 0 : -1} // somente ativo é tabulável
            aria-label={`${s.title} — ver destino`}
            onClick={() => goTo(s)}
            onKeyDown={(e) => onSlideKey(e, s)}
            data-index={i}
          >
            <img src={s.image} alt={s.title} loading="lazy" />
            <Gradient />
            <Overlay aria-hidden={!isActive}>
              <h2>{s.title}</h2>
              <p>Descubra o melhor deste destino — roteiro, dicas e como aproveitar ao máximo.</p>
              <HeroButton
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(s);
                }}
                aria-label={`Ver destino ${s.title}`}
              >
                Ver destino
              </HeroButton>
            </Overlay>
          </Slide>
        );
      })}
    </Container>
  );
}

/* ---------------- Styles fixados ---------------- */

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
`;

/* Slides empilhados: somente o ativo recebe pointer-events e z-index maior */
const Slide = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 600ms ease, transform 600ms ease;
  transform: translateZ(0);
  z-index: ${({ active }) => (active ? 4 : 1)};
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  cursor: ${({ active }) => (active ? "pointer" : "default")};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(${({ active }) => (active ? 0.7 : 0.6)});
    transform: scale(${({ active }) => (active ? 1 : 1.02)});
    transition: transform 1.6s ease, filter 400ms ease;
  }
`;

/* gradiente e overlay */
const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
  pointer-events: none;
`;

const Overlay = styled.div`
  position: absolute;
  left: 6%;
  bottom: 12%;
  color: white;
  max-width: 520px;
  h2 {
    font-size: 2.6rem;
    margin: 0;
    line-height: 1.02;
    cursor: inherit;
  }
  p {
    opacity: 0.95;
    margin: 0.6rem 0 1rem;
  }
`;

/* arrows com z-index alto para sempre ficarem clicáveis */
const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999; /* ALTÍSSIMO! Nada passa por cima */
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(3px);

  left: ${({ left }) => (left ? "20px" : "auto")};
  right: ${({ left }) => (left ? "auto" : "20px")};

  &:hover {
    background: rgba(0, 0, 0, 0.75);
  }
`;

/* botão do hero */
const HeroButton = styled.button`
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors?.primary || "#2a9d8f"};
  color: white;
  font-weight: 700;
  cursor: pointer;
  &:focus {
    outline: 2px solid rgba(255,255,255,0.2);
  }
`;
