const receitas = [
  {
    slug: "panqueca-banana-aveia",
    titulo: "Panqueca de Banana e Aveia",
    categoria: "Café da Manhã",
    imagem: "https://images.pexels.com/photos/407041/pancakes-maple-syrup-sweet-407041.jpeg",
    tempo: "15 min",
    calorias: 180,
    descricao: "Leve, nutritiva e perfeita para começar o dia com energia.",
    destaque: true,
    ingredientes: [
      "1 banana madura amassada",
      "2 colheres (sopa) de aveia em flocos",
      "1 ovo",
      "1 pitada de canela em pó",
      "1 fio de mel (opcional)"
    ],
    instrucoes: [
      "Misture todos os ingredientes em uma tigela até obter uma massa homogênea.",
      "Aqueça uma frigideira antiaderente e despeje pequenas porções da massa.",
      "Cozinhe dos dois lados até dourar.",
      "Sirva com frutas frescas e mel se desejar."
    ]
  },
  {
    slug: "smoothie-verde-detox",
    titulo: "Smoothie Verde Detox",
    categoria: "Bebidas Saudáveis",
    imagem: "https://images.pexels.com/photos/5366704/pexels-photo-5366704.jpeg",
    tempo: "10 min",
    calorias: 130,
    descricao: "Refrescante, antioxidante e ideal para desintoxicar naturalmente.",
    destaque: true,
    ingredientes: [
      "1 banana congelada",
      "1 punhado de espinafre",
      "200ml de água de coco",
      "1/2 maçã",
      "Suco de 1 limão"
    ],
    instrucoes: [
      "Bata todos os ingredientes no liquidificador até ficar cremoso.",
      "Sirva gelado e aproveite."
    ]
  },
  {
    slug: "frango-grelhado-ervas",
    titulo: "Frango Grelhado com Ervas",
    categoria: "Almoço Fit",
    imagem: "https://images.pexels.com/photos/1247677/pexels-photo-1247677.jpeg",
    tempo: "25 min",
    calorias: 260,
    descricao: "Suculento, com ervas frescas e toque mediterrâneo.",
    ingredientes: [
      "2 filés de peito de frango",
      "1 colher (sopa) de azeite",
      "Ervas finas, sal e pimenta a gosto",
      "Suco de meio limão"
    ],
    instrucoes: [
      "Tempere o frango com as ervas, sal, pimenta e suco de limão.",
      "Aqueça o azeite e grelhe até dourar dos dois lados.",
      "Sirva com salada ou arroz integral."
    ]
  },
  {
    slug: "salada-mediterranea",
    titulo: "Salada Mediterrânea",
    categoria: "Almoço Fit",
    imagem: "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg",
    tempo: "15 min",
    calorias: 190,
    descricao: "Com azeite, azeitonas e tomate seco — um clássico leve e colorido.",
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
    ]
  },
  {
    slug: "pasta-integral-pesto",
    titulo: "Pasta Integral ao Pesto",
    categoria: "Massas",
    imagem: "https://images.pexels.com/photos/1435896/pexels-photo-1435896.jpeg",
    tempo: "20 min",
    calorias: 320,
    descricao: "O sabor da Itália com um toque saudável e integral.",
    ingredientes: [
      "200g de massa integral",
      "1/2 xícara de molho pesto",
      "Tomatinhos cereja cortados ao meio",
      "Parmesão ralado a gosto"
    ],
    instrucoes: [
      "Cozinhe a massa conforme instruções da embalagem.",
      "Misture com o molho pesto e os tomatinhos.",
      "Finalize com parmesão e sirva quente."
    ]
  },
  {
    slug: "tacos-de-peixe",
    titulo: "Tacos de Peixe",
    categoria: "Internacionais",
    imagem: "https://images.pexels.com/photos/7613558/pexels-photo-7613558.jpeg",
    tempo: "30 min",
    calorias: 280,
    descricao: "Inspirado na culinária mexicana — leve e saboroso.",
    ingredientes: [
      "Filés de peixe branco grelhados",
      "Tortilhas de milho",
      "Repolho roxo fatiado",
      "Molho de iogurte e limão"
    ],
    instrucoes: [
      "Grelhe o peixe e desfie em pedaços médios.",
      "Monte os tacos com o peixe, repolho e molho.",
      "Sirva imediatamente."
    ]
  },
  {
    slug: "mousse-chocolate-fit",
    titulo: "Mousse de Chocolate Fit",
    categoria: "Sobremesas",
    imagem: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg",
    tempo: "10 min",
    calorias: 200,
    descricao: "Com cacau 70% e textura cremosa — sem culpa!",
    destaque: true,
    ingredientes: [
      "2 colheres (sopa) de cacau em pó 70%",
      "1 banana madura",
      "1/2 abacate pequeno",
      "1 colher (chá) de mel"
    ],
    instrucoes: [
      "Bata todos os ingredientes no liquidificador até obter uma textura cremosa.",
      "Leve à geladeira por 30 minutos antes de servir."
    ]
  },
  {
    slug: "overnight-oats",
    titulo: "Overnight Oats com Frutas Vermelhas",
    categoria: "Café da Manhã",
    imagem: "https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg",
    tempo: "5 min + descanso",
    calorias: 250,
    descricao: "Super prático e delicioso — prepara à noite e aproveita de manhã.",
    ingredientes: [
      "1/2 xícara de aveia em flocos",
      "1/2 xícara de iogurte natural",
      "1/4 xícara de leite vegetal",
      "Frutas vermelhas a gosto",
      "Mel a gosto"
    ],
    instrucoes: [
      "Misture aveia, iogurte e leite em um pote.",
      "Cubra e leve à geladeira por pelo menos 6 horas.",
      "Adicione as frutas e o mel antes de servir."
    ]
  },
  {
    slug: "wrap-de-atum",
    titulo: "Wrap de Atum e Abacate",
    categoria: "Lanches",
    imagem: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
    tempo: "10 min",
    calorias: 210,
    descricao: "Proteico, cremoso e rápido — ideal para o pós-treino.",
    ingredientes: [
      "1 pão folha integral",
      "1 lata de atum em água",
      "1/2 abacate amassado",
      "Folhas de alface e tomate"
    ],
    instrucoes: [
      "Misture o atum com o abacate.",
      "Espalhe no pão folha, adicione os vegetais e enrole.",
      "Corte ao meio e sirva."
    ]
  },
  {
    slug: "cheesecake-framboesa",
    titulo: "Cheesecake de Framboesa Light",
    categoria: "Sobremesas",
    imagem: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg",
    tempo: "40 min",
    calorias: 270,
    descricao: "Cremoso e frutado — o toque perfeito para fechar o dia.",
    ingredientes: [
      "200g de cream cheese light",
      "1 pote de iogurte natural",
      "2 colheres (sopa) de mel",
      "Base de bolacha integral triturada",
      "Geleia de framboesa sem açúcar"
    ],
    instrucoes: [
      "Monte a base com a bolacha e leve à geladeira por 15 min.",
      "Bata o cream cheese, iogurte e mel até ficar homogêneo.",
      "Despeje sobre a base e cubra com a geleia.",
      "Leve à geladeira por 2 horas antes de servir."
    ]
  }
];

export default receitas;
