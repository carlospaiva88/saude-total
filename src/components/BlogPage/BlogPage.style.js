import styled from "styled-components";
import { Link } from "react-router-dom";

/* ==========================
   Containers e Layout
   ========================== */
export const BlogPageWrapper = styled.article`
  max-width: 980px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
`;

export const NotFoundWrapper = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 3rem 1.25rem 6rem;
  color: ${({ theme }) => theme.colors.textDark || "#264653"};
`;

/* ==========================
   Navegação
   ========================== */
export const Breadcrumbs = styled.nav`
  font-size: 0.9rem;
  margin-bottom: 1rem;

  a {
    color: ${({ theme }) => theme.colors.primary || "#2a9d8f"};
    text-decoration: none;
  }

  span.sep {
    margin: 0 .5rem;
    color: ${({ theme }) => theme.colors.muted || "#80939a"};
  }
`;

/* ==========================
   Texto principal
   ========================== */
export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.heading || "#264653"};
  line-height: 1.2;
  margin: 0 0 .5rem;
`;

export const Meta = styled.div`
  color: ${({ theme }) => theme.colors.subtext || "#52727a"};
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
`;

export const ArticleBody = styled.div`
  color: ${({ theme }) => theme.colors.body || "#2f4f4f"};
  font-size: 1.06rem;
  line-height: 1.7;
  white-space: pre-wrap; /* preserva quebras de linha do texto */
  margin-bottom: 2rem;

  p { margin: 0 0 1rem; }
  ul { padding-left: 1.25rem; margin: 0 0 1rem; }
`;

export const Cover = styled.img`
  width: 100%;
  height: auto;
  border-radius: 14px;
  box-shadow: 0 10px 26px rgba(38, 70, 83, 0.15);
  margin: 0 0 1.5rem;
`;

/* ==========================
   Produtos
   ========================== */
export const ProductsSection = styled.section`
  margin-top: 2.5rem;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary || "#2a6f61"};
  font-size: 1.35rem;
  margin: 0 0 1rem;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

export const ProductCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(42, 157, 143, 0.15);
  border: 1px solid rgba(42, 157, 143, 0.08);
`;

export const ProductName = styled.h3`
  margin: 0 0 .25rem;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.secondaryDark || "#1f5e53"};
`;

export const ProductDesc = styled.p`
  margin: 0 0 .75rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.mutedDark || "#345a5a"};
`;

export const PrimaryButton = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary || "#2a9d8f"};
  color: #fff;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: transform .15s ease, box-shadow .15s ease;
  box-shadow: 0 4px 10px rgba(42, 157, 143, 0.28);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(42,157,143,0.33);
  }
`;

/* ==========================
   Artigos relacionados
   ========================== */
export const RelatedSection = styled.section`
  margin-top: 3rem;
`;

export const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

export const RelatedCard = styled(Link)`
  display: block;
  background: #f0f7f5;
  border-radius: 12px;
  padding: .9rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.heading || "#264653"};
  box-shadow: 0 4px 10px rgba(38,70,83,.08);
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(38,70,83,.18);
    background: #e9f5f2;
  }
`;

export const RelatedThumb = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: .6rem;
`;

export const RelatedTitle = styled.h4`
  margin: 0 0 .25rem;
  font-size: 1rem;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.secondary || "#2a6f61"};
`;
