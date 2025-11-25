// src/components/Product/MiniProductSticky.jsx
import React from "react";
import styled from "styled-components";

export default function MiniProductSticky({ product }) {
  if (!product) return null;

  const onClick = () => {
    if (window.gtag) {
      window.gtag("event", "click_affiliate", { event_category: "affiliate", event_label: product.name });
    }
  };

  return (
    <Sticky role="complementary" aria-label="Produto recomendado">
      <img src={product.image || "/placeholder-1x1.png"} alt={product.name} loading="lazy" />
      <div>
        <strong>{product.name}</strong>
        {product.price && <Price>€ {product.price}</Price>}
        <a href={product.link} target="_blank" rel="noopener noreferrer" onClick={onClick}>Ver produto</a>
      </div>
    </Sticky>
  );
}

const Sticky = styled.aside`
  position: sticky;
  top: 120px;
  width: 220px;
  padding: 0.6rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display:flex;
  gap:0.6rem;
  align-items:center;
  img { width:56px; height:56px; object-fit:cover; border-radius:8px; }
  strong { display:block; font-size:0.95rem; margin-bottom: .2rem; color: ${({theme}) => theme.colors.primaryDark}; }
  a { display:inline-block; margin-top: .35rem; background: ${({theme}) => theme.colors.primary}; color:white; padding:.35rem .6rem; border-radius:8px; text-decoration:none; font-weight:700}
  @media(max-width:980px){ display:none; }
`;
const Price = styled.div`font-weight:700;color:${({theme}) => theme.colors.primary};margin-top:.2rem;font-size:0.95rem`;
