// src/data/receitas/salgadas/arroz-frango-legumes.js
const arrozFrangoLegumes = {
  slug: "arroz-frango-legumes",
  titulo: "Arroz Integral com Frango e Legumes",
  imagem: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  tempo: "25 min",
  porcoes: 2,
  categoria: "Salgadas",
  dificuldade: "médio",

  descricaoCurta: "Prato completo, nutritivo e perfeito para o dia a dia — ideal para marmitas.",
  shortDescription:
    "Arroz integral com peito de frango e legumes: refeição balanceada, prática e rica em nutrientes para rotina ativa.",
  excerpt:
    "Arroz integral com frango e legumes: preparo rápido, sabor caseiro e muito equilíbrio nutricional.",

  ingredientes: [
    "1 xícara (chá) de arroz integral cozido (≈150 g cozido)",
    "200 g de peito de frango em cubos",
    "1 xícara de brócolis picado",
    "1/2 cenoura em rodelas",
    "1 colher (sopa) de azeite de oliva",
    "1 dente de alho picado",
    "Sal e pimenta-do-reino a gosto",
    "Salsinha picada para finalizar (opcional)"
  ],

  instrucoes: [
    "Em uma panela, aqueça o azeite e refogue o alho até dourar levemente.",
    "Adicione o peito de frango em cubos e doure todos os lados por 6–8 minutos. Tempere com sal e pimenta.",
    "Junte a cenoura e o brócolis, refogue por 4–5 minutos até ficarem macios, mas ainda firmes.",
    "Adicione o arroz integral cozido, misture bem para incorporar e ajuste o tempero.",
    "Finalize com salsinha picada e sirva quente."
  ],

  product: {
    name: "Panela antiaderente 24 cm",
    image: "https://m.media-amazon.com/images/I/61example.jpg",
    price: "129.90",
    link: "https://amzn.to/exemplo",
    rating: "4.6",
    reviews: 1024
  },

  seo: {
    metaTitle: "Arroz Integral com Frango e Legumes — Receita Prática e Saudável",
    metaDescription:
      "Aprenda a fazer arroz integral com peito de frango e legumes — marmita nutritiva, rápida e saborosa."
  },

  variacoes: [
    "Versão vegetariana: substitua o frango por cubos de tofu grelhado ou grão-de-bico.",
    "Acrescente ervas frescas (manjericão, coentro) para aroma e frescor."
  ],

  cta: "Prepare para a semana e garanta refeições práticas e nutritivas — salve esta receita!",

  // Nutritional values por porção — valores aproximados
  nutritional: {
    calories: 420,
    protein: 32,
    carbs: 46,
    fat: 12,
    fiber: 6
  },

  conteudo: `
    <h2>Prato completo para sua rotina</h2>
    <p>Este arroz integral com frango e legumes é pensado para entregar macronutrientes equilibrados: proteína magra, carboidrato de baixo índice glicêmico e vegetais que adicionam fibras e micronutrientes.</p>
    <p>Dica: organize porções em potes para marmita e economize tempo durante a semana.</p>
  `
};

export default arrozFrangoLegumes;
