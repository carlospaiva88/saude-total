// src/data/products/creatina.js
const creatina = {
  id: "B08CREATINA01",
  asin: "B08CREATINA01",
  slug: "creatina-monohidratada-b08creatina01",

  title: "Creatina Monohidratada 300g — PureStrength",
  brand: "PureStrength",
  category: "suplementos",
  subCategory: "performance",
  featured: false,
  tags: ["creatina", "força", "pós-treino"],

    images: [
  "https://m.media-amazon.com/images/I/61-h7jr6OnL._AC_UL320_.jpg"
  ],

  price: {
    display: "R$ 55,90",
    amount: 55.9,
    currency: "BRL",
    raw: {
      condition: "New",
      merchant: "Amazon.com.br",
      price: { amount: 55.9, currency: "BRL", display: "R$ 55,90" },
      offerUrl: "https://www.amazon.com.br/dp/B08CREATINA01?tag=seuAffiliateTag"
    }
  },

  affiliateLink: "https://www.amazon.com.br/dp/B08CREATINA01?tag=seuAffiliateTag",

  availability: "InStock",
  rating: 4.5,
  reviews: 1243,

  shortDescription: "Creatina monohidratada micronizada para força e recuperação muscular.",
  excerpt:
    "Creatina monohidratada 100% pura — aumenta força, potência e recuperação pós-treino. Ideal para atletas e praticantes de força (300 g).",

  // descrição longa — string simples (sem HTML)
  description:
    "Creatina Monohidratada PureStrength (300 g) — micronizada para melhor dissolução e absorção. Suporta aumento de força, potência e melhora da recuperação entre séries. Recomenda-se 3–5 g por dia, conforme orientação profissional.",

  meta: {
    manufacturer: "PureStrength Labs",
    packageWeight: "300g",
    asin: "B08CREATINA01",
    lastUpdated: "2025-12-01"
  },

  rawAmazon: {
    ASIN: "B08CREATINA01",
    DetailPageURL: "https://www.amazon.com.br/dp/B08CREATINA01",
    ItemInfo: {
      Title: { DisplayValue: "Creatina Monohidratada 300g - PureStrength" },
      ByLineInfo: { Brand: { DisplayValue: "PureStrength" } },
      Features: { DisplayValues: ["Creatina 100% pura", "Micronizada para melhor dissolução"] }
    },
    Images: {
      Primary: {
        Small: { URL: "https://m.media-amazon.com/images/I/41CREATINA-small.jpg" },
        Medium: { URL: "https://m.media-amazon.com/images/I/51CREATINA-medium.jpg" },
        Large: { URL: "https://m.media-amazon.com/images/I/71CREATINA-large.jpg" }
      }
    },
    Offers: {
      Listings: [
        {
          Price: { DisplayAmount: "R$ 55,90", Amount: 55.9, Currency: "BRL" },
          Availability: { Type: "NOW" },
          MerchantInfo: { Name: "Amazon" }
        }
      ]
    },
    CustomerReviews: { StarRating: 4.5, TotalReviewCount: 1243 }
  }
};

export default creatina;
