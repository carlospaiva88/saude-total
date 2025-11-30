// src/components/BlogPage/BlogHome.styles.js
import styled from "styled-components";
import { Link } from "react-router-dom";

/* ---------------- Hero / layout ---------------- */
export const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2.5rem;
  padding: 1.6rem;
  background: ${({ theme }) => theme.gradients?.soft || "linear-gradient(#fff,#fafafa)"};
  border-radius: ${({ theme }) => theme.radius?.lg || "12px"};
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const HeroText = styled.div`
  h1 {
    font-size: 2.4rem;
    margin-bottom: 0.6rem;
    color: ${({ theme }) => theme.colors?.primaryDark || "#111"};
    font-family: ${({ theme }) => theme.fonts?.heading || "inherit"};
  }
  p {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.colors?.text || "#444"};
    margin-bottom: 1rem;
  }
`;

export const HeroImg = styled.img`
  width: 100%;
  max-height: 320px;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: ${({ theme }) => theme.radius?.md || "8px"};
  box-shadow: ${({ theme }) => theme.shadow?.sm || "0 2px 6px rgba(0,0,0,0.08)"};
  @media (max-width: 980px) {
    margin-top: 1rem;
    max-height: 220px;
  }
`;

export const Wrapper = styled.main`
  max-width: ${({ theme }) => theme.layout?.maxWidth || "1200px"};
  margin: 2.5rem auto;
  padding: 0 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors?.primaryDark || "#111"};
  margin: 1.75rem 0 1rem;
  text-align: center;
`;

/* ---------------- Category card styles (reusable) ---------------- */
export const CatCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  border-radius: ${({ theme }) => theme.radius?.md || "8px"};
  padding: 0.9rem;
  text-decoration: none;
  color: inherit;
  box-shadow: ${({ theme }) => theme.shadow?.sm || "0 1px 4px rgba(0,0,0,0.06)"};
  cursor: pointer;
  height: 100%;
  width: 320px;
`;

export const CatThumb = styled.div`
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow?.sm || "0 1px 4px rgba(0,0,0,0.06)"};
`;

export const CatOverlay = styled.div`
  margin-top: 0.6rem;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%);
  padding: .6rem;
  border-radius: 8px;
  h4 { margin:0; color: ${({ theme }) => theme.colors?.primaryDark || "#111"}; }
  p { margin:0; font-size:0.9rem; color: ${({ theme }) => theme.colors?.secondaryDark || "#666"}; opacity:0.95; }
`;

/* ---------------- Layout columns ---------------- */
export const TwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.25rem;
  margin-top: 1rem;

  @media (max-width: 980px) { 
    grid-template-columns: 1fr; 
  }
`;

export const Column = styled.div`
  flex: ${(p) => p.flex || 1};
`;

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 0.6rem;
  grid-auto-rows: 1fr;

  & > a, & > article, & > div { height: 100%; }

  @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 720px) { grid-template-columns: 1fr; }
`;

export const SideBox = styled.aside`
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius?.md || "8px"};
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 1px 3px rgba(0,0,0,0.04)"};
`;

export const PopularList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const SmallPopular = styled(Link)`
  display: flex;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
  align-items: center;
  img { 
    width: 72px; 
    height: 60px; 
    object-fit: cover; 
    border-radius: 8px; 
    flex-shrink: 0; 
  }
  div { display: flex; flex-direction: column; }
  strong { font-size: 0.95rem; color: ${({ theme }) => theme.colors?.primaryDark || "#111"}; }
  span { font-size: 0.85rem; color: ${({ theme }) => theme.colors?.text || "#444"}; opacity:0.9; }
`;

export const MiniRecipes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.6rem;
`;

export const MiniRecipe = styled(Link)`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  img { width: 64px; height: 56px; object-fit: cover; border-radius: 8px; }
  strong { font-size: 0.95rem; color: ${({ theme }) => theme.colors?.primaryDark || "#111"}; }
  small { font-size: 0.8rem; color: ${({ theme }) => theme.colors?.text || "#444"}; }
`;

export const Empty = styled.div`
  color: ${({ theme }) => theme.colors?.text || "#444"};
  opacity: 0.8;
  font-size: 0.95rem;
  padding: 0.6rem 0;
`;

export const Divider = styled.hr`
  margin: 1rem 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || "#eee"};
`;

export const ContinueSection = styled.section`
  margin-top: 2.5rem;
`;

export const TagsNewsletterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1rem;
  margin-top: 1.25rem;

  @media (max-width: 980px) { grid-template-columns: 1fr; }

  & > :last-child {
    align-self: start;
  }
`;

/* ---------------- UnifiedCarousel (cards) ---------------- */
export const UnifiedWrapper = styled.section`
  margin: 2rem 0;
`;

export const UnifiedHeader = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom: 1rem;
  gap: 1rem;
  h2 { margin: 0; color: ${({ theme }) => theme.colors?.primaryDark || "#111"}; }
  p { margin: 0; color: ${({ theme }) => theme.colors?.secondaryDark || "#666"}; font-size: .95rem; }
`;

export const Controls = styled.div`
  display:flex;
  gap: .5rem;
`;

export const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors?.border || "#e6e6e6"};
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  color: ${({ theme }) => theme.colors?.primaryDark || "#111"};
  font-size: 1.2rem;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition: transform .12s ease, background .12s ease;

  &:hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.colors?.primary || "#0b74ff"};
    color: ${({ theme }) => theme.colors?.surface || "#fff"};
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

/* Slide wrapper: guarantees stretch */
export const Slide = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  min-height: 320px;
  height: 100%;
  box-sizing: border-box;
`;

/* clickable link for the whole card */
export const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
`;

/* card base */
export const Card = styled.article.attrs(() => ({ className: "unified-card" }))`
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow?.sm || "0 2px 8px rgba(0,0,0,0.06)"};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  transition: transform .16s ease, box-shadow .16s ease;
  width: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow?.lg || "0 8px 30px rgba(0,0,0,0.08)"};
  }

  @media (max-width: 720px) {
    min-height: 280px;
  }
`;

export const Thumb = styled.div`
  width: 100%;
  height: 150px;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

export const CardBody = styled.div`
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1 1 auto;
`;

export const Badge = styled.span`
  display:inline-block;
  font-size: 0.75rem;
  padding: .24rem .48rem;
  border-radius: 999px;
  background: ${({ theme, type }) =>
    type === "product" ? "#FFF3E0" :
    type === "receita" ? "#E8F6EF" :
    type === "trip" ? "#E8F0FF" :
    "#F4F4F4"};
  color: ${({ theme }) => theme.colors?.primaryDark || "#111"};
  border: 1px solid ${({ theme }) => theme.colors?.border || "#eee"};
  width: fit-content;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: 1.02rem;
  color: ${({ theme }) => theme.colors?.primaryDark || "#111"};
  line-height: 1.18;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: calc(1.02rem * 1.18 * 2);
`;

export const CardExcerpt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  opacity: .95;

  /* garantir compatibilidade de clamp + fallback de altura fixa */
  line-height: 1.25rem; /* ajuste se necessário conforme fonte do seu tema */
  max-height: calc(1.25rem * 3); /* 3 linhas * line-height */
  height: calc(1.25rem * 3);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.4rem;
  flex: 0 0 auto; /* não expandir para forçar mesma altura entre cards */
`;

export const CardMeta = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors?.secondaryDark || "#666"};
`;

/* footer fixo no fundo do card */
export const CardFooter = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: .6rem;
  margin-top: auto; /* empurra footer para o fim do CardBody */
  flex-shrink: 0;
`;

/* CTA text */
export const ReadMore = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors?.primary || "#0b74ff"};
  font-weight:600;
`;

export const Price = styled.span`
  background: ${({ theme }) => theme.colors?.surfaceAlt || "#f5f5f5"};
  padding: .25rem .5rem;
  border-radius: 6px;
  font-weight:700;
  color: ${({ theme }) => theme.colors?.primaryDark || "#111"};
`;

/* active slide highlight */
export const SwiperActiveStyles = styled.div`
  .swiper-slide,
  .swiper-wrapper {
    height: 100%;
    align-items: stretch;
  }

  .swiper-slide-active .unified-card {
    transform: scale(1.03);
    box-shadow: ${({ theme }) => theme.shadow?.xl || "0 12px 40px rgba(0,0,0,0.10)"};
  }
`;


