// src/data/products/creatina.js
const creatina = {
  // id único interno (usar ASIN quando disponível facilita atualizações)
  id: "B08CREATINA01",
  asin: "B08CREATINA01",
  slug: "creatina-monohidratada-b08creatina01",

  // informações principais
  title: "Creatina Monohidratada 300g — PureStrength",
  brand: "PureStrength",
  category: "suplementos",
  subCategory: "performance",
  featured: false,
  tags: ["creatina", "força", "pós-treino"],

  // imagens (tamanhos diferentes para cards / listagens)
  image: {
    small: "https://m.media-amazon.com/images/I/41CREATINA-small.jpg",
    medium: "https://m.media-amazon.com/images/I/51CREATINA-medium.jpg",
    large: "https://m.media-amazon.com/images/I/71CREATINA-large.jpg",
  },

  // preço normalizado (display + número para filtros/ordenacao)
  price: {
    display: "R$ 55,90",
    amount: 55.9,
    currency: "BRL",
    // raw: estrutura de oferta recebida da API (simulada aqui)
    raw: {
      condition: "New",
      merchant: "Amazon.com.br",
      price: { amount: 55.9, currency: "BRL", display: "R$ 55,90" },
      offerUrl: "https://www.amazon.com.br/dp/B08CREATINA01?tag=seuAffiliateTag"
    },
  },

  // link com tag de afiliado (pré-formatado)
  affiliateLink: "https://www.amazon.com.br/dp/B08CREATINA01?tag=seuAffiliateTag",

  // disponibilidade e avaliações
  availability: "InStock",
  rating: 4.5,
  reviews: 1243,

  // textos curtos para cards / listagens
  shortDescription: "Creatina monohidratada micronizada para força e recuperação muscular.",
  excerpt:
    "Creatina monohidratada 100% pura — aumenta força, potência e recuperação pós-treino. Ideal para atletas e praticantes de força. (300g).",

  // descrição longa (HTML)
  description: `
    <h2>Creatina Monohidratada PureStrength — 300g</h2>
    <p>Creatina monohidratada micronizada, formula pura e sem aditivos. Suporta aumento de força, explosão e melhora da recuperação entre séries. Indicada para treino de resistência e alta intensidade.</p>
    <h3>Benefícios</h3>
    <ul>
      <li>Aumento de força e rendimento nos treinos;</li>
      <li>Melhora da recuperação muscular;</li>
      <li>Fácil dissolução e sem sabor residual;</li>
      <li>Rendimento aproximado: 60 porções (5g).</li>
    </ul>
    <h3>Modo de usar</h3>
    <p>Tomar 3–5g por dia dissolvidos em água ou suco. Não exceder a dose recomendada. Consulte um profissional de saúde em caso de dúvidas.</p>
  `,

  // metadados úteis
  meta: {
    manufacturer: "PureStrength Labs",
    packageWeight: "300g",
    asin: "B08CREATINA01",
    lastUpdated: "2025-11-30"
  },

  // guarda o payload cru da Amazon (aqui preenchido com um mock para visualização)
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
