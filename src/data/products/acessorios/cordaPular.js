// src/data/products/cordaPular.js
// Produto padronizado (Amazon-API-ready)

const cordaPular = {
  id: "corda-pular-speed",
  ASIN: "B07CORDA-SPEED",
  marketplaceId: "BR",
  sku: "CORDA-SPEED-ADJ",

  name: "Corda de Pular Ajustável - Speed Rope",
  brand: "CardioMax",
  manufacturer: "CardioMax Treinos",
  category: ["Acessórios", "Cardio"],
  categoriesTree: ["Fitness", "Cardio Equipment"],

  price: {
    currency: "BRL",
    formatted: "R$ 24,90",
    amount: 24.9,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B07CORDA-SPEED?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/61e4dMDdxZL._AC_SX522_.jpg",
    "https://m.media-amazon.com/images/I/61e4dMDdxZL._AC_SY300_.jpg",
  ],

  shortDescription: "Corda de pular ajustável com cabo leve — ideal para treino cardio e condicionamento.",
  excerpt:
    "Speed rope ajustável com rolamentos e cabo leve para rotações rápidas — excelente para HIIT, emagrecimento e coordenação.",

  description:
    "<p>Corda de pular CardioMax com cabo em PVC e rolamentos para giro suave. Ajuste de comprimento simples para diferentes alturas e pegadores ergonômicos antideslizantes.</p>" +
    "<ul>" +
    "<li>Comprimento ajustável</li>" +
    "<li>Rolamentos para giro rápido</li>" +
    "<li>Pegador ergonômico e leve</li>" +
    "</ul>",

  features: [
    "Rolamentos para giro estável e rápido",
    "Comprimento facilmente ajustável",
    "Pegadores ergonômicos",
    "Compacta e fácil de levar",
  ],

  dimensions: {
    maxLength: "300 cm (ajustável)",
    weight: "aprox. 120 g",
  },

  rating: 4.4,
  reviewsCount: 1580,

  affiliate: {
    affiliateLink: "https://amzn.to/4oWJZuv",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Corda de Pular Ajustável — Speed Rope",
    metaDescription:
      "Corda Speed Rope com rolamentos e comprimento ajustável — ideal para treinos HIIT, crossfit e condicionamento em casa.",
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23",
};

export default cordaPular;
