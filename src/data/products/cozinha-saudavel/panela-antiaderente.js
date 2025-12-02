// src/data/products/cozinha-saudavel/panela-antiaderente.js
// Produto padronizado (Amazon-API-ready) — Panela Antiaderente 28cm

const product = {
  id: "panela-antiaderente-28cm",
  ASIN: "B07EXAMPLE04",
  asin: "B07EXAMPLE04",
  sku: "KITCHEN-PAN-28",
  slug: "panela-antiaderente-28cm-safe-cook",

  name: "Panela Antiaderente 28cm - Revestimento Cerâmico",
  title: "Panela Antiaderente 28cm - Revestimento Cerâmico",
  brand: "SafeCook",
  manufacturer: "SafeCook Indústria",

  category: "cozinha-saudavel",
  subcategory: "panelas",
  tags: ["panelas", "cozinha-saudavel", "antiaderente", "cerâmica"],

  images: [
    "https://m.media-amazon.com/images/I/61L5OGzdyPL._AC_UL320_.jpg"
  ],

  price: {
    formatted: "R$ 129,90",
    amount: 129.9,
    currency: "BRL"
  },

  availability: "InStock",
  rating: 4.3,
  reviewsCount: 842,

  shortDescription:
    "Panela 28cm com revestimento cerâmico — antiaderente e sem PFOA, ideal para cozinhar saudável.",

  excerpt:
    "Panela 28cm com revestimento cerâmico antiaderente livre de PFOA — fácil limpeza e distribuição uniforme de calor.",

  // descrição longa em texto simples (SEM HTML)
  description:
    "Panela antiaderente com revestimento cerâmico, livre de PFOA, ideal para preparar refeições com menos óleo. Fácil limpeza, boa distribuição de calor e cabos ergonômicos resistentes ao calor.",

  features: [
    "Revestimento cerâmico antiaderente",
    "Livre de PFOA",
    "Fundo de alta condutividade",
    "Cabos ergonômicos e resistentes ao calor"
  ],

  dimensions: { diameter: "28cm", height: "8.5cm" },
  weight: "1.1 kg",
  color: "Grafite",

  affiliate: {
    affiliateLink: "https://amzn.to/EXAMPLE-PAN-28"
  },

  createdAt: "2025-12-01",
  updatedAt: "2025-12-01"
};

export default product;
