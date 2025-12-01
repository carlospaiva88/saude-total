// src/data/products/bolaExercicio.js
// Produto padronizado (Amazon-API-ready)

const bolaExercicio = {
  id: "bola-exercicio-65cm",
  ASIN: "B07BOLA65CM",
  marketplaceId: "BR",
  sku: "BOLA-EXER-65",

  name: "Bola de Exercício 65cm - Balance Pro",
  brand: "Balance Pro",
  manufacturer: "Balance Pro Fitness",
  category: ["Acessórios", "Bolas de Exercício"],
  categoriesTree: ["Fitness", "Exercise Balls"],

  price: {
    currency: "BRL",
    formatted: "R$ 89,50",
    amount: 89.5,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B07BOLA65CM?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/51tghMwuMYL._AC_SX425_.jpg",
    "https://m.media-amazon.com/images/I/51tghMwuMYL._AC_SY300_.jpg",
  ],

  shortDescription: "Bola de exercício antiestouro 65cm — ideal para pilates, core e alongamento.",
  excerpt:
    "Bola de exercício resistente e antiderrapante (65cm) para treinos de estabilidade, pilates e alongamentos.",

  description:
    "<p>Bola de exercício Balance Pro com tecnologia antiestouro e superfície antiderrapante. Perfeita para exercícios de core, pilates, alongamento e ergonomia de assento.</p>" +
    "<ul>" +
    "<li>Diâmetro: 65 cm (ideal para altura 160–175 cm)</li>" +
    "<li>Material PVC de alta resistência</li>" +
    "<li>Inclui bomba manual e kit de reparo</li>" +
    "</ul>",

  features: [
    "Tecnologia antiestouro",
    "Superfície antiderrapante",
    "Inclui bomba e kit de reparo",
    "Uso para treino e ergonomia",
  ],

  dimensions: {
    diameter: "65 cm",
    weight: "aprox. 800 g",
  },

  rating: 4.5,
  reviewsCount: 2130,

  affiliate: {
    affiliateLink: "https://amzn.to/47cFHZw",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Bola de Exercício 65cm — Balance Pro",
    metaDescription:
      "Bola de exercício antiestouro e antiderrapante. Ideal para pilates, treino de core e ergonomia no trabalho.",
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23",
};

export default bolaExercicio;
