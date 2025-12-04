// src/components/Product/ProductRecommended.jsx
import React from "react";
import styled from "styled-components";

export default function ProductRecommended({ product }) {
  if (!product) return null;

  const onClick = () => {
    if (window.gtag) {
      window.gtag("event", "click_affiliate", {
        event_category: "affiliate",
        event_label: product.name,
        value: product.price || 0,
      });
    }
  };

  return (
    <Card>
      <Thumb>
        <img src={product.image || "/placeholder-4x3.png"} alt={product.name} loading="lazy" />
      </Thumb>
      <Info>
        <Name>{product.name}</Name>
        {product.price && <Price>€ {product.price}</Price>}
        {product.bullets && (
          <ul>
            {product.bullets.slice(0, 3).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
        <Actions>
          <Primary href={product.link} target="_blank" rel="noopener noreferrer" onClick={onClick}>Conhecer</Primary>
          <Secondary onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>Ver comentários</Secondary>
        </Actions>
        <FooterNote>
          <small>⭐ {product.rating || "4.6"} • {product.reviews || 120} avaliações</small>
        </FooterNote>
      </Info>
    </Card>
  );
}

const Card = styled.div`
  display:flex;
  gap:0.9rem;
  background: ${({theme}) => theme.colors.surface};
  border-radius: 12px;
  padding: 0.9rem;
  box-shadow: ${({theme})=>theme.shadow.xs};
  align-items: flex-start;
`;

const Thumb = styled.div`width:120px; height:80px; flex:0 0 120px; overflow:hidden; border-radius:8px; img{ width:100%; height:100%; object-fit:cover }`;
const Info = styled.div`flex:1; display:flex; flex-direction:column; gap:0.45rem;`;
const Name = styled.div`font-weight:700; color:${({theme})=>theme.colors.primaryDark}`;
const Price = styled.div`color:${({theme})=>theme.colors.primary}; font-weight:800`;
const Actions = styled.div`display:flex; gap:0.5rem; margin-top:auto;`;
const Primary = styled.a`background:${({theme})=>theme.colors.primary}; color:white; padding:.45rem .8rem; border-radius:999px; text-decoration:none; font-weight:700`;
const Secondary = styled.button`background:transparent; border:1px solid ${({theme})=>theme.colors.border}; padding:.45rem .8rem; border-radius:8px; cursor:pointer`;
const FooterNote = styled.div`margin-top:.35rem; color:${({theme})=>theme.colors.secondaryDark}; font-size:0.9rem;`;
