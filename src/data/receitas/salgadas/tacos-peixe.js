// src/data/receitas/salgadas/tacos-de-peixe.js
const tacosDePeixe = {
  slug: "tacos-de-peixe",
  titulo: "Tacos de Peixe Grelhado",
  imagem: "https://images.pexels.com/photos/7613558/pexels-photo-7613558.jpeg",
  tempo: "30 min",
  porcoes: 4,
  categoria: "Internacionais",
  dificuldade: "médio",

  descricaoCurta: "Tacos leves com peixe grelhado, repolho crocante e molho de iogurte — fácil e saboroso.",
  shortDescription:
    "Tacos de peixe: filé branco grelhado, tortilha de milho, repolho e molho cítrico — sabor mexicano com toque saudável.",
  excerpt:
    "Tacos de peixe com repolho crocante e molho de iogurte — montagem rápida e refeição leve.",

  ingredientes: [
    "400 g de filés de peixe branco (tilápia, pescada ou similar)",
    "8 tortilhas de milho pequenas",
    "2 xícaras de repolho roxo fatiado finamente",
    "1/2 cebola roxa fatiada (opcional)",
    "Suco de 1 limão",
    "2 colheres (sopa) de iogurte natural (para o molho)",
    "1 colher (chá) de azeite",
    "Sal, pimenta e cominho a gosto",
    "Coentro ou salsinha para finalizar"
  ],

  instrucoes: [
    "Tempere os filés de peixe com sal, pimenta, cominho e metade do suco de limão. Reserve por 5–10 minutos.",
    "Aqueça uma frigideira com azeite e grelhe os filés 3–4 minutos de cada lado até dourar; desfie em pedaços médios.",
    "Misture o iogurte com o restante do suco de limão e ajuste sal para obter o molho.",
    "Aqueça as tortilhas rapidamente em frigideira ou chapa e monte: tortilha + peixe desfiado + repolho + cebola + molho. Finalize com ervas.",
    "Sirva imediatamente."
  ],

  product: {
    name: "Tortillas de milho artesanais (pack)",
    image: "https://m.media-amazon.com/images/I/71example-tortillas.jpg",
    price: "24.90",
    link: "https://amzn.to/exemplo",
    rating: "4.4",
    reviews: 220
  },

  seo: {
    metaTitle: "Tacos de Peixe — Receita Leve e Saborosa",
    metaDescription:
      "Receita de tacos de peixe grelhado com repolho e molho de iogurte — montagem rápida, ideal para almoços ou jantares leves."
  },

  variacoes: [
    "Use molho de abacate em vez do iogurte para versão vegana (substitua peixe por tofu temperado).",
    "Adicione uma colher de pico de gallo (tomate, cebola, coentro) para frescor extra."
  ],

  cta: "Monte um taco party em casa — simples, rápido e irresistível!",

  // Nutritional values por taco (valor médio por unidade) — aproximado
  nutritional: {
    calories: 280,
    protein: 22,
    carbs: 30,
    fat: 8,
    fiber: 3
  },

  conteudo: `
    <h2>Tacos de peixe: leves e cheios de sabor</h2>
    <p>Peixe grelhado fornece proteína magra e ômega-3 (dependendo do tipo), enquanto a montagem em tortilhas de milho mantém a refeição leve e prática.</p>
    <p>Dica: fatie o repolho fininho e tempere com limão para maior crocância e frescor.</p>
  `
};

export default tacosDePeixe;
