// src/data/products/cozinha-saudavel/airfryer-compacta.js
const product = {
  // Identificadores padrão (pronto para receber da Amazon API)
  id: "airfryer-compacta-4l",
  ASIN: "B08EXAMPLE01",
  sku: "KITCHEN-AF-4L",
  title: "Airfryer Compacta 4L - Cesto Antiaderente, 1500W",
  brand: "CookFast",
  manufacturer: "CookFast Ind. E Com.",
  category: "cozinha-saudavel",
  subcategory: "airfryer",
  // imagens (API da Amazon normalmente traz várias)
  images: [
    "https://images.pexels.com/photos/5758458/pexels-photo-5758458.jpeg",
    "https://images.pexels.com/photos/5108693/pexels-photo-5108693.jpeg"
  ],
  // preço já formatado + campos prontos
  price: "R$ 499.90",
  priceAmount: 499.9,
  currency: "BRL",
  availability: "in_stock",
  rating: 4.5,
  reviewsCount: 1123,
  // descrição curta para cards
  shortDescription: "Airfryer 4L compacta: frita, assa e grelha com menos óleo — ideal para porções individuais/família pequena.",
  excerpt: "Airfryer compacta 4L com cesto antiaderente e painel digital — cozimento rápido, saudável e fácil de limpar. Potência de 1500W.",
  features: [
    "Capacidade 4 litros",
    "Potência 1500W",
    "Painel digital com timer e controle de temperatura",
    "Cesto antiaderente removível e lavável",
    "Cozinha rápida com até 80% menos óleo"
  ],
  description:
    "<h2>Airfryer Compacta 4L</h2><p>Perfeita para quem quer preparar refeições mais saudáveis sem abrir mão do sabor. Ideal para batatas, nuggets, legumes e pequenas porções.</p>",
  affiliateLink: "https://amzn.to/EXAMPLE-AF-4L",
  // informações logística / produto
  dimensions: { width: "28cm", height: "32cm", depth: "30cm" },
  weight: "4.2 kg",
  color: "Preto",
  tags: ["airfryer", "cozinha-saudavel", "equipamentos"],
  createdAt: "2025-12-01",
  updatedAt: "2025-12-01",
};

export default product;
