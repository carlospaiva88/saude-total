// src/pages/Subcategoria.jsx
import React, { useMemo, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Breadcrumbs from "../components/BreadCrumbs";
import styled from "styled-components";
import articlesData from "../data/articles"; 

import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardDescription,
  CardButton
} from "../components/CardBase/cardBase";



// helper de normalização simples
function normalizeKey(s = "") {
  return String(s || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .replace(/\s+/g, "-") // espaços -> hifens
    .replace(/[^a-z0-9\-]/g, "") // remove chars indesejados
    .replace(/\-+/g, "-")
    .replace(/^\-|\-$/g, "");
}
export default function Subcategoria() {
  const { categoria, subcategoria } = useParams();
  const navigate = useNavigate();

  const articles = useMemo(() => {
    return Array.isArray(articlesData) ? articlesData : Object.values(articlesData || {});
  }, []);

  const normalizedCat = normalizeKey(categoria || "");
  const normalizedSub = normalizeKey(subcategoria || "");

  // Filtra artigos de forma tolerante: verifica categoria (category/categoria),
  // subcategoria (subCategory/subcategoria/sub) e também slug (caso artigo esteja sem subCategory)
  const subArticles = useMemo(() => {
    const seen = new Set();
    return articles
      .filter((article) => {
        const artCat = normalizeKey(article.category || article.categoria || "");
        if (artCat !== normalizedCat) return false;

        const artSub = normalizeKey(article.subCategory || article.subcategoria || article.sub || "");
        const artSlug = normalizeKey(article.slug || article.friendlySlug || article.id || "");

        // corresponde quando:
        // - subCategory corresponde
        // - OU slug do artigo corresponde (caso artigo esteja atrelado diretamente à categoria)
        return artSub === normalizedSub || artSlug === normalizedSub;
      })
      .filter((article) => {
        const s = normalizeKey(article.slug || article.friendlySlug || article.id || "");
        if (!s) return false;
        if (seen.has(s)) return false;
        seen.add(s);
        return true;
      });
  }, [articles, normalizedCat, normalizedSub]);

  // Se não houver artigos listados mas existir um artigo cujo slug === subcategoria,
  // fazemos redirect automático para esse artigo (melhora UX com links legados).
  useEffect(() => {
    if (subArticles.length > 0) return;
    // procurar um artigo com slug igual ao subcategoria + mesma categoria
    const match = articles.find((article) => {
      const artCat = normalizeKey(article.category || article.categoria || "");
      const artSlug = normalizeKey(article.slug || article.friendlySlug || article.id || "");
      return artCat === normalizedCat && artSlug === normalizedSub;
    });
    if (match) {
      const to = `/blog/${encodeURIComponent(articlesData.category || articlesData.categoria || categoria || "geral")}/${encodeURIComponent(match.subCategory || match.subcategoria || normalizedSub)}/${encodeURIComponent(match.slug || match.friendlySlug || match.id)}`;
      // navigate para o artigo (replace evita encher histórico)
      navigate(to, { replace: true });
    }
  }, [articles, subArticles, normalizedCat, normalizedSub, navigate, categoria]);

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <Container>
        <Title>Artigos sobre {subcategoria} ({categoria})</Title>

        <ArticlesGrid>
          {subArticles.map((article) => {
            const slug = article.slug || article.friendlySlug || article.id;
            const to = `/blog/${encodeURIComponent(article.category || article.categoria || categoria || "geral")}/${encodeURIComponent(article.subCategory || article.subcategoria || subcategoria || "geral")}/${encodeURIComponent(slug)}`;
            const excerptRaw = (article.excerpt || article.description || article.descricao || String(article.content || "").replace(/<[^>]+>/g, ""));
            const excerpt = excerptRaw.length > 160 ? excerptRaw.slice(0, 157) + "…" : excerptRaw;

            return (
              <ArticleLink key={slug} to={to} aria-label={`Abrir artigo ${article.title || article.titulo}`}>
                <CardBase>
                  <CardImage
                    src={article.image || article.imagem || "/placeholder-16x9.png"}
                    alt={article.title || article.titulo || "Imagem do artigo"}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder-16x9.png"; }}
                  />
                  <CardBody>
                    <MetaRow>
                      <small>{article.date || ""}</small>
                      <small>{article.readingTime || article.tempo || ""}</small>
                    </MetaRow>

                    <CardTitle>{article.title || article.titulo || "Sem título"}</CardTitle>
                    <CardDescription>{excerpt}</CardDescription>

                    <CardButton as={Link} to={to} aria-label={`Ler ${article.title || article.titulo}`}>Ler artigo</CardButton>
                  </CardBody>
                </CardBase>
              </ArticleLink>
            );
          })}
        </ArticlesGrid>

        {subArticles.length === 0 && <Empty>Não há artigos nesta subcategoria ainda.</Empty>}
      </Container>
      <Footer />
    </>
  );
}

/* ---------- Styled ---------- */

const Container = styled.main`
  max-width: 1100px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: center;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const ArticlesGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  /* força linhas iguais (em combinação com CardBase height:100%) */
  grid-auto-rows: 1fr;

  /* garante que cada filho preencha a célula */
  & > a, & > article, & > div {
    height: 100%;
  }
`;

const ArticleLink = styled(Link)`
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
`;

const MetaRow = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: .9;
  margin-bottom: 0.45rem;
  display:flex;
  justify-content:space-between;
  gap:0.5rem;
`;

const Empty = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-top: 2rem;
`;
