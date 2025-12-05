// src/data/receitas/fitness/panqueca-banana-aveia.js
const panquecaBananaAveia = {
  slug: "panqueca-banana-aveia",
  titulo: "Panqueca de Banana e Aveia",
  imagem: "https://images.pexels.com/photos/407041/pancakes-maple-syrup-sweet-407041.jpeg",
  tempo: "15 min",
  porcoes: 2,
  categoria: "Café da Manhã",
  dificuldade: "fácil",

  descricaoCurta: "Leve, nutritiva e perfeita para começar o dia com energia.",
  shortDescription:
    "Panqueca simples de banana e aveia — rápida, rica em fibras e ótima para um café equilibrado.",
  excerpt:
    "Panqueca de banana e aveia: preparo rápido, sabor natural e excelente para um café da manhã saudável.",

  ingredientes: [
    "1 banana madura amassada",
    "2 colheres (sopa) de aveia em flocos (aprox. 20 g)",
    "1 ovo",
    "1 pitada de canela em pó",
    "1 fio de mel (opcional)"
  ],

  instrucoes: [
    "Misture todos os ingredientes até formar uma massa homogênea.",
    "Aqueça uma frigideira antiaderente e coloque pequenas porções.",
    "Cozinhe 1–2 minutos de cada lado até dourar. Sirva com frutas."
  ],

  destaque: true,

  seo: {
    metaTitle: "Panqueca de Banana e Aveia — Receita Simples e Saudável",
    metaDescription:
      "Panqueca fit com banana e aveia — rápida, nutritiva e ideal para o café da manhã ou lanche."
  },

  variacoes: [
    "Adicione 1 colher de proteína em pó para versão mais proteica.",
    "Use farinha de aveia para textura mais uniforme."
  ],

  cta: "Faça para o café da manhã — rende 2 porções e é super prática!",

  // NUTRIÇÃO (por porção — assumindo rende 2 porções)
  nutritional: {
    calories: 180,
    protein: 6,
    carbs: 28,
    fat: 5,
    fiber: 3
  },

  conteudo: `
    <h2>Panqueca prática para o dia a dia</h2>
    <p>Uma receita sem complicação: poucos ingredientes, muita energia e sabor natural da banana.</p>
  `
};

export default panquecaBananaAveia;
