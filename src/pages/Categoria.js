import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import Breadcrumbs from "../components/BreadCrumbs";

// Definição de subcategorias por categoria
const subCategories = {
emocional: [
  {
    id: "tecnica-respiracao",
    name: "Respiração",
    description: "Aprenda técnicas práticas para controlar a ansiedade, reduzir o estresse e conquistar tranquilidade no seu dia a dia.",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
  },
  {
    id: "introducao-meditacao",
    name: "Meditação",
    description: "Descubra como a prática regular de meditação pode equilibrar suas emoções, melhorar o foco e transformar sua saúde mental.",
    image: "https://images.pexels.com/photos/3820324/pexels-photo-3820324.jpeg",
  },
  {
    id: "auto-controle-emocional",
    name: "Autocontrole",
    description: "Fortaleça sua inteligência emocional, aprenda a gerenciar impulsos e tome decisões mais conscientes em momentos desafiantes.",
    image: "https://images.pexels.com/photos/3822624/pexels-photo-3822624.jpeg",
  },
  {
    id: "lidando-com-relacionamentos-emocionais",
    name: "Relacionamentos Emocionais",
    description: "Como lidar com emoções em relacionamentos, melhorar a comunicação e criar vínculos mais saudáveis e duradouros.",
    image: "https://images.pexels.com/photos/3801665/pexels-photo-3801665.jpeg",
  },
  {
    id: "estrategias-para-bem-estar-emocional",
    name: "Bem-Estar Emocional",
    description: "Estratégias para aumentar a satisfação pessoal, lidar com frustrações e aproveitar melhor a vida com leveza.",
    image: "https://images.pexels.com/photos/4098343/pexels-photo-4098343.jpeg",
  },
  {
    id: "lidando-com-o-luto",
    name: "Lidando com o Luto",
    description: "Caminhos para processar a dor da perda, encontrar apoio e transformar o luto em aprendizado e resiliência.",
    image: "https://images.pexels.com/photos/592667/pexels-photo-592667.jpeg",
  }
],

fisica: [
{
  id: "ombro",
  name: "Fortalecimento do Ombro",
  description: "Exercícios práticos para fortalecer, prevenir lesões e aliviar dores nos ombros, essenciais para uma rotina ativa e sem incômodos.",
  image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
},
{
  id: "joelho",
  name: "Fortalecimento do Joelho",
  description: "Saiba como proteger, fortalecer e reabilitar seus joelhos para evitar lesões e manter a mobilidade em todas as idades.",
  image: "https://images.pexels.com/photos/8018976/pexels-photo-8018976.jpeg",
},
{
  id: "quadril",
  name: "Fortalecimento do Quadril",
  description: "Desenvolva estabilidade, flexibilidade e alívio para dores no quadril com exercícios e práticas seguras para o dia a dia.",
  image: "https://images.pexels.com/photos/15491986/pexels-photo-15491986.jpeg",
},
{
  id: "postura",
  name: "Postura Correta",
  description: "Rotinas simples para corrigir a postura, prevenir dores nas costas e melhorar a qualidade de vida, seja no trabalho ou em casa.",
  image: "https://images.pexels.com/photos/4498317/pexels-photo-4498317.jpeg",
},
{
  id: "punho",
  name: "Fortalecimento do Punho",
  description: "Técnicas e exercícios para fortalecer o punho, prevenindo lesões e melhorando a força para atividades físicas.",
  image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
},
{
  id: "articulacoes",
  name: "Fortalecimento das Articulações",
  description: "Dicas e práticas para fortalecer as articulações, garantindo mais mobilidade e resistência no dia a dia.",
  image: "https://images.pexels.com/photos/416838/pexels-photo-416838.jpeg",
  }
],

mental: [
  {
    id: "entendendo-ansiedade",
    name: "Ansiedade",
    description: "Aprenda a lidar com o nervosismo e preocupações no dia a dia.",
    image: "https://images.pexels.com/photos/887352/pexels-photo-887352.jpeg",
  },
  {
    id: "compreendendo-depressao",
    name: "Depressão",
    description: "Entenda sintomas, formas de prevenção e caminhos para o bem-estar.",
    image: "https://images.pexels.com/photos/887481/pexels-photo-887481.jpeg",
  },
  {
    id: "tecnicas-para-aliviar-estresse",
    name: "Estresse",
    description: "Descubra estratégias para reduzir o estresse e melhorar a qualidade de vida.",
    image: "https://images.pexels.com/photos/4050430/pexels-photo-4050430.jpeg",
  },
  {
    id: "autoconhecimento-para-saude-mental",
    name: "Autoconhecimento",
    description: "Desvende seus padrões emocionais e fortaleça sua autoestima e confiança.",
    image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg",
  },
  {
    id: "disturbios-do-sono",
    name: "Distúrbios do Sono",
    description: "Saiba como identificar e tratar insônia, apneia e outros problemas do sono.",
    image: "https://images.pexels.com/photos/4197545/pexels-photo-4197545.jpeg",
  },
  {
    id: "mindfulness-para-saude-mental",
    name: "Mindfulness",
    description: "Mindfulness é uma prática de atenção plena que ajuda a focar no momento presente.",
    image: "https://images.pexels.com/photos/4197545/pexels-photo-4197545.jpeg",
  },
],


espiritual: [
  {
    id: "autoestima-espiritual",
    name: "Autoestima Espiritual",
    description: "Aprenda como fortalecer sua conexão interior e elevar seu propósito através da espiritualidade.",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
  },
  {
    id: "meditacao-avancada",
    name: "Meditação Avançada",
    description: "Técnicas para aprofundar sua prática meditativa e alcançar equilíbrio energético e emocional.",
    image: "https://images.pexels.com/photos/3820324/pexels-photo-3820324.jpeg",
  },
  {
    id: "energia-positiva",
    name: "Energia Positiva",
    description: "Descubra formas de cultivar boas energias, fé e gratidão no seu cotidiano.",
    image: "https://images.pexels.com/photos/3822624/pexels-photo-3822624.jpeg",
  },
  {
    id: "equilibrio-espiritual-diario",
    name: "Reflexão Interior",
    description: "Práticas e pensamentos que ajudam no autoconhecimento e na evolução espiritual pessoal.",
    image: "https://images.pexels.com/photos/3801665/pexels-photo-3801665.jpeg",
  },
  {
    id: "gratidao",
    name: "Gratidão e Propósito",
    description: "Desenvolva um estilo de vida com base na gratidão, propósito e equilíbrio espiritual.",
    image: "https://images.pexels.com/photos/4098343/pexels-photo-4098343.jpeg",
  }
],


};

export default function BlogCategory() {
  const { categoria } = useParams();
  const category = subCategories[categoria] || [];

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <Container>
        <Title>Explorando Saúde {categoria.charAt(0).toUpperCase() + categoria.slice(1)}</Title>
        <Subtitle>Escolha um tema para aprofundar seu conhecimento</Subtitle>

        <CategoriesGrid>
         {category.map((sub) => (
        <CategoryLink to={`/blog/${categoria}/${sub.id}`} key={sub.id}>
          <CategoryCard>
            <CategoryImage src={sub.image} alt={sub.name} />
            <CategoryContent>
              <CategoryTitle>{sub.name}</CategoryTitle>
              <CategoryDescription>{sub.description}</CategoryDescription>
              <ViewArticlesButton>Ver Artigos</ViewArticlesButton>
            </CategoryContent>
          </CategoryCard>
        </CategoryLink>
      ))}
        </CategoriesGrid>
      </Container>
      <Footer />
    </>
  );
}

// Styled components

const ViewArticlesButton = styled.button`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-weight: 600;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};
  margin-top: 1rem;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primaryDark};
    outline: none;
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 2rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 0.4rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const CategoryDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
`;