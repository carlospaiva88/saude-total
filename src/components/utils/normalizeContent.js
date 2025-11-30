// src/utils/normalizeContent.js
// utilitários para normalizar shape dos dados em runtime
export function stripHtml(html = "") {
  if (!html) return "";
  return String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizeStringKey(s = "") {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/* ----------------- ARTICLES ----------------- */
export function ensureArticleShape(a = {}) {
  const slug = a.slug || a.id || (a.title && normalizeStringKey(a.title).replace(/\s+/g,'-')) || Math.random().toString(36).slice(2,8);
  const title = a.title || a.titulo || a.name || "Artigo";
  const image = a.image || a.imagem || a.thumb || "/placeholder-16x9.png";
  const shortDescription = a.shortDescription || a.excerpt || a.descricaoCurta || stripHtml(a.content || "").slice(0, 120);
  const excerpt = a.excerpt || shortDescription.slice(0, 140);
  const date = a.date || a.datePublished || null;
  const readingTime = a.readingTime || a.tempo || a.reading || null;
  const category = a.category || a.categoria || "geral";

  return {
    ...a,
    slug,
    title,
    image,
    shortDescription,
    excerpt,
    date,
    readingTime,
    category
  };
}

/* ----------------- RECIPES ----------------- */
export function ensureRecipeShape(r = {}) {
  return {
    slug: r.slug || r.id || (r.titulo && normalizeStringKey(r.titulo).replace(/\s+/g,'-')) || Math.random().toString(36).slice(2,8),
    titulo: r.titulo || r.title || r.name || "Receita",
    imagem: r.imagem || r.image || r.thumb || "/placeholder-16x9.png",
    tempo: r.tempo || r.time || "",
    calorias: r.calorias || r.kcal || null,
    categoria: r.categoria || r.category || "Receitas",
    descricaoCurta: r.descricaoCurta || r.shortDescription || stripHtml(r.conteudo || r.content || "").slice(0,120),
    excerpt: r.excerpt || (r.descricaoCurta ? r.descricaoCurta.slice(0,140) : stripHtml(r.conteudo || "").slice(0,140)),
    conteudo: r.conteudo || r.content || ""
  };
}

/* ----------------- PRODUCTS ----------------- */
export function ensureProductShape(p = {}) {
  return {
    id: p.id || p.slug || (p.name && normalizeStringKey(p.name).replace(/\s+/g,'-')) || Math.random().toString(36).slice(2,8),
    name: p.name || p.title || "Produto",
    image: p.image || p.imagem || p.thumb || "/placeholder-4x3.png",
    brand: p.brand || "",
    category: p.category || p.categoria || "Produtos",
    price: p.price || p.preco || null,
    affiliateLink: p.affiliateLink || p.link || p.url || "",
    shortDescription: p.shortDescription || p.description?.slice?.(0,120) || "",
    description: p.description || p.desc || ""
  };
}

/* ----------------- TRIPS (viagens) ----------------- */
export function ensureTripShape(t = {}) {
  return {
    slug: t.slug || t.id || (t.title && normalizeStringKey(t.title).replace(/\s+/g,'-')) || Math.random().toString(36).slice(2,8),
    title: t.title || t.titulo || "Viagem",
    image: t.image || t.imagem || "/placeholder-16x9.png",
    shortDescription: t.shortDescription || stripHtml(t.content || t.conteudo || "").slice(0,120),
    excerpt: t.excerpt || (t.shortDescription ? t.shortDescription.slice(0,140) : stripHtml(t.content||"").slice(0,140)),
    category: t.category || t.categoria || "nacionais"
  };
}
