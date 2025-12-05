// src/data/receitas/fitness/salada-mediterranea.js
const saladaMediterranea = {
  slug: "salada-mediterranea",
  titulo: "Salada Mediterrânea",
  imagem: "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg",
  tempo: "15 min",
  porcoes: 2,
  categoria: "Almoço Fit",
  dificuldade: "fácil",

  descricaoCurta: "Azeite, azeitonas e tomate seco — leve e colorida.",
  shortDescription:
    "Salada fresca com alface, rúcula, tomate seco, azeitonas e queijo feta — leve e nutritiva.",
  excerpt:
    "Salada mediterrânea com azeite, azeitonas e queijo feta — refeição leve, colorida e cheia de sabor.",

  ingredientes: [
    "Alface e rúcula (a gosto)",
    "Tomate seco (aprox. 50 g)",
    "Azeitonas pretas (aprox. 30 g)",
    "Queijo feta em cubos (60 g)",
    "Azeite de oliva e orégano para temperar"
  ],

  instrucoes: [
    "Monte a salada com alface e rúcula.",
    "Adicione tomate seco, azeitonas e cubos de queijo feta.",
    "Tempere com azeite, orégano, sal e pimenta a gosto."
  ],

  seo: {
    metaTitle: "Salada Mediterrânea — Leve e Saborosa",
    metaDescription:
      "Salada mediterrânea com azeitonas, tomate seco e queijo feta — leve, colorida e deliciosa."
  },

  variacoes: [
    "Adicione grão-de-bico para aumentar proteína e fibras.",
    "Use queijo de cabra para versão mais suave."
  ],

  cta: "Perfeita como acompanhamento ou prato leve — experimente hoje mesmo!",

  // NUTRIÇÃO (por porção — aproximado)
  nutritional: {
    calories: 190,
    protein: 6,
    carbs: 8,
    fat: 14,
    fiber: 3
  },

  conteudo: `
    <h2>Por que é tão gostosa?</h2>
    <p>O equilíbrio entre salgado das azeitonas, cremosidade do feta e o frescor das folhas cria uma salada rica em sabores com poucas calorias.</p>
  `
};

export default saladaMediterranea;
