import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { viagens } from "../../data/viagens";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Viagens() {
  return (
    <>
      <Helmet>
        <title>Viagens Saudáveis | Viva no Flow</title>
        <meta
          name="description"
          content="Descubra destinos incríveis que inspiram saúde, natureza e bem-estar. Viagens que transformam corpo e mente."
        />
      </Helmet>

      <Navbar />
      <Section>
        <h1>Viagens Saudáveis</h1>
        <p>Explore o mundo enquanto cuida de você.</p>

        <Grid>
          {viagens.map((item) => (
            <Card key={item.slug}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.shortDescription}</p>
              <a href={item.affiliateLink || `/viagens/${item.slug}`}>Saiba mais</a>
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
  transition: 0.3s;

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
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    margin: 0 1rem 1.5rem;
  }

  a {
    display: inline-block;
    margin-bottom: 1.5rem;
    padding: 0.6rem 1.2rem;
    background: ${({ theme }) => theme.gradients.button};
    color: white;
    border-radius: 30px;
    text-decoration: none;
  }
`;
