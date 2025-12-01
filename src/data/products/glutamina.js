// src/data/products/glutamina.js
// Produto padronizado (Amazon-API-ready)

const glutamina = {
  id: "glutamina-300g",
  ASIN: "B08GLUTA300",
  marketplaceId: "BR",
  sku: "GLUTA-300G-VPN",

  name: "Glutamina 300g - Pure Recovery",
  brand: "Pure Recovery Labs",
  manufacturer: "Pure Recovery Nutrition",
  category: ["Suplementos", "Aminoácidos"],
  categoriesTree: ["Sports Nutrition", "Amino Acids", "L-Glutamine"],

  price: {
    currency: "BRL",
    formatted: "R$ 69,00",
    amount: 69.0,
  },
  availability: "InStock",

  detailPageURL: "https://www.amazon.com.br/dp/B08GLUTA300?tag=seu-affid",

  images: [
    "https://m.media-amazon.com/images/I/81dUMPXQYFL._AC_SX522_.jpg",
    "https://m.media-amazon.com/images/I/81dUMPXQYFL._AC_SY300_.jpg",
  ],

  shortDescription: "Aminoácido essencial para recuperação muscular e imunidade.",
  excerpt:
    "Glutamina micronizada para recuperação pós-treino, suporte ao sistema imune e manutenção da massa magra durante treinos intensos.",

  description:
    "<p>Glutamina pura e micronizada, ideal para treinos intensos e suporte imunológico. Ajuda na recuperação muscular e na saúde intestinal.</p>" +
    "<ul>" +
    "<li>5 g por dose</li>" +
    "<li>Alta pureza e solubilidade</li>" +
    "<li>Sem sabor — mistura fácil</li>" +
    "</ul>",

  features: [
    "Glutamina micronizada de alta pureza",
    "Apoio ao sistema imune e recuperação",
    "Ideal para treinos intensos",
    "Zero açúcar, zero glúten",
  ],

  serving: {
    servingSize: "5 g",
    servingsPerContainer: 60,
    suggestedUse: "Misture 1 scoop em água antes ou após o treino.",
  },

  rating: 4.6,
  reviewsCount: 1712,

  affiliate: {
    affiliateLink: "https://amzn.to/4oYKh40",
    trackingTag: "seu-affid",
  },

  seo: {
    metaTitle: "Glutamina Pura 300g — Recuperação e Imunidade",
    metaDescription:
      "Glutamina micronizada de alta pureza para recuperação muscular e suporte imunológico. Ideal para treinos intensos.",
  },

  isFeatured: false,
  createdAt: "2025-11-23",
  updatedAt: "2025-11-23",
};

export default glutamina;
