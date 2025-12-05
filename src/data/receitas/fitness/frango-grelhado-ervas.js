// src/data/receitas/fitness/frango-grelhado-ervas.js
const frangoGrelhadoErvas = {
  slug: "frango-grelhado-ervas",
  titulo: "Frango Grelhado com Ervas",
  imagem: "https://images.pexels.com/photos/1247677/pexels-photo-1247677.jpeg",
  tempo: "25 min",
  porcoes: 2,
  categoria: "Almoço Fit",
  dificuldade: "fácil",

  descricaoCurta: "Suculento, com ervas frescas e toque mediterrâneo.",
  shortDescription:
    "Peito de frango grelhado temperado com ervas e limão — suculento, leve e perfeito para refeições balanceadas.",
  excerpt:
    "Frango grelhado com ervas: receita simples, saborosa e ideal para acompanhar saladas ou arroz integral.",

  ingredientes: [
    "2 filés de peito de frango (aprox. 200 g total)",
    "1 colher (sopa) de azeite de oliva",
    "1 colher (chá) de ervas finas (alecrim, tomilho, orégano)",
    "Sal e pimenta a gosto",
    "Suco de meio limão"
  ],

  instrucoes: [
    "Tempere o frango com sal, pimenta, ervas e suco de limão.",
    "Aqueça uma frigideira com o azeite e grelhe os filés 4–5 minutos de cada lado, até dourar.",
    "Deixe descansar 2 minutos e sirva com salada ou arroz integral."
  ],

  seo: {
    metaTitle: "Frango Grelhado com Ervas — Receita Simples e Suculenta",
    metaDescription:
      "Aprenda a fazer um peito de frango grelhado com ervas e limão — opção prática e nutritiva para o almoço."
  },

  variacoes: [
    "Marinar por 30 minutos com iogurte natural para frango mais macio.",
    "Adicione pimenta calorosa (pimenta calabresa) para um toque picante."
  ],

  cta: "Perfeito para a marmita — simples de fazer e sempre gostoso!",

  // NUTRIÇÃO (porção — 1 filé ~100 g; valores aproximados por porção)
  nutritional: {
    calories: 260,
    protein: 46,
    carbs: 0,
    fat: 6,
    fiber: 0
  },

  conteudo: `
    <h2>Dica para grelhar sem ressecar</h2>
    <p>Não cozinhe em fogo alto por tempo demais — deixe o frango descansar alguns minutos para os sucos redistribuírem.</p>
    <p>Acompanhe com carboidratos integrais e vegetais para uma refeição completa.</p>
  `
};

export default frangoGrelhadoErvas;
