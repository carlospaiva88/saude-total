// src/data/receitas/fitness/salada-mediterranea.js
const saladaMediterranea = {
  slug: "salada-mediterranea",
  titulo: "Salada Mediterrânea",
  imagem: "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg",
  tempo: "15 min",
  calorias: 190,
  categoria: "Almoço Fit",
  descricaoCurta: "Com azeite, azeitonas e tomate seco — um clássico leve e colorido.",
  // resumo curto para cards / listagens
  shortDescription: "Salada fresca com azeite, azeitonas e queijo feta — leve, saborosa e ótima como acompanhamento ou prato principal leve.",
  // excerpt para carousels / listagens (máx ~140 chars)
  excerpt: "Salada mediterrânea com azeite, azeitonas e tomate seco — refeição leve, colorida e nutritiva.",
  ingredientes: [
    "Alface e rúcula",
    "Tomate seco",
    "Azeitonas pretas",
    "Queijo feta em cubos",
    "Azeite e orégano a gosto"
  ],
  instrucoes: [
    "Monte a salada com todos os ingredientes.",
    "Tempere com azeite e orégano antes de servir."
  ],
  conteudo: `
    <h2>Salada Mediterrânea: Leve e saborosa</h2>
    <p>Combinação perfeita para quem quer uma refeição fresca e nutritiva.</p>
  `,
};

export default saladaMediterranea;
