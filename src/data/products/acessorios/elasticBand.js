// src/data/products/elasticBand.js
// Produto padronizado (Amazon-API-ready) — Elastic Band 5 Intensidades

const elasticBand = {
  id: "elastic-band-5levels",
  ASIN: "B07ELASTIC5",
  asin: "B07ELASTIC5",
  marketplaceId: "BR",
  sku: "ELASTIC-BAND-5LVL",
  slug: "elastic-band-5-intensidades-movefit",

  name: "Elastic Band - Conjunto 5 Intensidades",
  title: "Elastic Band - Conjunto 5 Intensidades",
  brand: "MoveFit",
  manufacturer: "MoveFit Equipamentos",
  category: "acessorios-fitness",
  categoriesTree: ["Fitness", "Resistance Bands"],
  tags: ["bandas elásticas", "resistência", "treino em casa", "mobilidade"],

  price: {
    currency: "BRL",
    formatted: "R$ 29,90",
    amount: 29.9
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B07ELASTIC5?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/61rQhmvoJIL._AC_SY300_SX300_QL70_ML2_.jpg",
    "https://m.media-amazon.com/images/I/61rQhmvoJIL._AC_SX522_.jpg"
  ],

  shortDescription:
    "Conjunto de 5 bandas elásticas com intensidades variadas — portátil e versátil.",

  excerpt:
    "Kit com 5 bandas de resistência (leve a extra-forte) para treino em casa, fortalecimento, fisioterapia e mobilidade.",

  // Descrição longa convertida para texto simples (sem HTML)
  description:
    "Conjunto completo com 5 níveis de resistência (extra leve, leve, média, forte e extra forte). Ideal para ativação muscular, reabilitação e treinos de força em casa ou na academia.\n\n- Material: látex natural resistente\n- Inclui bolsa para transporte e guia de exercícios\n- Uso em treinos de glúteos, pernas, ombros e core",

  features: [
    "5 níveis de resistência",
    "Compacto e portátil",
    "Inclui bolsa e manual de exercícios",
    "Material durável e elástico"
  ],

  dimensions: {
    length: "30 cm (cada banda dobrada)",
    weight: "aprox. 200 g (kit)"
  },

  rating: 4.4,
  reviewsCount: 3421,

  affiliate: {
    affiliateLink: "https://amzn.to/4fUtc70",
    trackingTag: "seu-affid"
  },

  seo: {
    metaTitle: "Elastic Band - Kit 5 Intensidades | Treino em Casa",
    metaDescription:
      "Conjunto de bandas elásticas MoveFit com 5 resistências — ideal para treino, reabilitação e aquecimento. Leve e portátil."
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23"
};

export default elasticBand;
