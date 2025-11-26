// src/components/ProductCard/ProductCard.jsx
import React from "react";
import styled from "styled-components";
import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardDescription,
  CardPrice,
  CardButton,
  CardSticker
} from "../CardBase/cardBase";

/**
 * ProductCard atualizado:
 * - Preço à esquerda
 * - Botão de afiliado à direita com label baseada em product.vendor (fallback Amazon)
 * - Robust price parsing (aceita "39,90", "€39.90", etc)
 *
 * Props:
 * - product: { id, name, image, description, price, affiliateLink, vendor, category, brand, rating, reviews, featured }
 * - onBuy: callback local (usado quando não há affiliateLink)
 */
export default function ProductCard({ product = {}, onBuy }) {
  const title = product.name || product.title || "Produto";
  const excerpt = product.description || product.short || "";
  const image = product.image || product.img || "/placeholder-16x9.png";

  const parsePrice = (v) => {
    if (v == null) return null;
    const s = String(v).trim();
    const cleaned = s.replace(/[^\d.,-]/g, "");
    if (/,/.test(cleaned) && /\./.test(cleaned)) {
      return Number(cleaned.replace(/\./g, "").replace(",", "."));
    }
    if (/,/.test(cleaned) && !/\./.test(cleaned)) {
      return Number(cleaned.replace(",", "."));
    }
    const n = Number(cleaned);
    return isNaN(n) ? null : n;
  };

  const priceNum = parsePrice(product.price ?? product.preco ?? product.value);
  const priceText = priceNum !== null ? priceNum.toLocaleString("pt-PT", { style: "currency", currency: "EUR" }) : null;

  const vendor = (product.vendor || product.retailer || "Amazon");
  const affiliateLink = product.affiliateLink || product.link || product.url || null;

  // aria text for affiliate CTA
  const affiliateLabel = affiliateLink
    ? `Ver ${title} na ${vendor}`
    : `Comprar ${title}`;

  return (
    <CardWrapper role="listitem" aria-label={title}>
      <CardBase>
        {product.category && <CardSticker aria-hidden>{product.category}</CardSticker>}
        <CardImage src={image} alt={title} loading="lazy" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          {product.brand && <CardSubtitle>{product.brand}</CardSubtitle>}
          <CardDescription>{excerpt}</CardDescription>

          <FooterRow>
            <PriceBlock>
              {priceText ? <PriceText>{priceText}</PriceText> : <NoPrice>Preço sob consulta</NoPrice>}
              {product.rating != null && (
                <Rating aria-label={`Avaliação ${product.rating} de 5`}>
                  <strong>{product.rating}</strong>
                  {product.reviews ? <small> ({product.reviews})</small> : null}
                </Rating>
              )}
            </PriceBlock>

            <CTABlock>
              {affiliateLink ? (
                <StyledAffiliateButton
                  as="a"
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={affiliateLabel}
                >
                  Ver na {vendor}
                </StyledAffiliateButton>
              ) : (
                <StyledAffiliateButton
                  as="button"
                  onClick={onBuy}
                  aria-label={affiliateLabel}
                >
                  Comprar
                </StyledAffiliateButton>
              )}
            </CTABlock>
          </FooterRow>
        </CardBody>
      </CardBase>
    </CardWrapper>
  );
}

/* ---------------- estilos locais ---------------- */

const CardWrapper = styled.div`
  height: 100%;
  display: block;
`;

/* footer com preço à esquerda e CTA à direita */
const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  margin-top: 0.6rem;
`;

/* bloco do preço */
const PriceBlock = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

/* preço estilizado (usa seu CardPrice se quiser, aqui é redundante) */
const PriceText = styled.div`
  font-weight: 800;
  color: ${({ theme }) => theme.colors?.primary || "#2a9d8f"};
  font-size: 1.05rem;
`;

/* fallback quando não há preço */
const NoPrice = styled.small`
  color: ${({ theme }) => theme.colors?.secondaryDark || "#666"};
`;

/* rating pequeno */
const Rating = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors?.secondaryDark || "#666"};
`;

/* CTA block (right) */
const CTABlock = styled.div`
  display:flex;
  align-items:center;
`;

/* botão de afiliado: estilo chamativo, full-height opcional */
const StyledAffiliateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  background: ${({ theme }) => theme.colors?.accent || theme.colors?.primary || "#ff6a00"};
  color: ${({ theme }) => theme.colors?.surface || "#fff"};
  box-shadow: ${({ theme }) => theme.shadow?.sm || "0 6px 18px rgba(0,0,0,0.08)"};
  text-decoration: none;

  &:hover { transform: translateY(-2px); filter: brightness(0.96); }
`;

/* pois alguns CardBase já têm CardPrice, mantemos compatibilidade visual */
