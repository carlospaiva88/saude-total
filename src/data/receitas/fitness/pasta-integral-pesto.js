// src/data/receitas/fitness/pasta-integral-pesto.js
const pastaIntegralPesto = {
  slug: "pasta-integral-pesto",
  titulo: "Pasta Integral ao Pesto",
  imagem: "https://images.pexels.com/photos/1435896/pexels-photo-1435896.jpeg",
  tempo: "20 min",
  porcoes: 2,
  categoria: "Massas",
  dificuldade: "fácil",

  descricaoCurta: "Sabor da Itália com toque integral e leve.",
  shortDescription:
    "Massa integral ao pesto com tomatinhos — prato equilibrado, saboroso e prático para uma refeição completa.",
  excerpt:
    "Pasta integral ao pesto com tomatinhos — receita simples e nutritiva para uma refeição reconfortante.",

  ingredientes: [
    "200 g de massa integral (porção para 2 pessoas)",
    "1/2 xícara de molho pesto (caseiro ou pronto)",
    "Tomatinhos cereja cortados ao meio",
    "Parmesão ralado a gosto (opcional)"
  ],

  instrucoes: [
    "Cozinhe a massa conforme instruções da embalagem até ficar al dente.",
    "Escorra e misture com o molho pesto e os tomatinhos.",
    "Finalize com parmesão e sirva imediatamente."
  ],

  seo: {
    metaTitle: "Pasta Integral ao Pesto — Receita Simples e Saborosa",
    metaDescription:
      "Pasta integral ao pesto com tomatinhos — prato rápido, nutritivo e perfeito para refeições equilibradas."
  },

  variacoes: [
    "Adicione peito de frango grelhado para mais proteína.",
    "Use pesto de rúcula para sabor mais picante."
  ],

  cta: "Rápida, prática e perfeita para o jantar — experimente hoje!",

  // NUTRIÇÃO (por porção — valores aproximados considerando 2 porções no total)
  nutritional: {
    calories: 320,
    protein: 12,
    carbs: 48,
    fat: 8,
    fiber: 6
  },

  conteudo: `
    <h2>Pasta integral: energia de qualidade</h2>
    <p>Ao optar por massa integral você ganha mais fibras e micronutrientes — combine com proteína se quiser uma refeição completa.</p>
  `
};

export default pastaIntegralPesto;
