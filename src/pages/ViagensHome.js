import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import NavbarSpacer from "../components/Navbar/NavbarSpacer";

import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function ViagensHome() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Viagens | Viva no Flow</title>
        <meta
          name="description"
          content="Descubra destinos incríveis — nacionais e internacionais — que inspiram saúde, natureza e bem-estar."
        />
      </Helmet>

      <Navbar />
      <NavbarSpacer />
      <Section>
        <h1>Escolha seu tipo de viagem</h1>
        <p>Explore o mundo enquanto cuida de você 🌿✈️</p>

        <Grid>
          <Card onClick={() => navigate("/viagens/nacionais")}>
            <img
              src="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg"
              alt="Viagens Nacionais"
            />
            <h3>🇧🇷 Viagens Nacionais</h3>
            <p>Natureza, cultura e gastronomia — dentro do Brasil.</p>
          </Card>

          <Card onClick={() => navigate("/viagens/internacionais")}>
            <img
              src="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
              alt="Viagens Internacionais"
            />
            <h3>🌍 Viagens Internacionais</h3>
            <p>Descubra o mundo, novas culturas e bem-estar global.</p>
          </Card>
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.light};
  overflow: hidden;
  width: 300px;
  cursor: pointer;
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
    color: #444;
  }
`;
