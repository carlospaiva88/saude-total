// src/data/products/colageno.js
// Produto padronizado (Amazon-API-ready) — Colágeno Hidrolisado

const colageno = {
  id: "colageno-hidrolisado-500g",
  ASIN: "B07COLAGEN500",
  marketplaceId: "BR",
  sku: "COLAGENO-500G",

  name: "Colágeno Hidrolisado - RenovAge 500g",
  brand: "RenovAge",
  manufacturer: "RenovAge Labs",
  category: ["Vitaminas", "Colágeno"],
  categoriesTree: ["Saúde", "Nutrição"],

  price: {
    currency: "BRL",
    formatted: "R$ 89,50",
    amount: 89.5,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B07COLAGEN500?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/817VAOmwk7L._AC_SY300_.jpg",
    "https://m.media-amazon.com/images/I/817VAOmwk7L._AC_SX300_.jpg",
  ],

  shortDescription: "Colágeno hidrolisado em pó para suporte de pele, articulações e recuperação.",
  excerpt:
    "Colágeno hidrolisado em pó — suporte para pele, unhas e articulações. Ideal para uso após treino e em protocolos de recuperação.",

  description:
    "<p>Colágeno hidrolisado em pó para adicionar em shakes, sucos ou iogurtes. Fórmula processada para melhor absorção e fácil dissolução.</p>" +
    "<ul>" +
    "<li>Quantidade: 500 g</li>" +
    "<li>Sem sabor — pode ser misturado em bebidas</li>" +
    "<li>Fonte de peptídeos de colágeno</li>" +
    "</ul>",

  features: [
    "Pó sem sabor — mistura fácil",
    "500 g por embalagem",
    "Indicado para pele, cabelo e articulações",
    "Rico em peptídeos bioativos",
  ],

  dimensions: {
    weight: "aprox. 520 g (embalagem)",
  },

  rating: 4.5,
  reviewsCount: 640,

  affiliate: {
    affiliateLink: "https://amzn.to/4mF2fac",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Colágeno Hidrolisado RenovAge — 500g",
    metaDescription:
      "Colágeno hidrolisado em pó (500g) para suporte de pele, articulações e recuperação. Sem sabor, fácil de misturar em bebidas.",
  },

  isFeatured: false,
  createdAt: "2025-11-24",
  updatedAt: "2025-11-24",
};

export default colageno;
