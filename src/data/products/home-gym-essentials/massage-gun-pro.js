// src/data/products/home-gym-essentials/massage-gun-pro.js
// Produto padronizado (Amazon-API-ready) — Massage Gun Pro

const product = {
  id: "massage-gun-pro",
  ASIN: "B0MASSGUN01",
  asin: "B0MASSGUN01",
  sku: "HG-MG-PRO",
  slug: "massage-gun-pro-muscleease",

  name: "Massage Gun Pro - 6 Modos, 5 Cabeças",
  title: "Massage Gun Pro - 6 Modos, 5 Cabeças",
  brand: "MuscleEase",

  category: "home-gym-essentials",
  subcategory: "massage-gun",
  tags: ["massagem", "recuperação muscular", "theragun", "home-gym"],

  images: [
   "https://m.media-amazon.com/images/I/71pZFtC+FLL._AC_UL320_.jpg"
  ],

  price: {
    formatted: "R$ 449,00",
    amount: 449.0,
    currency: "BRL"
  },

  availability: "InStock",
  rating: 4.6,
  reviewsCount: 2140,

  shortDescription:
    "Massage gun portátil com 6 níveis de intensidade e 5 cabeças intercambiáveis — alívio rápido de tensões.",

  excerpt:
    "Massage Gun Pro: 6 modos, 5 cabeças e bateria de longa duração para recuperação pós-treino e alívio muscular.",

  // descrição convertida de HTML → texto simples
  description:
    "Massage Gun Pro com múltiplas velocidades e cabeças específicas para diferentes grupos musculares. Proporciona alívio profundo e recuperação acelerada após treinos intensos.",

  features: [
    "6 níveis de intensidade",
    "5 cabeças intercambiáveis",
    "Bateria 2500mAh — até 6 horas de uso",
    "Design ergonômico e leve"
  ],

  dimensions: {
    weight: "0.85 kg"
  },

  color: "Preto",

  affiliate: {
    affiliateLink: "https://amzn.to/EXAMPLE-MASSAGE-GUN"
  },

  createdAt: "2025-12-01",
  updatedAt: "2025-12-01"
};

export default product;
