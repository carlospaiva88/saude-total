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
    id: "respiracao",
    name: "Respiração",
    description: "Aprenda técnicas práticas para controlar a ansiedade, reduzir o estresse e conquistar tranquilidade no seu dia a dia.",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg",
  },
  {
    id: "meditacao",
    name: "Meditação",
    description: "Descubra como a prática regular de meditação pode equilibrar suas emoções, melhorar o foco e transformar sua saúde mental.",
    image: "https://images.pexels.com/photos/3820324/pexels-photo-3820324.jpeg",
  },
  {
    id: "autocontrole",
    name: "Autocontrole",
    description: "Fortaleça sua inteligência emocional, aprenda a gerenciar impulsos e tome decisões mais conscientes em momentos desafiantes.",
    image: "https://images.pexels.com/photos/3822624/pexels-photo-3822624.jpeg",
  },
  {
    id: "relacionamentos",
    name: "Relacionamentos Emocionais",
    description: "Como lidar com emoções em relacionamentos, melhorar a comunicação e criar vínculos mais saudáveis e duradouros.",
    image: "https://images.pexels.com/photos/3801665/pexels-photo-3801665.jpeg",
  },
  {
    id: "bemestar",
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
  id: "exercicios-em-casa",
  name: "Exercícios em Casa",
  description: "Dicas de treinos fáceis e seguros para você se movimentar sem equipamentos, mesmo em espaços pequenos.",
  image: "https://images.pexels.com/photos/3758963/pexels-photo-3758963.jpeg",
},
{
  id: "alimentacao-saudavel",
  name: "Alimentação Saudável",
  description: "Guia prático para escolhas mais equilibradas, receitas e dicas adaptadas a diferentes rotinas e gostos.",
  image: "https://images.pexels.com/photos/4558717/pexels-photo-4558717.jpeg",
}
],

mental: [
  {
    id: "ansiedade",
    name: "Ansiedade",
    description: "Aprenda a lidar com o nervosismo e preocupações no dia a dia.",
    image: "https://images.pexels.com/photos/887352/pexels-photo-887352.jpeg",
  },
  {
    id: "depressao",
    name: "Depressão",
    description: "Entenda sintomas, formas de prevenção e caminhos para o bem-estar.",
    image: "https://images.pexels.com/photos/887481/pexels-photo-887481.jpeg",
  },
  {
    id: "estresse",
    name: "Estresse",
    description: "Descubra estratégias para reduzir o estresse e melhorar a qualidade de vida.",
    image: "https://images.pexels.com/photos/4050430/pexels-photo-4050430.jpeg",
  },
  {
    id: "autoconhecimento",
    name: "Autoconhecimento",
    description: "Desvende seus padrões emocionais e fortaleça sua autoestima e confiança.",
    image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg",
  },
  {
    id: "disturbios-sono",
    name: "Distúrbios do Sono",
    description: "Saiba como identificar e tratar insônia, apneia e outros problemas do sono.",
    image: "https://images.pexels.com/photos/4197545/pexels-photo-4197545.jpeg",
  },
  {
    id: "cuidados-pandemia",
    name: "Saúde Mental em Crise",
    description: "Dicas para cuidar da mente em tempos de pandemia, crise econômica e isolamento.",
    image: "https://images.pexels.com/photos/3930179/pexels-photo-3930179.jpeg",
  },
  {
    id: "relacionamentos",
    name: "Relacionamentos Saudáveis",
    description: "Aprenda a construir relações que somam saúde mental e qualidade de vida.",
    image: "https://images.pexels.com/photos/295826/pexels-photo-295826.jpeg",
  },
  {
    id: "tecnologia",
    name: "Tecnologia e Saúde Mental",
    description: "Como usar redes sociais e tecnologia de forma equilibrada para seu bem-estar.",
    image: "https://images.pexels.com/photos/842339/pexels-photo-842339.jpeg",
  },
  {
    id: "trabalho",
    name: "Saúde Mental no Trabalho",
    description: "Como lidar com pressão, burnout e buscar equilíbrio na rotina profissional.",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg",
  }
]

};

export default function BlogCategory() {
  const { categoria } = useParams();
  const category = subCategories[categoria] || [];

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <Container>
        <Title>Explorando Saúde {categoria}</Title>
        <Subtitle>Escolha um tema para aprofundar seu conhecimento</Subtitle>

        <CategoriesGrid>
          {category.map((sub) => (
            <CategoryCard key={sub.id}>
              <CategoryImage src={sub.image} alt={sub.name} />
              <CategoryContent>
                <CategoryTitle>{sub.name}</CategoryTitle>
                <CategoryDescription>{sub.description}</CategoryDescription>
                <CategoryLink to={`/blog/${categoria}/${sub.id}`}>
                  Ver artigos &gt;
                </CategoryLink>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Container>
      <Footer />
    </>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 1100px;
  margin: 2rem auto 4rem;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #264653;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #40514e;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div`
  background: #edf7f4;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(42, 157, 143, 0.15);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
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
  color: #2a6f61;
`;

const CategoryDescription = styled.p`
  font-size: 0.95rem;
  color: #40514e;
`;

const CategoryLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  color: #43aa8b;
  text-decoration: none;

  &:hover {
    color: #2a6f61;
  }
`;
