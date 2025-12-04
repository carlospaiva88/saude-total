// src/components/Sidebar/SidebarWidgets.jsx
import React from "react";
import styled from "styled-components";
import EbookCard from "../../components/Shared/EbookCard";
import SocialShare from "../../components/Shared/SocialShare";

export default function SidebarWidgets({ recipe, related = [] }) {
  return (
    <Column>
      {/* pequeno share (mobile / duplicado) */}
      <Widget>
        <WidgetTitle>Compartilhar</WidgetTitle>
        <SocialShare url={typeof window !== "undefined" ? window.location.href : ""} title={recipe?.titulo} vertical={false} />
      </Widget>

      {/* Ebook / newsletter */}
      <Widget>
        <WidgetTitle>Ganhe o nosso ebook</WidgetTitle>
        <EbookCard href="/ebooks/viva_no_flow.pdf" title="Ebook: Receitas que Transformam" subtitle="Receitas fáceis e produtivas" cta="Baixar grátis" />
      </Widget>


      {/* tags / categorias */}
      <Widget>
        <WidgetTitle>Tags</WidgetTitle>
        <Tags>
          {Array.from(new Set((related.map(r => r.categoria || r.category) || []).filter(Boolean))).slice(0, 8).map(t => (
            <Tag key={t} href={`/receitas/categoria/${String(t).toLowerCase()}`}>{t}</Tag>
          ))}
        </Tags>
      </Widget>

      {/* anúncio / afiliado (placeholder) */}
      <Widget>
        <WidgetTitle>Oferta</WidgetTitle>
        <AdBox>
          <strong>Promoção</strong>
          <p>Confira nossa seleção com desconto — perfeito para essa receita.</p>
          <a href="https://amzn.to" target="_blank" rel="noopener noreferrer">Ver oferta</a>
        </AdBox>
      </Widget>
    </Column>
  );
}

const Column = styled.div`display:flex;flex-direction:column;gap:1rem;position:sticky;top:120px;align-self:start`;
const Widget = styled.div`background:${({theme})=>theme.colors.surface};padding:0.8rem;border-radius:10px;box-shadow:${({theme})=>theme.shadow.xs}`;
const WidgetTitle = styled.h4`margin:0 0 .5rem 0;color:${({theme})=>theme.colors.primaryDark};font-size:1rem`;
const Tags = styled.div`display:flex;flex-wrap:wrap;gap:0.4rem`;
const Tag = styled.a`background:${({theme})=>theme.colors.surfaceAlt || "#f1f1f1"};padding:.35rem .6rem;border-radius:999px;text-decoration:none;color:${({theme})=>theme.colors.primary};font-weight:600;font-size:.85rem`;
const AdBox = styled.div`padding:.6rem;border-radius:8px;background:linear-gradient(180deg,rgba(42,157,143,0.06),transparent);strong{display:block;margin-bottom:.4rem}`;
