import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NavbarSpacer from "../components/Navbar/NavbarSpacer";
import Footer from "../components/Footer/Footer";
import viagensData from "../data/viagens";
import {
  ViagemCardBase,
  ViagemCardImage,
  ViagemCardBody,
  ViagemCardTitle,
  ViagemCardDescription
} from "../components/Viagens/ViagemCard.style";

export default function ViagensCategoria() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const viagens = viagensData[categoria] || [];

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
            <ViagemCardBase
              key={v.slug}
              onClick={() => navigate(`/viagens/${categoria}/${v.slug}`)}
            >
              <ViagemCardImage src={v.image} alt={v.title} />
              <ViagemCardBody>
                <ViagemCardTitle>{v.title}</ViagemCardTitle>
                <ViagemCardDescription>{v.shortDescription}</ViagemCardDescription>
              </ViagemCardBody>
            </ViagemCardBase>
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
  background: #edf7f4;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
  gap: 2rem;
  margin-top: 2rem;
`;
