// src/data/receitas/fitness/smoothie-proteico-morango-aveia.js
const smoothieProteicoMorangoAveia = {
  slug: "smoothie-proteico-morango-aveia",
  titulo: "Smoothie Proteico de Morango e Aveia",
  imagem: "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg",
  tempo: "5 min",
  porcoes: 1,
  categoria: "Fitness",
  dificuldade: "fácil",

  descricaoCurta: "Refrescante, nutritivo e perfeito para o pré ou pós-treino.",
  shortDescription:
    "Smoothie proteico com morango, aveia e whey — rápido, saciante e ideal para recuperação muscular.",
  excerpt:
    "Smoothie de morango e aveia com proteína — energia imediata e aporte proteico para treino.",

  ingredientes: [
    "1 xícara de morangos congelados",
    "1 scoop de whey protein (baunilha) ou proteína vegetal",
    "2 colheres (sopa) de aveia",
    "200 ml de leite vegetal ou água",
    "1 colher (chá) de mel (opcional)"
  ],

  instrucoes: [
    "Coloque todos os ingredientes no liquidificador.",
    "Bata até ficar cremoso e sirva imediatamente.",
    "Ajuste a consistência com mais líquido, se necessário."
  ],

  product: {
    name: "Coqueteleira inox 600ml",
    image: "https://m.media-amazon.com/images/I/61eSRZ8h0lL._AC_SY355_.jpg",
    price: "29.90",
    link: "https://amzn.to/exemplo",
    rating: "4.5",
    reviews: 432
  },

  seo: {
    metaTitle: "Smoothie Proteico de Morango e Aveia — Receita Rápida",
    metaDescription:
      "Smoothie proteico com morango e aveia: preparo em 5 minutos, ideal para pré ou pós-treino."
  },

  variacoes: [
    "Use proteína vegetal para versão vegana.",
    "Adicione uma colher de sementes de chia para mais fibras."
  ],

  cta: "Perfeito para seu pré/pós-treino — experimente e marca nos stories!",

  // NUTRIÇÃO (por porção — aproximado; mantém valores já usados)
  nutritional: {
    calories: 310,
    protein: 28,
    carbs: 32,
    fat: 7,
    fiber: 4
  },

  conteudo: `
    <h2>Smoothie prático e potente</h2>
    <p>Combina carboidratos dos morangos e aveia com proteína do whey — excelente para recuperação e saciedade.</p>
  `
};

export default smoothieProteicoMorangoAveia;
