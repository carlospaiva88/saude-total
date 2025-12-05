// src/data/receitas/salgadas/salmao-limao-alho.js
const salmaoLimaoAlho = {
  slug: "salmao-limao-alho",
  titulo: "Salmão Grelhado com Limão e Alho",
  imagem: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
  tempo: "20 min",
  porcoes: 2,
  categoria: "Salgadas",
  dificuldade: "fácil",

  descricaoCurta:
    "Filés de salmão suculentos com crosta de alho e toque cítrico do limão — preparo rápido e sofisticado.",
  shortDescription:
    "Salmão grelhado ao alho e limão: prato rápido, rico em ômega-3 e perfeito para um jantar nutritivo.",
  excerpt:
    "Salmão grelhado com alho e limão: sabor intenso, textura macia e preparo em poucos minutos.",

  ingredientes: [
    "2 filés de salmão (cerca de 150–180 g cada)",
    "2 colheres (sopa) de azeite de oliva",
    "2 dentes de alho picados",
    "Suco de 1 limão",
    "Raspas de 1/2 limão",
    "Sal e pimenta-do-reino a gosto",
    "Salsinha ou coentro picado para finalizar"
  ],

  instrucoes: [
    "Tempere os filés com sal, pimenta, suco de limão e raspas. Deixe marinar por 5–10 minutos.",
    "Aqueça o azeite em frigideira antiaderente em fogo médio-alto. Adicione o alho e doure rapidamente (cuidado para não queimar).",
    "Grelhe os filés com a pele para baixo por 3–4 minutos, vire e cozinhe mais 2–3 minutos (dependendo da espessura) até o ponto desejado.",
    "Regue com o suco de limão restante e finalize com salsinha picada antes de servir."
  ],

  product: {
    name: "Frigideira antiaderente 28 cm",
    image: "https://m.media-amazon.com/images/I/71example-frypan.jpg",
    price: "149.90",
    link: "https://amzn.to/exemplo",
    rating: "4.7",
    reviews: 860
  },

  seo: {
    metaTitle: "Salmão Grelhado com Limão e Alho — Receita Rápida e Saudável",
    metaDescription:
      "Salmão grelhado ao alho e limão: preparo rápido, suculento e cheio de ômega-3 — ideal para jantares nutritivos."
  },

  variacoes: [
    "Faça no forno se preferir: asse a 200°C por 10–12 minutos.",
    "Use molho de iogurte com ervas para acompanhar."
  ],

  cta: "Rápido, elegante e nutritivo — ótimo para um jantar especial em dias da semana!",

  // NUTRIÇÃO (por porção — aproximado)
  nutritional: {
    calories: 360,
    protein: 34,
    carbs: 2,
    fat: 23,
    fiber: 0.5
  },

  conteudo: `
    <h2>Benefícios do salmão</h2>
    <p>O salmão é uma excelente fonte de proteína de alta qualidade e ácidos graxos ômega-3, importantes para a saúde cardiovascular e cerebral. O preparo simples preserva sabor e nutrientes.</p>
    <p>Dica: não cozinhe demais para manter a textura macia e suculenta.</p>
  `
};

export default salmaoLimaoAlho;
