// src/data/products/bcaa.js
const bcaa = {
  id: "B08BCAA90001",
  asin: "B08BCAA90001",
  slug: "bcaa-4-1-1-b08bcaa90001",

  title: "BCAA 4:1:1 120 Cáps — Recovery Max",
  brand: "Recovery Max",
  category: "suplementos",
  subCategory: "aminoacidos",
  featured: false,
  tags: ["bcaa", "aminoácidos", "recuperação", "pós-treino"],

  image: {
    small: "https://m.media-amazon.com/images/I/41BCAA-small.jpg",
    medium: "https://m.media-amazon.com/images/I/51BCAA-medium.jpg",
    large: "https://m.media-amazon.com/images/I/71BCAA-large.jpg",
  },

  price: {
    display: "R$ 79,90",
    amount: 79.9,
    currency: "BRL",
    raw: {
      condition: "New",
      merchant: "Amazon.com.br",
      price: {
        amount: 79.9,
        currency: "BRL",
        display: "R$ 79,90"
      },
      offerUrl: "https://www.amazon.com.br/dp/B08BCAA90001?tag=seuAffiliateTag"
    }
  },

  affiliateLink: "https://www.amazon.com.br/dp/B08BCAA90001?tag=seuAffiliateTag",

  availability: "InStock",
  rating: 4.4,
  reviews: 2219,

  shortDescription:
    "Aminoácidos essenciais para recuperar e reduzir fadiga.",
  excerpt:
    "BCAA 4:1:1 com alta concentração de leucina — ideal para recuperação muscular, diminuição da fadiga e síntese proteica após treinos intensos.",

  description: `
    <h2>BCAA 4:1:1 Recovery Max — 120 Cápsulas</h2>
    <p>Fórmula concentrada com proporção 4:1:1 (Leucina, Isoleucina e Valina), essencial para recuperação muscular e redução da fadiga pós-treino.</p>

    <h3>Benefícios</h3>
    <ul>
      <li>Ajuda na recuperação muscular;</li>
      <li>Diminui a fadiga durante treinos intensos;</li>
      <li>Alta concentração de leucina;</li>
      <li>Auxilia na síntese proteica e crescimento muscular.</li>
    </ul>

    <h3>Como usar</h3>
    <p>Consumir 2 a 4 cápsulas antes ou após o treino, conforme recomendação profissional.</p>
  `,

  meta: {
    manufacturer: "Recovery Max Labs",
    packageWeight: "120 cápsulas",
    asin: "B08BCAA90001",
    lastUpdated: "2025-11-30"
  },

  rawAmazon: {
    ASIN: "B08BCAA90001",
    DetailPageURL: "https://www.amazon.com.br/dp/B08BCAA90001",
    ItemInfo: {
      Title: { DisplayValue: "BCAA 4:1:1 120 Cáps — Recovery Max" },
      ByLineInfo: { Brand: { DisplayValue: "Recovery Max" } },
      Features: {
        DisplayValues: [
          "Alta concentração de leucina (4:1:1)",
          "Auxilia na recuperação muscular",
          "Reduz fadiga e melhora resistência"
        ]
      }
    },
    Images: {
      Primary: {
        Small: { URL: "https://m.media-amazon.com/images/I/41BCAA-small.jpg" },
        Medium: { URL: "https://m.media-amazon.com/images/I/51BCAA-medium.jpg" },
        Large: { URL: "https://m.media-amazon.com/images/I/71BCAA-large.jpg" }
      }
    },
    Offers: {
      Listings: [
        {
          Price: {
            DisplayAmount: "R$ 79,90",
            Amount: 79.9,
            Currency: "BRL"
          },
          Availability: { Type: "NOW" },
          MerchantInfo: { Name: "Amazon" }
        }
      ]
    },
    CustomerReviews: {
      StarRating: 4.4,
      TotalReviewCount: 2219
    }
  }
};

export default bcaa;
