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

  images: [
    "https://m.media-amazon.com/images/I/51lOuKbCawL._AC_UL320_.jpg"
   ],

  price: {
    display: "R$ 129,90",
    amount: 129.9,
    currency: "BRL",
    raw: {
      condition: "New",
      merchant: "Amazon.com.br",
      price: { amount: 129.9, currency: "BRL", display: "R$ 129,90" },
      offerUrl: "https://www.amazon.com.br/dp/B08WHEYISO01?tag=seuAffiliateTag"
    }
  },

  affiliateLink: "https://www.amazon.com.br/dp/B08WHEYISO01?tag=seuAffiliateTag",

  availability: "InStock",
  rating: 4.6,
  reviews: 3142,

  shortDescription: "Proteína isolada de rápida absorção para recuperação muscular.",
  excerpt:
    "Whey protein isolado com alto teor proteico, baixa lactose e rápida absorção — ideal para pós-treino e recuperação muscular eficiente.",

  // descrição longa — string simples (sem HTML)
  description:
    "Whey Protein Isolado UltraPure (900g) é um suplemento proteico de alta qualidade, formulado para rápida absorção e digestão leve. Ideal para recuperação pós-treino e construção muscular. Cada dose contém aproximadamente 27 g de proteína. Produto com baixo teor de carboidratos e lactose reduzida.",

  meta: {
    manufacturer: "UltraPure Nutrition",
    packageWeight: "900g",
    asin: "B08WHEYISO01",
    lastUpdated: "2025-12-01"
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
          Price: { DisplayAmount: "R$ 129,90", Amount: 129.9, Currency: "BRL" },
          Availability: { Type: "NOW" },
          MerchantInfo: { Name: "Amazon" }
        }
      ]
    },
    CustomerReviews: { StarRating: 4.6, TotalReviewCount: 3142 }
  }
};

export default wheyProteinIsolado;
