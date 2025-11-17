import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar/Navbar";
import NavbarSpacer from "../components/Navbar/NavbarSpacer";
import HeroCarousel from "../components/Viagens/HeroCarousel";
import DestinosDestaque from "../components/Viagens/DestinosDestaque";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import {
  ViagemCardBase,
  ViagemCardImage,
  ViagemCardBody,
  ViagemCardTitle,
  ViagemCardDescription
} from "../components/Viagens/ViagemCard.style";

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
      <HeroCarousel />
      <DestinosDestaque />

      <Section>
        <h1>Escolha seu tipo de viagem</h1>
        <p>Explore o mundo enquanto cuida de você </p>

        <Grid>
          <ViagemCardBase onClick={() => navigate("/viagens/nacionais")}>
            <ViagemCardImage
              src="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg"
              alt="Viagens Nacionais"
            />
            <ViagemCardBody>
              <ViagemCardTitle>🇧🇷 Viagens Nacionais</ViagemCardTitle>
              <ViagemCardDescription>
                Natureza, cultura e gastronomia — dentro do Brasil.
              </ViagemCardDescription>
            </ViagemCardBody>
          </ViagemCardBase>

          <ViagemCardBase onClick={() => navigate("/viagens/internacionais")}>
            <ViagemCardImage
              src="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
              alt="Viagens Internacionais"
            />
            <ViagemCardBody>
              <ViagemCardTitle>🌍 Viagens Internacionais</ViagemCardTitle>
              <ViagemCardDescription>
                Descubra o mundo, novas culturas e bem-estar global.
              </ViagemCardDescription>
            </ViagemCardBody>
          </ViagemCardBase>
        </Grid>
      </Section>

      <Footer />
    </>
  );
}

const Section = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: #edf7f4;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap: 2rem;
  margin-top: 2rem;
`;
