// Importações dos artigos da categoria emocional
import tecnicaRespiracao from "./emocional/tecnicas-respiracao";
import introducaoMeditacao from "./emocional/introducao-meditacao";
import autoControleEmocional from "./emocional/auto-controle-emocional";
import relacionamentosEmocionais from "./emocional/lidando-com-relacionamentos-emocionais";
import bemEstarEmocional from "./emocional/estrategias-para-bem-estar-emocional";
import lidandoComLuto from "./emocional/lidando-com-o-luto";

// Importações dos artigos da categoria física
import fortalecimentoOmbro from "./fisico/fortalecimento-ombro";
import fortalecimentoJoelho from "./fisico/fortalecimento-joelho";
import fortalecimentoQuadril from "./fisico/fortalecimento-quadril";
import fortalecimentoPunho from "./fisico/fortalecimento-punho";
import fortalecimentoArticulacoes from "./fisico/fortalecimento-articulacoes";
import posturaCorreta from "./fisico/postura-correta";

// Importações dos artigos da categoria mental
import entendendoAnsiedade from "./mental/entendendo-ansiedade";
import compreendendoDepressao from "./mental/compreendendo-depressao";
import disturbiosDoSono from "./mental/disturbios-do-sono";
import tecnicasParaAliviarEstresse from "./mental/tecnicas-para-aliviar-estresse";
import autoconhecimentoParaSaudeMental from "./mental/autoconhecimento-para-saude-mental";
import mindfulness from "./mental/mindfulness";

// Importações da categoria espiritual
import autoestimaEspiritual from "./espiritual/autoestima-espiritual";
import meditacaoAvancada from "./espiritual/meditacao-avancada";
import energiaPositiva from "./espiritual/energia-positiva";
import poderGratidao from "./espiritual/poder-gratidao";
import equilibrioEspiritual from "./espiritual/equilibrio-espiritual-diario";

const articles = [
  // emocional
  { ...tecnicaRespiracao, friendlySlug: "tecnicas-respiracao" },
  { ...introducaoMeditacao, friendlySlug: "introducao-meditacao" },
  { ...autoControleEmocional, friendlySlug: "auto-controle-emocional" },
  { ...relacionamentosEmocionais, friendlySlug: "lidando-com-relacionamentos-emocionais" },
  { ...bemEstarEmocional, friendlySlug: "estrategias-para-bem-estar-emocional" },
  { ...lidandoComLuto, friendlySlug: "lidando-com-o-luto" },

  // fisica
  { ...fortalecimentoOmbro, friendlySlug: "fortalecimento-ombro" },
  { ...fortalecimentoJoelho, friendlySlug: "fortalecimento-joelho" },
  { ...fortalecimentoQuadril, friendlySlug: "fortalecimento-quadril" },
  { ...posturaCorreta, friendlySlug: "postura-correta" },
  { ...fortalecimentoPunho, friendlySlug: "fortalecimento-punho" },
  { ...fortalecimentoArticulacoes, friendlySlug: "fortalecimento-articulacoes" },

  // mental
  { ...entendendoAnsiedade, friendlySlug: "entendendo-ansiedade" },
  { ...compreendendoDepressao, friendlySlug: "compreendendo-depressao" },
  { ...disturbiosDoSono, friendlySlug: "disturbios-do-sono" },
  { ...tecnicasParaAliviarEstresse, friendlySlug: "tecnicas-para-aliviar-estresse" },
  { ...autoconhecimentoParaSaudeMental, friendlySlug: "autoconhecimento-para-saude-mental" },
  { ...mindfulness, friendlySlug: "mindfulness-para-saude-mental" },

  // espiritual
  { ...autoestimaEspiritual, friendlySlug: "autoestima-espiritual" },
  { ...meditacaoAvancada, friendlySlug: "meditacao-avancada" },
  { ...energiaPositiva, friendlySlug: "energia-positiva" },
  { ...poderGratidao, friendlySlug: "gratidao-proposito" },
  { ...equilibrioEspiritual, friendlySlug: "equilibrio-espiritual-diario" },
];

// Cria objeto para acesso rápido por slug ou friendlySlug
const articlesData = {};
articles.forEach(article => {
  articlesData[article.slug] = article;
  articlesData[article.friendlySlug] = article;
});

export const articlesArray = articles;
export default articlesData;
