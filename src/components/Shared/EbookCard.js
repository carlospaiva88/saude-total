// src/components/Ebook/EbookCard.jsx
import React from "react";
import styled from "styled-components";

export default function EbookCard({ title = "Ebook de Receitas", subtitle = "Receitas práticas e nutritivas", cta = "Baixar grátis", href = "/ebooks/viva_no_flow.pdf" }) {
  return (
    <Card role="region" aria-label="Ebook gratuito">
      <Art>
        <svg viewBox="0 0 80 80" width="72" height="72" aria-hidden>
          <rect x="6" y="10" width="68" height="60" rx="6" fill="#fff" opacity="0.06"/>
          <path d="M16 20h48v8H16z" fill="currentColor" opacity="0.12"/>
        </svg>
      </Art>

      <Body>
        <Title>{title}</Title>
        <Sub>{subtitle}</Sub>
        <Actions>
          <CTA href={href} target="_blank" rel="noopener noreferrer">{cta}</CTA>
          <Small>Sem custo • Formato PDF</Small>
        </Actions>
      </Body>
    </Card>
  );
}

const Card = styled.div`
  display:flex;
  gap:1rem;
  align-items:center;
  padding:1rem;
  background: linear-gradient(135deg, rgba(42,157,143,0.06), rgba(38,70,83,0.04));
  border-radius:12px;
  box-shadow: ${({theme}) => theme.shadow.xs};
  border: 1px solid ${({theme}) => theme.colors.border};
`;
const Art = styled.div`flex:0 0 auto; display:flex; align-items:center; justify-content:center; color: ${({theme}) => theme.colors.primary};`;
const Body = styled.div`flex:1;`;
const Title = styled.h4`margin:0; font-size:1.05rem; color:${({theme})=>theme.colors.primaryDark};`;
const Sub = styled.p`margin:0.35rem 0 0.5rem;color:${({theme})=>theme.colors.secondaryDark};font-size:.95rem`;
const Actions = styled.div`display:flex;flex-direction:column;gap:.5rem;align-items:flex-start;`;
const CTA = styled.a`
  background: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.surface};
  padding: .6rem 1rem;
  border-radius: 999px;
  text-decoration:none;
  font-weight:700;
  box-shadow: ${({theme}) => theme.shadow.xs};
`;
const Small = styled.small`color:${({theme})=>theme.colors.secondaryDark};`;
