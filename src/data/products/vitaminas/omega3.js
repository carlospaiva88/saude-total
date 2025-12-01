// src/data/products/omega3.js
// Produto padronizado (Amazon-API-ready) — Ômega-3

const omega3 = {
  id: "omega-3-1000mg",
  ASIN: "B08OMEGA3",
  marketplaceId: "BR",
  sku: "OMEGA3-1000MG",

  name: "Ômega-3 1000 mg (EPA/DHA) - CardioPlus",
  brand: "CardioPlus",
  manufacturer: "CardioPlus Labs",
  category: ["Vitaminas", "Ômega-3"],
  categoriesTree: ["Saúde", "Vitaminas & Suplementos"],

  price: {
    currency: "BRL",
    formatted: "R$ 59,90",
    amount: 59.9,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B08OMEGA3?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/51lfH7q-tGL._AC_SY300_.jpg",
    "https://m.media-amazon.com/images/I/51lfH7q-tGL._AC_SX300_.jpg",
  ],

  shortDescription: "Ômega-3 com alta concentração de EPA e DHA para saúde cardiovascular e cerebral.",
  excerpt:
    "Ômega-3 (EPA/DHA) 1000 mg — suporte cardiovascular, função cerebral e redução de procesos inflamatórios. Cápsulas de fácil ingestão.",

  description:
    "<p>Suplemento de Ômega-3 em cápsulas com alta concentração de EPA e DHA. Auxilia saúde cardiovascular, função cerebral e controle de processos inflamatórios.</p>" +
    "<ul>" +
    "<li>Concentração: 1000 mg por cápsula</li>" +
    "<li>EPA/DHA combinados: 600 mg</li>" +
    "<li>Quantidade: 60 cápsulas</li>" +
    "</ul>",

  features: [
    "Alta concentração de EPA/DHA",
    "Embalagem com 60 cápsulas",
    "Testado para metais pesados",
    "Softgels de fácil ingestão",
  ],

  dimensions: {
    weight: "aprox. 180 g (embalagem)",
  },

  rating: 4.6,
  reviewsCount: 1540,

  affiliate: {
    affiliateLink: "https://amzn.to/3JFgw82",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Ômega-3 1000 mg (EPA/DHA) — CardioPlus",
    metaDescription:
      "Ômega-3 1000 mg com alta concentração de EPA/DHA — suporte cardiovascular, cerebral e controle inflamatório. Embalagem com 60 cápsulas.",
  },

  isFeatured: false,
  createdAt: "2025-11-24",
  updatedAt: "2025-11-24",
};

export default omega3;
