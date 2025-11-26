// src/components/Viagens/DestinosDestaque.jsx
import React, { useRef } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CardBase, CardImage, CardBody } from "../CardBase/cardBase";

const destaques = [
  { title: "Rio de Janeiro, Brasil", image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg", slug:"rio-de-janeiro", type:"nacionais" },
  { title: "Serra Gaúcha, Brasil", image: "https://images.pexels.com/photos/15241362/pexels-photo-15241362.jpeg", slug:"serra-gaucha", type:"nacionais" },
  { title: "Chapada dos Veadeiros, Brasil", image: "https://images.pexels.com/photos/30135393/pexels-photo-30135393.jpeg", slug:"chapada-dos-veadeiros", type:"nacionais" },
  { title: "Paris, França", image: "https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg", slug:"paris-franca", type:"internacionais" },
  { title: "Lisboa, Portugal", image: "https://images.pexels.com/photos/1559908/pexels-photo-1559908.jpeg", slug:"lisboa-portugal", type:"internacionais" },
];

export default function DestinosDestaque() {
  const ref = useRef();
  const navigate = useNavigate();

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <Wrapper>
      <h2>🌎 Destinos em Destaque</h2>
      <TrackWrap>
        <Nav left onClick={() => scroll("left")} aria-label="Scroll left"><FiChevronLeft /></Nav>
        <Track ref={ref}>
          {destaques.map(d => (
            <Thumb key={d.slug} onClick={() => navigate(`/viagens/${d.type}/${d.slug}`)}>
              <CardBase>
                <CardImage src={d.image} alt={d.title} loading="lazy" />
                <CardBody style={{ padding: 0 }}>
                  <Overlay><h3>{d.title}</h3></Overlay>
                </CardBody>
              </CardBase>
            </Thumb>
          ))}
        </Track>
        <Nav onClick={() => scroll("right")} aria-label="Scroll right"><FiChevronRight /></Nav>
      </TrackWrap>
    </Wrapper>
  );
}

/* styles */
const Wrapper = styled.section`padding: 2.5rem 2rem;`;
const TrackWrap = styled.div`position:relative; display:flex; align-items:center;`;
const Track = styled.div`display:flex; gap:1rem; overflow-x:auto; padding:0 1rem; scrollbar-width:none; &::-webkit-scrollbar{display:none;}`;
const Thumb = styled.div`min-width:320px; cursor:pointer;`;
const Nav = styled.button`background:rgba(0,0,0,0.14); color:white; width:44px; height:44px; border-radius:50%; border:none; display:flex; align-items:center; justify-content:center; margin:0 8px;`;
const Overlay = styled.div`position:absolute; left:0; right:0; bottom:0; padding: .8rem; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent); color:white; h3{margin:0;font-size:1rem;}`;
