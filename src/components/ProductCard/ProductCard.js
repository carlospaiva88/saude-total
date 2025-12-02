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
  
  CardSticker
} from "../CardBase/cardBase";

/**
 * ProductCard atualizado (patch):
 * - Suporta product.images (array) e product.image/product.img
 * - Parse robusto de price (aceita {amount, formatted, currency}, string "R$ 39,90", number, etc)
 * - Formata moeda usando product.price.currency / product.currency / fallback BRL
 * - Mantém acessibilidade e estrutura existente
 *
 * Props:
 * - product: { id, name, title, images, image, img, shortDescription, excerpt, description,
 *              price (obj|string|number), priceAmount, currency, affiliateLink, vendor,
 *              category, brand, rating, reviewsCount, featured }
 * - onBuy: callback local (usado quando não há affiliateLink)
 */
export default function ProductCard({ product = {}, onBuy }) {
  // Títulos e textos
  const title = product.name || product.title || "Produto";
  const excerpt =
    product.shortDescription || product.excerpt || product.short || product.description || "";

  // IMAGEM: prioridade images[0] -> image -> img -> placeholder
  const image =
    (product.images && Array.isArray(product.images) && product.images.length > 0 && product.images[0]) ||
    product.image ||
    product.img ||
    "/placeholder-16x9.png";

  /**
   * parsePrice: aceita
   * - number -> retorna number
   * - objeto { amount, formatted, currency } -> usa amount se existir, senão tenta formatted
   * - string "R$ 129,90" / "129.90" / "1.234,56" / "1,234.56" -> normaliza corretamente
   */
  const parsePrice = (v) => {
    if (v == null) return null;

    // objeto
    if (typeof v === "object") {
      if (v.amount != null && !isNaN(Number(v.amount))) return Number(v.amount);
      if (v.formatted) v = v.formatted;
      else return null;
    }

    // número puro
    if (typeof v === "number") return v;

    // agora v é string
    const s = String(v).trim();
    if (!s) return null;

    const cleaned = s.replace(/[^\d.,-]/g, ""); // mantém dígitos, vírgula, ponto, traço

    // caso tenha vírgula e ponto (ex: "1.234,56" ou "1,234.56")
    if (/,/.test(cleaned) && /\./.test(cleaned)) {
      // normalmente em pt: milhar '.' decimal ','
      // detectar posição para decidir
      if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
        // pt style: remove pontos (milhar) e trocar vírgula por ponto (decimal)
        const n = Number(cleaned.replace(/\./g, "").replace(",", "."));
        return isNaN(n) ? null : n;
      } else {
        // en style: remove vírgulas (milhar)
        const n = Number(cleaned.replace(/,/g, ""));
        return isNaN(n) ? null : n;
      }
    }

    // só vírgula (ex: "129,90") => vírgula decimal
    if (/,/.test(cleaned) && !/\./.test(cleaned)) {
      const n = Number(cleaned.replace(",", "."));
      return isNaN(n) ? null : n;
    }

    // caso padrão (ex: "129.90" ou "12990")
    const n = Number(cleaned);
    return isNaN(n) ? null : n;
  };

  // suportar vários formatos onde o valor pode estar
  const priceNum =
    parsePrice(product.price?.amount ?? product.priceAmount ?? product.price ?? product.preco ?? product.value);

  // moeda/locale: prioriza product.price.currency -> product.currency -> BRL
  const currency = (product.price && product.price.currency) || product.currency || "BRL";
  const locale = currency === "BRL" ? "pt-BR" : "pt-PT";

  const priceText =
    priceNum !== null
      ? priceNum.toLocaleString(locale, { style: "currency", currency })
      : null;

  // vendor / affiliate
  const vendor = product.vendor || product.retailer || "Amazon";
  const affiliateLink = product.affiliateLink || product.link || product.url || null;

  const affiliateLabel = affiliateLink ? `Ver ${title} na ${vendor}` : `Comprar ${title}`;

  /**
   * Nota sobre CORS: se a imagem existir (abrir em nova aba) mas não carregar no app,
   * verifique o console por "blocked by CORS policy". Imagens da Amazon às vezes
   * precisam ser proxyadas via backend ou substituídas por imagens hospedadas
   * sem restrição durante o desenvolvimento.
   *
   * Se desejar fallback automático para dev, poderia usar:
   * const imageToShow = image && image.includes("m.media-amazon.com") ? "/placeholder.png" : image;
   *
   * Aqui deixamos a URL original para que você possa testar/inspecionar.
   */

  return (
    <CardWrapper role="listitem" aria-label={title}>
      <CardBase>
        {product.category && <CardSticker aria-hidden>{product.category}</CardSticker>}

        {/* CardImage é importado do CardBase — esperamos que aceite src/alt/loading */}
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
                  {product.reviewsCount || product.reviews ? <small> ({product.reviewsCount ?? product.reviews})</small> : null}
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
                <StyledAffiliateButton as="button" onClick={onBuy} aria-label={affiliateLabel}>
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
