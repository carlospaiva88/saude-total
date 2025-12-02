// src/data/products/cozinha-saudavel/mixer-immersion.js
// Produto padronizado (Amazon-API-ready) — Mixer de Mão 600W

const product = {
  id: "mixer-immersion-600w",
  ASIN: "B09EXAMPLE03",
  asin: "B09EXAMPLE03",
  sku: "KITCHEN-MX-600",
  slug: "mixer-immersion-600w-handycook",

  name: "Mixer de Mão 600W - Acessórios Inclusos",
  title: "Mixer de Mão 600W - Acessórios Inclusos",
  brand: "HandyCook",
  manufacturer: "HandyCook Ltda",

  category: "cozinha-saudavel",
  subcategory: "mixer",
  tags: ["mixer", "hand-blender", "cozinha-saudavel", "culinária saudável"],

  images: [
      "https://m.media-amazon.com/images/I/41Y-o4nYlWL._AC_UL320_.jpg"

  ],

  price: {
    formatted: "R$ 199,90",
    amount: 199.9,
    currency: "BRL"
  },

  availability: "InStock",
  rating: 4.4,
  reviewsCount: 654,

  shortDescription:
    "Mixer de mão 600W com copo medidor e batedor — prático para sopas, molhos e shakes.",

  excerpt:
    "Mixer de imersão 600W com acessórios (batedor, copo medidor e lâmina) — ideal para preparo rápido e limpeza fácil.",

  // descrição convertida para texto simples (sem HTML)
  description:
    "Mixer de mão 600W ideal para preparar sopas, molhos, purês e shakes rapidamente. Acompanha acessório batedor, copo medidor e lâmina em inox. Compacto, leve e fácil de guardar.",

  features: [
    "Motor 600W",
    "Acessórios: batedor, copo medidor e corpo inox",
    "Design ergonômico e leve",
    "Peças laváveis em lava-louças"
  ],

  dimensions: { length: "38cm", width: "6cm", depth: "6cm" },
  weight: "0.9 kg",
  color: "Branco/Prata",

  affiliate: {
    affiliateLink: "https://amzn.to/EXAMPLE-MX-600"
  },

  createdAt: "2025-12-01",
  updatedAt: "2025-12-01"
};

export default product;
