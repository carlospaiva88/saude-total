// src/data/products/cozinha-saudavel/liquidificador-blender.js
// Produto padronizado (Amazon-API-ready) — Liquidificador HighSpeed 1200W

const product = {
  id: "liquidificador-highspeed-1200w",
  ASIN: "B07EXAMPLE02",
  asin: "B07EXAMPLE02",
  sku: "KITCHEN-BL-1200",
  slug: "liquidificador-highspeed-1200w-vitablend",

  name: "Liquidificador HighSpeed 1200W - Copo Tritan 1.8L",
  title: "Liquidificador HighSpeed 1200W - Copo Tritan 1.8L",
  brand: "VitaBlend",
  manufacturer: "VitaBlend Co.",

  category: "cozinha-saudavel",
  subcategory: "liquidificador",
  tags: ["liquidificador", "blender", "cozinha-saudavel", "smoothie"],

  images: [
    "https://m.media-amazon.com/images/I/61tP626zBVL._AC_UL320_.jpg"
  ],

  price: {
    formatted: "R$ 699,00",
    amount: 699,
    currency: "BRL"
  },

  availability: "InStock",
  rating: 4.7,
  reviewsCount: 2150,

  shortDescription:
    "Liquidificador de alta potência para smoothies, sopas e cremes — copo Tritan resistente e lavável.",

  excerpt:
    "Liquidificador 1200W com lâminas inox e copo Tritan 1.8L — excelente para smoothies, leites vegetais e receitas saudáveis.",

  // descrição longa convertida para texto simples (SEM HTML)
  description:
    "Liquidificador HighSpeed de 1200W, ideal para preparar smoothies, leites vegetais, sopas e molhos com frequência. Motor potente e copo Tritan 1.8L resistente a impactos, projetado para uso diário e preparo rápido.",

  features: [
    "Potência 1200W",
    "Copo Tritan 1.8L resistente a impactos",
    "Lâminas em aço inox 6 pontas",
    "Funções pulse e programadas para smoothies",
    "Base antiderrapante"
  ],

  dimensions: { width: "22cm", height: "39cm", depth: "20cm" },
  weight: "5.0 kg",
  color: "Inox/preto",

  affiliate: {
    affiliateLink: "https://amzn.to/EXAMPLE-BL-1200"
  },

  createdAt: "2025-12-01",
  updatedAt: "2025-12-01"
};

export default product;
