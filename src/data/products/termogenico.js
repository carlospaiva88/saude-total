// src/data/products/termogenico.js
// Produto padronizado (Amazon-API-ready)

const termogenico = {
  id: "termogenico-natural-60caps",
  ASIN: "B0TERMOGENICO60",
  marketplaceId: "BR",
  sku: "TERMOGENICO-60C-PWR",

  name: "Termogênico Natural 60 Cápsulas - PowerBurn",
  brand: "PowerBurn",
  manufacturer: "PowerBurn Labs",
  category: ["Suplementos", "Termogênicos"],
  categoriesTree: ["Sports Nutrition", "Fat Burners", "Thermogenics"],

  price: {
    currency: "BRL",
    formatted: "R$ 99,00",
    amount: 99.0,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B0TERMOGENICO60?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/515beSfdVnL._AC_SX522_.jpg",
    "https://m.media-amazon.com/images/I/515beSfdVnL._AC_SY300_.jpg",
  ],

  shortDescription: "Fórmula natural para energia e aceleração metabólica.",
  excerpt:
    "Termogênico natural com cafeína, chá verde e gengibre — auxilia na queima de gordura e aumento de energia para treinos intensos.",

  description:
    "<p>Termogênico natural formulado com ingredientes de alta eficácia como cafeína, chá verde e gengibre. Aumenta o gasto calórico e dá mais disposição.</p>" +
    "<ul>" +
    "<li>Acelera o metabolismo</li>" +
    "<li>Aumenta foco e energia</li>" +
    "<li>Com ingredientes naturais</li>" +
    "</ul>",

  features: [
    "Com cafeína e chá verde",
    "Apoia queima de gordura",
    "Energia para treinos intensos",
    "Zero açúcar",
  ],

  serving: {
    servingSize: "2 cápsulas",
    servingsPerContainer: 30,
    suggestedUse: "Consumir 2 cápsulas 30 minutos antes do treino.",
  },

  rating: 4.5,
  reviewsCount: 1250,

  affiliate: {
    affiliateLink: "https://amzn.to/4fUrp1M",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Termogênico Natural — Energia e Queima de Gordura",
    metaDescription:
      "Termogênico natural com cafeína e chá verde para energia e aceleração metabólica. Ideal para treinos e definição.",
  },

  isFeatured: true,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23",
};

export default termogenico;
