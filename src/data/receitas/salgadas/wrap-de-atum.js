// src/data/receitas/salgadas/wrap-de-atum.js
const wrapDeAtum = {
  slug: "wrap-de-atum",
  titulo: "Wrap de Atum e Abacate",
  imagem: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
  tempo: "10 min",
  porcoes: 1,
  categoria: "Lanches",
  dificuldade: "fácil",

  descricaoCurta: "Proteico, cremoso e rápido — ideal para levar como lanche ou pós-treino.",
  shortDescription:
    "Wrap leve com atum em água e abacate — prático, nutritivo e fácil de montar.",
  excerpt:
    "Wrap de atum com abacate: lanche prático, rico em proteína e gorduras saudáveis — perfeito para levar.",

  ingredientes: [
    "1 pão folha integral (ou wrap integral)",
    "1 lata de atum em água (≈120 g drenado)",
    "1/2 abacate maduro amassado",
    "Folhas de alface",
    "Tomate fatiado",
    "Pitada de sal, pimenta e suco de limão"
  ],

  instrucoes: [
    "Drene o atum e misture com o abacate amassado. Tempere com suco de limão, sal e pimenta.",
    "Espalhe a mistura sobre o pão folha, adicione alface e tomate.",
    "Enrole firmemente, corte ao meio e sirva. Ideal para levar."
  ],

  product: {
    name: "Pão folha integral (pack) / Wrap integral",
    image: "https://m.media-amazon.com/images/I/51example-wrap.jpg",
    price: "12.90",
    link: "https://amzn.to/exemplo",
    rating: "4.3",
    reviews: 154
  },

  seo: {
    metaTitle: "Wrap de Atum e Abacate — Lanche Rápido e Proteico",
    metaDescription:
      "Wrap leve com atum e abacate: lanche prático e nutritivo, ideal para levar ao trabalho ou após o treino."
  },

  variacoes: [
    "Use iogurte grego em vez do abacate para reduzir gorduras e aumentar proteína.",
    "Adicione pimenta calabresa ou pickles para um sabor mais marcante."
  ],

  cta: "Monte agora mesmo e leve saúde pra onde for — super prático!",

  // Nutritional values por wrap (aprox.)
  nutritional: {
    calories: 210,
    protein: 20,
    carbs: 18,
    fat: 8,
    fiber: 4
  },

  conteudo: `
    <h2>Why this wrap works</h2>
    <p>Combina proteína do atum com gorduras saudáveis do abacate e carboidrato leve do wrap integral — uma opção equilibrada para lanches e refeições rápidas.</p>
    <p>Dica: mantenha o recheio mais firme para transportar sem encharcar o wrap.</p>
  `
};

export default wrapDeAtum;
