// src/data/products/preTreino.js
// Produto padronizado (Amazon-API-ready)

const preTreino = {
  id: "pre-treino-energico-300g",
  ASIN: "B0PRETREINO300",
  marketplaceId: "BR",
  sku: "PRE-TREINO-300G-FX",

  name: "Pré-Treino Energético 300g - UltraFocus",
  brand: "UltraFocus Labs",
  manufacturer: "UltraFocus Nutrition",
  category: ["Suplementos", "Pré-treino"],
  categoriesTree: ["Sports Nutrition", "Pre-Workout"],

  price: {
    currency: "BRL",
    formatted: "R$ 89,90",
    amount: 89.9,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B0PRETREINO300?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/61Vu9dlMveL._AC_SY300_SX300_QL70_ML2_.jpg",
    "https://m.media-amazon.com/images/I/61Vu9dlMveL._AC_SX522_.jpg",
  ],

  shortDescription: "Performance, foco e energia para treinos intensos.",
  excerpt:
    "Pré-treino com cafeína, beta-alanina e taurina — aumenta foco, disposição e rendimento nas sessões mais pesadas.",

  description:
    "<p>Pré-treino avançado formulado para maximizar energia e foco. Ideal para quem busca treinos de alta performance.</p>" +
    "<ul>" +
    "<li>200 mg de cafeína por dose</li>" +
    "<li>Com beta-alanina para resistência</li>" +
    "<li>Aumenta foco e explosão</li>" +
    "</ul>",

  features: [
    "Explosão de energia imediata",
    "Com beta-alanina e taurina",
    "Ideal para treinos de força",
    "Sabor frutado refrescante",
  ],

  serving: {
    servingSize: "10 g",
    servingsPerContainer: 30,
    suggestedUse:
      "Misture 1 scoop em 250 ml de água 20–30 minutos antes do treino.",
  },

  rating: 4.4,
  reviewsCount: 980,

  affiliate: {
    affiliateLink: "https://amzn.to/3HT9o7D",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Pré-Treino Energético 300g — Energia e Performance",
    metaDescription:
      "Pré-treino com ingredientes potentes para aumentar foco, energia e explosão muscular.",
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23",
};

export default preTreino;
