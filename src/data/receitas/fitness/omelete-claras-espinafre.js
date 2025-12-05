// src/data/receitas/fitness/omelete-claras-espinafre.js
const omeleteClarasEspinafre = {
  slug: "omelete-claras-espinafre",
  titulo: "Omelete Proteica de Claras com Espinafre",
  imagem: "https://images.pexels.com/photos/793765/pexels-photo-793765.jpeg",
  tempo: "10 min",
  porcoes: 1,
  categoria: "Fitness",
  dificuldade: "fácil",

  descricaoCurta: "Baixo em calorias, rico em proteínas — ideal para cutting.",
  shortDescription:
    "Omelete leve de claras com espinafre: alto teor proteico, baixo impacto calórico e rápido de preparar.",
  excerpt:
    "Omelete de claras com espinafre: refeição rápida e proteica para manter a saciedade e definição muscular.",

  ingredientes: [
    "4 claras de ovo",
    "1 ovo inteiro",
    "1 xícara de espinafre picado",
    "1 colher (chá) de azeite",
    "Sal e pimenta a gosto"
  ],

  instrucoes: [
    "Bata levemente as claras com o ovo inteiro e tempere.",
    "Aqueça o azeite e refogue o espinafre por 1 minuto.",
    "Despeje a mistura de ovos, cozinhe em fogo baixo, dobre e sirva."
  ],

  product: {
    name: "Frigideira antiaderente 20cm",
    image: "https://m.media-amazon.com/images/I/71G2zKQwW-L._AC_SY355_.jpg",
    price: "59.90",
    link: "https://amzn.to/exemplo",
    rating: "4.7",
    reviews: 812
  },

  seo: {
    metaTitle: "Omelete de Claras com Espinafre — Rápido e Proteico",
    metaDescription:
      "Aprenda a fazer uma omelete proteica com claras e espinafre — ideal para café da manhã ou refeição pós-treino."
  },

  variacoes: [
    "Adicione tomate-cereja para mais sabor.",
    "Misture queijo cottage para aumentar proteína e cremosidade."
  ],

  cta: "Teste hoje no café da manhã e me conta nos comentários!",

  // NUTRIÇÃO (por porção — aproximado)
  nutritional: {
    calories: 190,
    protein: 24,
    carbs: 3,
    fat: 9,
    fiber: 1
  },

  conteudo: `
    <h2>Porque é ótimo para definição</h2>
    <p>Rico em proteína e com pouca gordura, esse omelete ajuda a manter massa magra enquanto controla calorias.</p>
    <p>Combine com uma fonte de carboidrato leve para treinos intensos.</p>
  `
};

export default omeleteClarasEspinafre;
