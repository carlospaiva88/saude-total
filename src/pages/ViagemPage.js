import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import NavbarSpacer from "../components/Navbar/NavbarSpacer";

import Footer from "../components/Footer/Footer";
import viagensData from "../data/viagens";

export default function ViagemPage() {
  const { categoria, slug } = useParams();
  const viagem = viagensData[categoria]?.find((v) => v.slug === slug);

  if (!viagem) {
    return <h2 style={{ padding: "3rem" }}>Viagem não encontrada 😕</h2>;
  }

  return (
    <>
      <Helmet>
        <title>{viagem.title} | Viva no Flow</title>
        <meta name="description" content={viagem.shortDescription} />
      </Helmet>

      <Navbar />
      <NavbarSpacer />
      <Article>
        <Header>
          <img src={viagem.image} alt={viagem.title} />
          <h1>{viagem.title}</h1>
          <p>
            {viagem.date} • {viagem.readingTime}
          </p>
        </Header>

        <Content dangerouslySetInnerHTML={{ __html: viagem.content }} />

        {viagem.product && (
          <ProductBox>
            <h3>Produto Recomendado</h3>
            <a href={viagem.product.link} target="_blank" rel="noreferrer">
              <img src={viagem.product.image} alt={viagem.product.name} />
              <div>
                <h4>{viagem.product.name}</h4>
                <p>{viagem.product.description}</p>
              </div>
            </a>
          </ProductBox>
        )}
      </Article>
      <Footer />
    </>
  );
}

const Article = styled.article`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
`;

const Content = styled.div`
  line-height: 1.7;
  color: #333;
  h2, h3 { margin-top: 2rem; color: ${({ theme }) => theme.colors.primary}; }
  blockquote { border-left: 3px solid ${({ theme }) => theme.colors.primary}; padding-left: 1rem; font-style: italic; color: #555; }
`;

const ProductBox = styled.div`
  margin-top: 3rem;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
    justify-content: center;
  }
  img {
    width: 100px;
    border-radius: 10px;
  }
`;
