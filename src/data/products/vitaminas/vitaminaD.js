// src/data/products/vitaminaD.js
// Produto padronizado (Amazon-API-ready)

const vitaminaD = {
  id: "vitamina-d-2000ui",
  ASIN: "B07VITD2000",
  marketplaceId: "BR",
  sku: "VITD-2000UI",

  name: "Vitamina D3 2000 UI - SunHealth",
  brand: "SunHealth",
  manufacturer: "SunHealth Labs",
  category: ["Vitaminas", "Vitamina D"],
  categoriesTree: ["Saúde", "Vitaminas & Suplementos"],

  price: {
    currency: "BRL",
    formatted: "R$ 49,90",
    amount: 49.9,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B07VITD2000?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/51njnfeVaXL._AC_SY300_.jpg",
    "https://m.media-amazon.com/images/I/51njnfeVaXL._AC_SX300_.jpg",
  ],

  shortDescription: "Vitamina D3 2000 UI para suporte ósseo, imunológico e bem-estar geral.",
  excerpt:
    "Vitamina D3 2000 UI — promove absorção de cálcio, suporte imunológico e saúde óssea. Cápsulas fáceis de ingerir.",

  description:
    "<p>Vitamina D3 (colecalciferol) em cápsulas — fórmula de alta absorção indicada para suplementação diária, especialmente em pessoas com exposição solar reduzida.</p>" +
    "<ul>" +
    "<li>Dosagem: 2000 UI por cápsula</li>" +
    "<li>Quantidade: 60 cápsulas</li>" +
    "<li>Sem glúten</li>" +
    "</ul>",

  features: [
    "2000 UI por cápsula",
    "Alta taxa de absorção",
    "Embalagem com 60 cápsulas",
    "Sem glúten e sem lactose",
  ],

  dimensions: {
    weight: "aprox. 120 g (embalagem)",
  },

  rating: 4.7,
  reviewsCount: 2123,

  affiliate: {
    affiliateLink: "https://amzn.to/47Pr0M3",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Vitamina D3 2000 UI — Suporte Ósseo e Imunológico",
    metaDescription:
      "Vitamina D3 2000 UI em cápsulas — apoio à absorção de cálcio, saúde óssea e imunidade. Embalagem com 60 cápsulas.",
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23",
};

export default vitaminaD;
