// src/data/products/complexoB.js
// Produto padronizado (Amazon-API-ready) — Complexo B

const complexoB = {
  id: "complexo-b-30tabs",
  ASIN: "B07COMPLEXOB",
  asin: "B07COMPLEXOB",
  marketplaceId: "BR",
  sku: "COMPLEXO-B-30",
  slug: "complexo-b-energymax-30-comprimidos",

  name: "Complexo B - EnergyMax (30 comprimidos)",
  title: "Complexo B - EnergyMax (30 comprimidos)",
  brand: "EnergyMax",
  manufacturer: "EnergyMax Labs",
  category: "vitaminas",
  categoriesTree: ["Saúde", "Vitaminas & Suplementos"],
  tags: ["complexo B", "energia", "metabolismo", "vitaminas"],

  price: {
    currency: "BRL",
    formatted: "R$ 44,50",
    amount: 44.5
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B07COMPLEXOB?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/61dnyb09rHL._AC_SY300_.jpg",
    "https://m.media-amazon.com/images/I/61dnyb09rHL._AC_SX300_.jpg"
  ],

  shortDescription: "Complexo B completo para energia, metabolismo e bem-estar diário.",
  excerpt:
    "Complexo B com todas as vitaminas do grupo B para suporte ao metabolismo, energia e função neurológica — fórmula de 30 comprimidos.",

  // descrição longa — Texto simples (SEM HTML)
  description:
    "Complexo B desenvolvido para apoiar a produção de energia, saúde neurológica e função metabólica. Ideal para quem busca suporte energético durante treinos e rotina intensa.\n\n- Contém B1, B2, B3, B5, B6, B7, B9 e B12\n- Quantidade: 30 comprimidos\n- Sem corantes artificiais",

  features: [
    "Completo em vitaminas do complexo B",
    "Fórmula para suporte energético",
    "Embalagem prática com 30 comprimidos",
    "Sem corantes artificiais"
  ],

  dimensions: {
    weight: "aprox. 100 g (embalagem)"
  },

  rating: 4.5,
  reviewsCount: 830,

  affiliate: {
    affiliateLink: "https://amzn.to/41rAlpw",
    trackingTag: "seu-affid"
  },

  seo: {
    metaTitle: "Complexo B — Energia e Metabolismo | EnergyMax",
    metaDescription:
      "Complexo B completo (B1-B12) para suporte ao metabolismo e energia diária. Embalagem com 30 comprimidos."
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23"
};

export default complexoB;
