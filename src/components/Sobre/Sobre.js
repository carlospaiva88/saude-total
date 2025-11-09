import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Sobre() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | Viva no Flow</title>
        <meta
          name="description"
          content="Conheça a missão do Viva no Flow: inspirar uma vida equilibrada com saúde, viagens e bem-estar."
        />
      </Helmet>

      <Navbar />
      <Section>
        <h1>Sobre o Viva no Flow</h1>
        <p>
          Criamos o Viva no Flow para inspirar você a viver com mais equilíbrio — entre corpo, mente e alma.
          Acreditamos que saúde não é só o que comemos, mas também o que pensamos, sentimos e exploramos no mundo.
        </p>

        <Block>
          <h2>Nossa Missão</h2>
          <p>Promover bem-estar acessível através de conteúdo confiável e transformador.</p>

          <h2>Visão</h2>
          <p>Ser referência em saúde, alimentação e viagens conscientes.</p>

          <h2>Valores</h2>
          <ul>
            <li>Autenticidade</li>
            <li>Consistência</li>
            <li>Propósito</li>
            <li>Educação e bem-estar</li>
          </ul>
        </Block>

        <CTA>
          <h3>Quer colaborar ou anunciar?</h3>
          <p>Entre em contato e faça parte do nosso ecossistema de bem-estar.</p>
          <a href="mailto:contato@vivanoflow.com">Fale conosco</a>
        </CTA>
      </Section>
      <Footer />
    </>
  );
}

const Section = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  text-align: center;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    max-width: 800px;
    margin: 0 auto 2rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Block = styled.div`
  text-align: left;
  max-width: 800px;
  margin: 2rem auto;
  background: white;
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow.light};

  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-top: 1rem;
  }

  ul {
    list-style: none;
    margin-top: 1rem;

    li {
      margin: 0.5rem 0;
    }
  }
`;

const CTA = styled.div`
  margin-top: 3rem;

  a {
    display: inline-block;
    background: ${({ theme }) => theme.gradients.button};
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    margin-top: 1rem;

    &:hover {
      background: ${({ theme }) => theme.gradients.buttonHover};
    }
  }
`;
