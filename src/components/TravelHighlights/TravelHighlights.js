// src/components/TravelHighlights/TravelHighlights.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Reaproveitamos o CardBase compartilhado (padroniza visual e comportamento)
import {
  CardBase,
  CardImage as BaseCardImage,
  CardBody as BaseCardBody,
  CardTitle as BaseCardTitle,
  CardDescription as BaseCardDescription,
  CardButton as BaseCardButton,
  CardSticker as BaseCardSticker
} from "../CardBase/cardBase";

/**
 * TravelHighlights
 * - Usa CardBase para padronizar com Recipes/Articles/Products
 * - Badge no canto superior: nacional / internacional
 * - Imagem com fallback
 * - Botão usa Link (navegação SPA)
 * - Texto truncado para manter grid consistente
 */

export default function TravelHighlights({ travels = {} }) {
  
  const { nacionais = [], internacionais = [] } = travels;

  const renderList = (list) =>
    list.map((t) => {
      const img = t.image || t.imagem || "/placeholder-4x3.png";
      const title = t.title || t.titulo || t.name || "Destino";
      const desc = t.shortDescription || t.description || t.excerpt || "";

   
      return (
        <Card key={t.slug || t.id} as={CardBase} aria-labelledby={`travel-${t.slug}-title`}>
          <TopSticker aria-hidden>
            {t.category === "nacionais" ? "🇧🇷 Nacional" : "🌍 Internacional"}
          </TopSticker>

          <ImgWrapper>
            <Img
              src={img}
              alt={title}
              loading="lazy"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder-4x3.png"; }}
            />
          </ImgWrapper>

          <CardBody>
            <CardTitle id={`travel-${t.slug}-title`}>{title}</CardTitle>
            {desc ? <CardDescription>{desc}</CardDescription> : null}

            <CardFooter>
              <ViewButton as={Link} to={`/viagens/${encodeURIComponent(t.category || t.type || "geral")}/${encodeURIComponent(t.slug || t.id)}`}>
                Ver Detalhes
              </ViewButton>

             
            </CardFooter>
          </CardBody>
        </Card>
      );
    });

  return (
    <Section id="destaque-viagens" aria-labelledby="viagens-title">
      <SectionInner>
        <SectionTitle id="viagens-title">Destinos em destaque</SectionTitle>

        {nacionais.length > 0 && (
          <>
            <GroupTitle>Nacionais</GroupTitle>
            <CardsGrid>{renderList(nacionais)}</CardsGrid>
          </>
        )}

        {internacionais.length > 0 && (
          <>
            <GroupTitle>Internacionais</GroupTitle>
            <CardsGrid>{renderList(internacionais)}</CardsGrid>
          </>
        )}

        {/* fallback caso não haja itens */}
        {nacionais.length === 0 && internacionais.length === 0 && (
          <EmptyBox>
            <p>Sem destinos para exibir no momento.</p>
            <small>Volte mais tarde ou confira nossa seção de viagens.</small>
          </EmptyBox>
        )}
      </SectionInner>
    </Section>
  );
}

/* ---------------- Styled (component-scoped) ---------------- */

const Section = styled.section`
  padding: 3rem 1.25rem;
  background: ${({ theme }) => theme.colors?.backgroundAlt || "#f8fcfb"};
`;

const SectionInner = styled.div`
  max-width: ${({ theme }) => theme.layout?.maxWidth || "1100px"};
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(1.4rem, 2.4vw, 2rem);
  color: ${({ theme }) => theme.colors?.primaryDark || "#264653"};
  margin-bottom: 1.5rem;
`;

const GroupTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors?.primary || "#2a6f61"};
  margin: 1.75rem 0 1rem;
`;

/* Grid */
const CardsGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

/* CardBase wrapper (adiciona posição relativa para sticker) */
const Card = styled.article`
  position: relative;
`;

/* Sticker (reaproveita estilo visual do CardSticker, mas dentro deste arquivo garantimos contraste) */
const TopSticker = styled(BaseCardSticker)`
  top: 12px;
  left: 12px;
  font-size: 0.85rem;
  padding: 0.25rem 0.65rem;
`;

/* Imagem (envolve o CardBase image para garantir altura fixa) */
const ImgWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border || "#e9f5f2"};
  display:flex;
  align-items:center;
  justify-content:center;

  @media (min-width: 1100px) { height: 200px; }
`;

const Img = styled(BaseCardImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
`;

/* usamos CardBody reutilizável do CardBase, mas aqui fazemos um pequeno wrapper para garantir espaçamento */
const CardBody = styled(BaseCardBody)`
  display:flex;
  flex-direction:column;
  gap:0.6rem;
  padding: 0.9rem 1rem;
  flex: 1 1 auto;
`;

/* Título e descrição do Card (reaproveitamos tipografia de CardBase se existirem, senão estilizamos) */
const CardTitle = styled(BaseCardTitle)`
  font-size: 1.05rem;
  line-height: 1.2;
`;

const CardDescription = styled(BaseCardDescription)`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors?.text || "#40514e"};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* Rodapé do card */
const CardFooter = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:0.6rem;
  margin-top:auto;
`;

/* Botão - reaproveitamos CardButton (é <a> por padrão) e mudamos para Link via `as` */
const ViewButton = styled(BaseCardButton)`
  padding: 0.5rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius?.pill || "999px"};
  font-weight: 700;
  text-decoration: none;
  display:inline-flex;
  align-items:center;
  justify-content:center;
`;



/* Empty state */
const EmptyBox = styled.div`
  margin-top: 1.5rem;
  text-align:center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  border-radius: ${({ theme }) => theme.radius?.md || "12px"};
  box-shadow: ${({ theme }) => theme.shadow?.sm || "0 6px 18px rgba(0,0,0,0.04)"};
`;
