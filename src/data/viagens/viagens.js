// Nacionais
const chapadaDiamantina = {
  slug: "chapada-diamantina",
  title: "Chapada Diamantina: O Paraíso das Trilhas e Cachoeiras na Bahia",
  image: "https://images.pexels.com/photos/33036071/pexels-photo-33036071.jpeg",
  date: "10/11/2025",
  readingTime: "8 min",
  category: "nacionais",
  shortDescription: "Natureza exuberante, trilhas e cachoeiras inesquecíveis.",
  content: `
    <h2>Um paraíso natural no coração da Bahia</h2>
    <p>A Chapada Diamantina é perfeita para quem busca contato com a natureza, cachoeiras e trilhas incríveis.</p>
  `,
  product: {
    name: "Garrafa Térmica Dobrável NatureHike",
    description: "Compacta, leve e ideal para aventuras.",
    link: "https://amzn.to/3XyP123",
    image: "https://m.media-amazon.com/images/I/61Xc2T4f3RL._AC_SL1500_.jpg",
  },
};

const rioDeJaneiro = {
  slug: "rio-de-janeiro",
  title: "Rio de Janeiro: Praias e Aventuras Inesquecíveis",
  image: "https://images.pexels.com/photos/1796729/pexels-photo-1796729.jpeg",
  date: "05/11/2025",
  readingTime: "7 min",
  category: "nacionais",
  shortDescription: "Praias, trilhas e energia contagiante no Rio.",
  content: `<p>Explore o Cristo Redentor, praias famosas e trilhas deslumbrantes.</p>`,
};

const serraGaucha = {
  slug: "serra-gaucha",
  title: "Serra Gaúcha: Vinhos e Natureza",
  image: "https://images.pexels.com/photos/1595242/pexels-photo-1595242.jpeg",
  date: "08/11/2025",
  readingTime: "6 min",
  category: "nacionais",
  shortDescription: "Vinhos, natureza e charme europeu no Sul do Brasil.",
  content: `<p>Visite Gramado e Canela, deguste vinhos e aproveite a gastronomia local.</p>`,
};

// Internacionais
const bali = {
  slug: "bali",
  title: "Bali: Espiritualidade, Natureza e Beleza Sem Igual",
  image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  date: "11/11/2025",
  readingTime: "10 min",
  category: "internacionais",
  shortDescription: "Ioga, surf e espiritualidade tropical em Bali.",
  content: `<p>Bali é sinônimo de equilíbrio entre corpo e alma. Ideal para meditar e relaxar.</p>`,
  product: {
    name: "Chapéu de Palha Dobrável de Viagem",
    description: "Perfeito para praias e dias ensolarados.",
    link: "https://amzn.to/3ZpBal1",
    image: "https://m.media-amazon.com/images/I/71+ZKk7rLFL._AC_SL1500_.jpg",
  },
};

const paris = {
  slug: "paris",
  title: "Paris: Romance, Arte e Gastronomia",
  image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
  date: "12/11/2025",
  readingTime: "9 min",
  category: "internacionais",
  shortDescription: "Descubra a cidade do amor, museus e culinária incrível.",
  content: `<p>Explore a Torre Eiffel, Louvre e caminhe pelas ruas charmosas de Paris.</p>`,
};

const lisboa = {
  slug: "lisboa",
  title: "Lisboa: Charme e Qualidade de Vida",
  image: "https://images.pexels.com/photos/5866878/pexels-photo-5866878.jpeg",
  date: "15/11/2025",
  readingTime: "8 min",
  category: "internacionais",
  shortDescription: "Charme, boa comida e qualidade de vida europeia.",
  content: `<p>Descubra bairros históricos, fado e gastronomia portuguesa.</p>`,
};

// Exportando todas as viagens em um objeto central
const viagensData = {
  nacionais: [chapadaDiamantina, rioDeJaneiro, serraGaucha],
  internacionais: [bali, paris, lisboa],
};

export default viagensData;
