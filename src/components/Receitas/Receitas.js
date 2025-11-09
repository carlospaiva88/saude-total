import styled from "styled-components";
import { Helmet } from "react-helmet-async";


import {recipes} from "../../data/recipes";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Receitas() {
  return (
    <>
      <Helmet>
        <title>Receitas Saudáveis | Viva no Flow</title>
        <meta
          name="description"
          content="Receitas saudáveis, deliciosas e fáceis de preparar. Descubra opções para todos os momentos e mantenha o equilíbrio no seu dia a dia."
        />
      </Helmet>

      <Navbar />
      <Section>
        <h1>Receitas Saudáveis</h1>
        <p>Transforme sua alimentação com pratos simples, equilibrados e cheios de sabor.</p>

        <Grid>
          {recipes.map((item) => (
            <Card key={item.slug}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.shortDescription}</p>
              <a href={item.affiliateLink || `/receitas/${item.slug}`}>Ver mais</a>
            </Card>
          ))}
        </Grid>
      </Section>
      <Footer />
    </>
  );
}

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.background};

  h1 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    max-width: 700px;
    margin: 1rem auto 3rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.light};
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.medium};
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  h3 {
    margin: 1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    margin: 0 1rem 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
  }

  a {
    display: inline-block;
    margin-bottom: 1.5rem;
    padding: 0.6rem 1.2rem;
    background: ${({ theme }) => theme.gradients.button};
    color: white;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      background: ${({ theme }) => theme.gradients.buttonHover};
    }
  }
`;
