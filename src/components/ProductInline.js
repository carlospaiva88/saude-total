// src/components/Article/ProductInline.jsx
import React from "react";
import styled from "styled-components";

export default function ProductInline({ product, sticky = true }) {
  if (!product) return null;

  const onClick = () => {
    if (window.gtag) {
      window.gtag('event','click_affiliate', {
        event_category: 'affiliate',
        event_label: product.name,
        value: product.price || 0
      });
    }
  };

  return (
    <>
      <Inline role="complementary" aria-labelledby="product-title">
        <HeaderRow>
          <HeaderLeft>
            <h3 id="product-title">Produto Recomendado</h3>
            <Badge aria-hidden>Afiliado</Badge>
          </HeaderLeft>
          <HeaderRight>
            <small style={{color: "var(--muted)"}}>{product.brand || ""}</small>
          </HeaderRight>
        </HeaderRow>

        <Card>
          <Thumb>
            <img src={product.image || "/placeholder-16x9.png"} alt={product.name} loading="lazy" />
          </Thumb>

          <Info>
            <Name>{product.name}</Name>
            {product.price && <Price>€ {product.price}</Price>}
            {product.bullets ? (
              <ul>
                {product.bullets.slice(0,4).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            ) : product.description ? <p>{product.description}</p> : null}

            <Actions>
              <Primary
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClick}
                aria-label={`Abrir link de afiliado para ${product.name}`}
              >
                Conhecer agora
              </Primary>
              <Secondary type="button" onClick={() => document.querySelector('section[aria-label="Comentários"], #comments')?.scrollIntoView({behavior:'smooth', block:'start'})}>
                Ver opiniões
              </Secondary>
            </Actions>

            <FooterNote>
              <Rating aria-hidden>⭐️ {product.rating || "4.6"}</Rating>
              <Trust>Envio rápido • Garantia</Trust>
            </FooterNote>
          </Info>
        </Card>
      </Inline>

      {sticky ? (
        <StickySmall role="complementary" aria-hidden>
          <img src={product.image || "/placeholder-1x1.png"} alt={product.name} />
          <div>
            <div style={{fontSize: "0.95rem", fontWeight: 600}}>{product.name.length > 28 ? product.name.slice(0, 25) + "…" : product.name}</div>
            <TinyCTA href={product.link} target="_blank" rel="noopener noreferrer" onClick={onClick}>Ver produto</TinyCTA>
          </div>
        </StickySmall>
      ) : null}
    </>
  );
}

/* Styled */
const Inline = styled.section`
  max-width: 68ch;
  margin: 1.6rem auto;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
const HeaderRow = styled.div`display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem`;
const HeaderLeft = styled.div`display:flex;align-items:center;gap:0.6rem`;
const Badge = styled.span`
  background: rgba(108,188,163,0.12);
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight:600;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.82rem;
`;
const HeaderRight = styled.div`font-size:0.85rem;color:${({ theme }) => theme.colors.secondaryDark};`;

const Card = styled.div`display:flex;gap:1rem;align-items:flex-start`;
const Thumb = styled.div`width:160px;height:110px;flex-shrink:0;overflow:hidden;border-radius:8px;img{width:100%;height:100%;object-fit:cover}`;
const Info = styled.div`flex:1`;
const Name = styled.h4`margin:0;color:${({ theme }) => theme.colors.primaryDark};`;
const Price = styled.div`color:${({ theme }) => theme.colors.primary};font-weight:700;margin:.4rem 0`;
const Actions = styled.div`margin-top:.6rem;display:flex;gap:.6rem;align-items:center`;
const Primary = styled.a`
  background:${({ theme }) => theme.colors.primary};
  color:white;
  padding:.6rem 1rem;
  border-radius:${({ theme }) => theme.radius.pill};
  text-decoration:none;
  font-weight:700;
`;
const Secondary = styled.button`
  background:transparent;border:1px solid ${({ theme }) => theme.colors.border};padding:.5rem .8rem;border-radius:8px;cursor:pointer;
`;
const FooterNote = styled.div`display:flex;justify-content:space-between;align-items:center;margin-top:.75rem;font-size:0.9rem;color:${({ theme }) => theme.colors.text}`;
const Rating = styled.span``;
const Trust = styled.span``;

/* Sticky mini card no canto — discreto, sem auto-open */
const StickySmall = styled.aside`
  position: fixed;
  right: 16px;
  bottom: 16px;
  width: 220px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 0.6rem;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display:flex;
  gap:.6rem;
  align-items:center;
  z-index: 2200;

  img{width:56px;height:56px;object-fit:cover;border-radius:8px}
  a{display:inline-block;margin-top:.4rem;background:${({ theme }) => theme.colors.primary};color:white;padding:.4rem .6rem;border-radius:8px;text-decoration:none}

  @media(max-width:980px){ display:none; }
`;

/* tiny CTA inside sticky */
const TinyCTA = styled.a`
  display:inline-block;
  margin-top:4px;
  background:${({ theme }) => theme.colors.primary};
  color:white;
  padding:0.35rem 0.6rem;
  border-radius:8px;
  text-decoration:none;
  font-weight:600;
`;
