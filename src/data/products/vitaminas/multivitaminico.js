// src/data/products/multivitaminico.js
// Produto padronizado (Amazon-API-ready) — Multivitamínico

const multivitaminico = {
  id: "multivitaminico-daily-60",
  ASIN: "B09MULTI60",
  marketplaceId: "BR",
  sku: "MULTI-DAILY-60",

  name: "Multivitamínico Daily — 60 cápsulas",
  brand: "WellBeing",
  manufacturer: "WellBeing Nutrition",
  category: ["Vitaminas", "Multivitamínico"],
  categoriesTree: ["Saúde", "Vitaminas & Suplementos"],

  price: {
    currency: "BRL",
    formatted: "R$ 74,90",
    amount: 74.9,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B09MULTI60?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/61NaC7CqvcL._AC_SY300_.jpg",
    "https://m.media-amazon.com/images/I/61NaC7CqvcL._AC_SX300_.jpg",
  ],

  shortDescription: "Multivitamínico completo para suporte diário de energia, imunidade e bem-estar.",
  excerpt:
    "Multivitamínico diário com vitaminas e minerais balanceados — auxílio energético e suporte nutricional para a rotina.",

  description:
    "<p>Fórmula completa de multivitamínicos e minerais para uso diário. Ajuda a preencher lacunas da alimentação e suportar energia e imunidade.</p>" +
    "<ul>" +
    "<li>Inclui vitaminas A, C, D, E, complexo B e minerais essenciais</li>" +
    "<li>Quantidade: 60 cápsulas</li>" +
    "<li>Indicado para adultos</li>" +
    "</ul>",

  features: [
    "Fórmula completa de vitaminas e minerais",
    "60 cápsulas — 1 mês de uso (dose diária)",
    "Sem açúcar e sem glúten",
    "Adequado para rotina ativa",
  ],

  dimensions: {
    weight: "aprox. 220 g (embalagem)",
  },

  rating: 4.4,
  reviewsCount: 987,

  affiliate: {
    affiliateLink: "https://amzn.to/3JBmN4D",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Multivitamínico Daily — Suporte Diário de Energia e Bem-Estar",
    metaDescription:
      "Multivitamínico completo com vitaminas e minerais essenciais — ideal para complementar a dieta e manter energia e imunidade.",
  },

  isFeatured: false,
  createdAt: "2025-11-24",
  updatedAt: "2025-11-24",
};

export default multivitaminico;
