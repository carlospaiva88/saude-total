// src/data/products/vitaminaC.js
// Produto padronizado (Amazon-API-ready)

const vitaminaC = {
  id: "vitamina-c-1000mg",
  ASIN: "B07VITC1000",
  marketplaceId: "BR",
  sku: "VITC-1000MG",

  name: "Vitamina C 1000 mg - ImmunoPlus",
  brand: "ImmunoPlus",
  manufacturer: "ImmunoPlus Nutraceuticos",
  category: ["Vitaminas", "Vitamina C"],
  categoriesTree: ["Saúde", "Vitaminas & Suplementos"],

  price: {
    currency: "BRL",
    formatted: "R$ 39,90",
    amount: 39.9,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B07VITC1000?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/51jHKlmcgML._AC_SY300_.jpg",
    "https://m.media-amazon.com/images/I/51jHKlmcgML._AC_SX300_.jpg",
  ],

  shortDescription: "Vitamina C 1000 mg — antioxidante para suporte imunológico e recuperação.",
  excerpt:
    "Vitamina C 1000 mg em comprimidos — antioxidante que apoia o sistema imune, reduz fadiga e auxilia recuperação pós-esforço.",

  description:
    "<p>Vitamina C em alta dosagem (1000 mg) com liberação rápida — ideal como complemento nutricional diário para suporte imunológico e antioxidante.</p>" +
    "<ul>" +
    "<li>Dosagem: 1000 mg por dose</li>" +
    "<li>Quantidade: 60 comprimidos</li>" +
    "<li>Com bioflavonoides para melhor absorção</li>" +
    "</ul>",

  features: [
    "1000 mg por comprimido",
    "Contém bioflavonoides",
    "Embalagem com 60 comprimidos",
    "Suporta sistema imunológico",
  ],

  dimensions: {
    weight: "aprox. 140 g (embalagem)",
  },

  rating: 4.6,
  reviewsCount: 1890,

  affiliate: {
    affiliateLink: "https://amzn.to/45Wn4qk",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Vitamina C 1000mg — Antioxidante e Suporte Imunológico",
    metaDescription:
      "Vitamina C 1000 mg com bioflavonoides — antioxidante potente para suporte imunológico e recuperação. 60 comprimidos.",
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23",
};

export default vitaminaC;
