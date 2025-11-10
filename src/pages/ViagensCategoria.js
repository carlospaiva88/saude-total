import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NavbarSpacer from "../components/Navbar/NavbarSpacer";

import Footer from "../components/Footer/Footer";
import viagensData from "../data/viagens";

export default function ViagensCategoria() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const viagens = viagensData[categoria] || [];

  console.log("categoria recebida:", categoria);
  console.log("viagens encontradas:", viagens);
  if (!viagens.length) {
    return <h2 style={{ padding: "3rem" }}>Categoria não encontrada 😕</h2>;
}
  return (
    <>
      <Helmet>
        <title>
          {categoria === "nacionais" ? "Viagens Nacionais" : "Viagens Internacionais"} | Viva no Flow
        </title>
        <meta
          name="description"
          content={`Descubra os melhores destinos ${categoria} para relaxar, explorar e viver o bem-estar.`}
        />
      </Helmet>

      <Navbar />
      <NavbarSpacer />
      <Section>
        <h1>
          {categoria === "nacionais" ? "🇧🇷 Viagens Nacionais" : "🌍 Viagens Internacionais"}
        </h1>
        <p>Escolha seu próximo destino inspirador.</p>

        <Grid>
          {viagens.map((v) => (
            <Card
              key={v.slug}
              onClick={() => navigate(`/viagens/${categoria}/${v.slug}`)}
            >
              <img src={v.image} alt={v.title} />
              <h3>{v.title}</h3>
              <p>{v.shortDescription}</p>
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
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadow.medium};
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }

  h3 {
    margin: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    margin: 0 1rem 1.5rem;
    color: #555;
  }
`;
