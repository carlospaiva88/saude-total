// src/data/products/home-gym-essentials/foam-roller-densidade.js
// Produto padronizado (Amazon-API-ready) — Foam Roller 30cm

const product = {
  id: "foam-roller-densidade-media",
  ASIN: "B0FOAMROLL01",
  asin: "B0FOAMROLL01",
  sku: "HG-FR-MED",
  slug: "foam-roller-30cm-alta-densidade-rollfit",

  name: "Foam Roller de Alta Densidade 30cm",
  title: "Foam Roller de Alta Densidade 30cm",
  brand: "RollFit",

  category: "home-gym-essentials",
  subcategory: "foam-roller",
  tags: ["foam-roller", "mobilidade", "home-gym", "liberação miofascial"],

  images: [
    "https://m.media-amazon.com/images/I/41--v9Qam7L._AC_UL320_.jpg"
  ],

  price: {
    formatted: "R$ 79,90",
    amount: 79.9,
    currency: "BRL"
  },

  availability: "InStock",
  rating: 4.5,
  reviewsCount: 650,

  shortDescription:
    "Rolo de espuma de alta densidade para liberação miofascial, alongamentos e mobilidade.",

  excerpt:
    "Foam Roller 30cm: ideal para liberação miofascial, aquecimento e core. Superfície texturizada para massagear pontos de tensão.",

  // descrição longa em texto simples (sem HTML)
  description:
    "Rolo resistente para uso pré e pós-treino — melhora flexibilidade e reduz dores ocasionadas por tensão muscular.",

  features: [
    "30cm x 14cm",
    "Alta densidade",
    "Textura para maior estímulo",
    "Resistente à abrasão e água"
  ],

  dimensions: {
    length: "30 cm",
    diameter: "14 cm",
    weight: "0.6 kg"
  },

  color: "Preto",

  affiliate: {
    affiliateLink: "https://amzn.to/EXAMPLE-FOAM-ROLLER"
  },

  createdAt: "2025-12-01",
  updatedAt: "2025-12-01"
};

export default product;
