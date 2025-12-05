// src/data/receitas/fitness/overnight-oats.js
const overnightOats = {
  slug: "overnight-oats",
  titulo: "Overnight Oats com Frutas Vermelhas",
  imagem: "https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg",
  tempo: "5 min + descanso",
  porcoes: 1,
  categoria: "Café da Manhã",
  dificuldade: "fácil",

  descricaoCurta: "Prático, nutritivo e pronto pela manhã.",
  shortDescription:
    "Aveia hidratada com iogurte e frutas vermelhas — preparo noturno para um café da manhã prático e nutritivo.",
  excerpt:
    "Overnight oats com frutas vermelhas: preparação noturna, rico em fibras e ideal para começar o dia com energia.",

  ingredientes: [
    "1/2 xícara de aveia em flocos (aprox. 45 g)",
    "1/2 xícara de iogurte natural (120 g)",
    "1/4 xícara de leite vegetal (60 ml)",
    "1/3 xícara de frutas vermelhas (frescas ou congeladas)",
    "1 colher (chá) de mel (opcional)"
  ],

  instrucoes: [
    "Misture aveia, iogurte e leite no pote.",
    "Cubra e leve à geladeira por no mínimo 6 horas (ou durante a noite).",
    "Adicione as frutas e mel antes de servir."
  ],

  seo: {
    metaTitle: "Overnight Oats com Frutas Vermelhas — Café Prático",
    metaDescription:
      "Overnight oats: aveia, iogurte e frutas vermelhas — preparo fácil na noite anterior para um café da manhã nutritivo."
  },

  variacoes: [
    "Use kefir no lugar do iogurte para probióticos extras.",
    "Adicione 1 colher de proteína em pó para mais aporte proteico."
  ],

  cta: "Prepare hoje à noite e tenha um café prático e nutritivo pela manhã!",

  // NUTRIÇÃO (por porção — aproximado)
  nutritional: {
    calories: 250,
    protein: 8,
    carbs: 38,
    fat: 7,
    fiber: 6
  },

  conteudo: `
    <h2>Por que fazer overnight oats?</h2>
    <p>Excelente para quem tem rotina corrida — fornece fibras, proteína moderada e energia de liberação gradual.</p>
    <p>Personalize com suas frutas e sementes favoritas.</p>
  `
};

export default overnightOats;
