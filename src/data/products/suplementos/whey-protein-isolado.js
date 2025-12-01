// src/data/products/whey-protein-isolado.js
const wheyProteinIsolado = {
  id: "B08WHEYISO01",
  asin: "B08WHEYISO01",
  slug: "whey-protein-isolado-b08wheyiso01",

  title: "Whey Protein Isolado 900g — UltraPure",
  brand: "UltraPure",
  category: "suplementos",
  subCategory: "proteinas",
  featured: false,
  tags: ["whey", "proteína", "pós-treino"],

  image: {
    small: "https://m.media-amazon.com/images/I/41WHEYISO-small.jpg",
    medium: "https://m.media-amazon.com/images/I/51WHEYISO-medium.jpg",
    large: "https://m.media-amazon.com/images/I/71WHEYISO-large.jpg",
  },

  price: {
    display: "R$ 129,90",
    amount: 129.9,
    currency: "BRL",
    raw: {
      condition: "New",
      merchant: "Amazon.com.br",
      price: {
        amount: 129.9,
        currency: "BRL",
        display: "R$ 129,90"
      },
      offerUrl: "https://www.amazon.com.br/dp/B08WHEYISO01?tag=seuAffiliateTag"
    }
  },

  affiliateLink: "https://www.amazon.com.br/dp/B08WHEYISO01?tag=seuAffiliateTag",

  availability: "InStock",
  rating: 4.6,
  reviews: 3142,

  shortDescription:
    "Proteína isolada de rápida absorção para recuperação muscular.",
  excerpt:
    "Whey protein isolado com alto teor proteico, baixa lactose e rápida absorção — ideal para pós-treino e recuperação muscular eficiente.",

  description: `
    <h2>Whey Protein Isolado UltraPure — 900g</h2>
    <p>Suplemento proteico de alta qualidade, 100% isolado, baixo teor de carboidratos e lactose. Ideal para recuperação pós-treino e construção muscular.</p>

    <h3>Benefícios</h3>
    <ul>
      <li>Rápida absorção e digestão leve;</li>
      <li>Alto teor de proteína por dose (27g);</li>
      <li>Ideal para pós-treino ou complementação proteica;</li>
      <li>Baixa lactose e 0g de açúcar.</li>
    </ul>

    <h3>Como usar</h3>
    <p>Consumir 1 dose (30g) com água gelada ou bebida de preferência. Indicado após o treino ou entre refeições.</p>
  `,

  meta: {
    manufacturer: "UltraPure Nutrition",
    packageWeight: "900g",
    asin: "B08WHEYISO01",
    lastUpdated: "2025-11-30"
  },

  rawAmazon: {
    ASIN: "B08WHEYISO01",
    DetailPageURL: "https://www.amazon.com.br/dp/B08WHEYISO01",
    ItemInfo: {
      Title: { DisplayValue: "Whey Protein Isolado 900g - UltraPure" },
      ByLineInfo: { Brand: { DisplayValue: "UltraPure" } },
      Features: {
        DisplayValues: [
          "Whey isolado de rápida absorção",
          "Baixa lactose",
          "27g de proteína por dose"
        ]
      }
    },
    Images: {
      Primary: {
        Small: { URL: "https://m.media-amazon.com/images/I/41WHEYISO-small.jpg" },
        Medium: { URL: "https://m.media-amazon.com/images/I/51WHEYISO-medium.jpg" },
        Large: { URL: "https://m.media-amazon.com/images/I/71WHEYISO-large.jpg" }
      }
    },
    Offers: {
      Listings: [
        {
          Price: {
            DisplayAmount: "R$ 129,90",
            Amount: 129.9,
            Currency: "BRL"
          },
          Availability: { Type: "NOW" },
          MerchantInfo: { Name: "Amazon" }
        }
      ]
    },
    CustomerReviews: {
      StarRating: 4.6,
      TotalReviewCount: 3142
    }
  }
};

export default wheyProteinIsolado;
