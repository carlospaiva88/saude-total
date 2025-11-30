// src/components/BlogPage/ContinueExploring.js
import React, { useMemo } from "react";
import * as S from "./ContinueExploring.styles";
import { Link } from "react-router-dom";

/* ---------------------- helpers ---------------------- */

function safeArray(input) {
  if (!input) return [];
  return Array.isArray(input) ? input : Object.values(input);
}

function safeImage(r) {
  return r?.imagem || r?.image || "/placeholder-16x9.png";
}

function safeExcerpt(r) {
  return (
    r.shortDescription ||
    r.descricaoCurta ||
    r.excerpt ||
    r.descricao ||
    r.description ||
    ""
  );
}

function buildRecipeLink(r) {
  return `/receitas/${encodeURIComponent(r.slug)}`;
}

function buildArticleLink(a) {
  const categoria = a.category || a.categoria || "geral";
  const slug = a.slug || a.friendlySlug;
  return `/blog/${encodeURIComponent(categoria)}/${encodeURIComponent(slug)}`;
}

function buildProductLink(p) {
  const slug = p.slug || p.id;
  return `/produtos/${encodeURIComponent(slug)}`;
}

function buildTripLink(v) {
  const cat =
    v.categorySlug ||
    v.category ||
    v.region ||
    v.tipo ||
    v.type ||
    "nacional";

  const slug = v.slug || v.id || v.title || v.nome;
  return `/viagens/${encodeURIComponent(String(cat))}/${encodeURIComponent(
    String(slug)
  )}`;
}

/* ---------------------- main ---------------------- */

export default function ContinueExploring({ posts = [], receitas = [], products = [], trips = [] }) {
  const flatReceitas = useMemo(() => safeArray(receitas), [receitas]);
  const flatProducts = useMemo(() => safeArray(products), [products]);
  const flatTrips = useMemo(() => safeArray(trips), [trips]);
  const flatPosts = useMemo(() => safeArray(posts), [posts]);

  /* ---------------- CARDS MONTADOS ---------------- */

  const cards = useMemo(() => {
    const artigos = flatPosts.slice(0, 6).map((a) => ({
      type: "article",
      title: a.title || a.titulo,
      image: safeImage(a),
      excerpt: safeExcerpt(a).slice(0, 110) + "…",
      link: buildArticleLink(a),
    }));

    const rc = flatReceitas.slice(0, 6).map((r) => ({
      type: "receita",
      title: r.titulo || r.title,
      image: safeImage(r),
      excerpt: safeExcerpt(r).slice(0, 110) + "…",
      link: buildRecipeLink(r),
    }));

    const produtos = flatProducts.slice(0, 6).map((p) => ({
      type: "product",
      title: p.name,
      image: p.image,
      excerpt: p.description?.slice(0, 110) + "…",
      link: buildProductLink(p),
    }));

    const viagensCards = flatTrips.slice(0, 6).map((v) => ({
      type: "trip",
      title: v.title || v.titulo,
      image: v.image,
      excerpt: safeExcerpt(v).slice(0, 110) + "…",
      link: buildTripLink(v),
    }));

    return [...artigos, ...rc, ...produtos, ...viagensCards];
  }, [flatPosts, flatReceitas, flatProducts, flatTrips]);

  return (
    <S.Wrapper>
      <h2>Continue Explorando</h2>
      <S.Grid>
        {cards.map((item, i) => (
          <S.Card key={i}>
            <Link to={item.link}>
              <S.Thumb style={{ backgroundImage: `url(${item.image})` }} />
              <S.Body>
                <S.Badge type={item.type}>
                  {item.type === "article"
                    ? "Artigo"
                    : item.type === "receita"
                    ? "Receita"
                    : item.type === "product"
                    ? "Produto"
                    : "Viagem"}
                </S.Badge>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </S.Body>
            </Link>
          </S.Card>
        ))}
      </S.Grid>
    </S.Wrapper>
  );
}
