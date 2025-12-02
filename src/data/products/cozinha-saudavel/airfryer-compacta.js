// src/data/products/cozinha-saudavel/airfryer-compacta.js
// Produto padronizado (Amazon-API-ready) — Airfryer Compacta 4L

const product = {
  id: "airfryer-compacta-4l",
  ASIN: "B08EXAMPLE01",
  asin: "B08EXAMPLE01",
  sku: "KITCHEN-AF-4L",
  slug: "airfryer-compacta-4l-cookfast",

  name: "Airfryer Compacta 4L - Cesto Antiaderente, 1500W",
  title: "Airfryer Compacta 4L - Cesto Antiaderente, 1500W",
  brand: "CookFast",
  manufacturer: "CookFast Ind. E Com.",

  category: "cozinha-saudavel",
  subcategory: "airfryer",
  tags: ["airfryer", "cozinha-saudavel", "equipamentos"],

  images: [
    "https://m.media-amazon.com/images/I/51G4AxVAJxL._AC_UL320_.jpg"
  ],

  price: {
    formatted: "R$ 499,90",
    amount: 499.9,
    currency: "BRL"
  },

  availability: "InStock",
  rating: 4.5,
  reviewsCount: 1123,

  shortDescription:
    "Airfryer 4L compacta: frita, assa e grelha com menos óleo — ideal para porções individuais ou família pequena.",

  excerpt:
    "Airfryer compacta 4L com cesto antiaderente e painel digital — cozimento rápido, saudável e fácil de limpar. Potência de 1500W.",

  // descrição convertida para texto simples (sem HTML)
  description:
    "Airfryer Compacta 4L perfeita para preparar refeições mais saudáveis sem perder o sabor. Ideal para batatas, nuggets, legumes e pequenas porções. Possui cesto antiaderente, painel digital e cozimento rápido com até 80% menos óleo.",

  features: [
    "Capacidade 4 litros",
    "Potência 1500W",
    "Painel digital com timer e controle de temperatura",
    "Cesto antiaderente removível e lavável",
    "Cozinha rápida com até 80% menos óleo"
  ],

  dimensions: { width: "28cm", height: "32cm", depth: "30cm" },
  weight: "4.2 kg",
  color: "Preto",

  affiliate: {
    affiliateLink: "https://amzn.to/EXAMPLE-AF-4L"
  },

  createdAt: "2025-12-01",
  updatedAt: "2025-12-01"
};

export default product;
