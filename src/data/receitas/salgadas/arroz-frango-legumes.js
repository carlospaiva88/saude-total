// src/data/receitas/salgadas/arroz-frango-legumes.js
const arrozFrangoLegumes = {
  slug: "arroz-frango-legumes",
  titulo: "Arroz Integral com Frango e Legumes",
  imagem: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  tempo: "25 min",
  calorias: 420,
  categoria: "Salgadas",
  descricaoCurta: "Prato completo, nutritivo e perfeito para o dia a dia.",
  // resumo curto para cards / listagens
  shortDescription: "Arroz integral com peito de frango e legumes — refeição balanceada, prática e ideal para marmitas.",
  // excerpt para carousels / listagens (máx ~140 chars)
  excerpt: "Arroz integral com frango e legumes: prato nutritivo, fácil de preparar e perfeito para refeições do dia a dia.",
  ingredientes: [
    "1 xícara de arroz integral cozido",
    "200g de peito de frango em cubos",
    "1 xícara de brócolis picado",
    "1/2 cenoura fatiada",
    "1 colher (sopa) de azeite",
    "Sal, alho e pimenta a gosto"
  ],
  instrucoes: [
    "Refogue o frango no azeite até dourar.",
    "Adicione os legumes e cozinhe por 5 minutos.",
    "Misture com o arroz cozido e tempere.",
    "Sirva quente."
  ],
  porcoes: 2,
  dificuldade: "médio",
  product: {
    name: "Panela antiaderente 24cm",
    image: "https://m.media-amazon.com/images/I/61example.jpg",
    price: "129.90",
    link: "https://amzn.to/exemplo",
    rating: "4.6",
    reviews: 1024
  },
  seo: {
    metaTitle: "Arroz Integral com Frango e Legumes — Receita Saudável",
    metaDescription: "Receita prática de arroz integral com frango e legumes — ideal para marmitas e refeições equilibradas."
  },
  cta: "Prepare para a semana e economize tempo — salve essa receita!",
  variacoes: ["Versão vegetariana: substitua frango por tofu grelhado.", "Adicione ervas frescas para aroma."],
  nutritional: { calories: 420, protein: 32, carbs: 46, fat: 12 },
};

export default arrozFrangoLegumes;
