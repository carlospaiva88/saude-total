// src/data/products/colchoneteYoga.js
// Produto padronizado (Amazon-API-ready)

const colchoneteYoga = {
  id: "colchonete-yoga-eco",
  ASIN: "B07COLCHONETE",
  marketplaceId: "BR",
  sku: "COLCH-YOGA-ECO",

  name: "Colchonete para Yoga Antiderrapante 6mm",
  brand: "ZenMat",
  manufacturer: "ZenMat Brasil",
  category: ["Acessórios", "Yoga"],
  categoriesTree: ["Fitness", "Yoga & Pilates"],

  price: {
    currency: "BRL",
    formatted: "R$ 49,90",
    amount: 49.9,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B07COLCHONETE?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/51Oj-FOI9hS._AC_SX569_.jpg",
    "https://m.media-amazon.com/images/I/51Oj-FOI9hS._AC_SY300_.jpg",
  ],

  shortDescription: "Colchonete antiderrapante 6mm — conforto e suporte para yoga e pilates.",
  excerpt:
    "Tapete de yoga 6mm com superfície antiderrapante, ideal para posturas, alongamentos e práticas diárias sem escorregar.",

  description:
    "<p>Colchonete ZenMat com 6mm de espessura oferece amortecimento adequado e aderência superior. Material leve, fácil de limpar e perfeito tanto para iniciantes quanto para praticantes experientes.</p>" +
    "<ul>" +
    "<li>Espessura: 6 mm</li>" +
    "<li>Material: TPE ecológico, livre de látex</li>" +
    "<li>Inclui alça para transporte</li>" +
    "</ul>",

  features: [
    "Superfície antiderrapante",
    "Espessura ideal de 6mm",
    "Material ecológico TPE",
    "Fácil de limpar e transportar",
  ],

  dimensions: {
    length: "183 cm",
    width: "61 cm",
    thickness: "6 mm",
    weight: "aprox. 900 g",
  },

  rating: 4.5,
  reviewsCount: 2745,

  affiliate: {
    affiliateLink: "https://amzn.to/3UMlhPH",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Colchonete Yoga 6mm — Antiderrapante e Ecológico",
    metaDescription:
      "Tapete de yoga ZenMat (6mm) com alta aderência e conforto — ideal para yoga, pilates e alongamentos diários.",
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23",
};

export default colchoneteYoga;
