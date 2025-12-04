// src/pages/ViagensCategoria.jsx
import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";
import viagensData from "../../data/viagens";
import { ViagemCardBase, ViagemCardImage, ViagemCardBody, ViagemCardTitle, ViagemCardDescription } from "../../components/Viagens/ViagemCard.style";

export default function ViagensCategoria() {
  const { categoria } = useParams();
  const navigate = useNavigate();
  const viagens = viagensData[categoria] || [];

  const pretty = categoria === "nacionais" ? "Viagens Nacionais" : categoria === "internacionais" ? "Viagens Internacionais" : categoria;

  return (
    <>
      <Helmet>
        <title>{pretty} | Viva no Flow</title>
        <meta name="description" content={`Descubra destinos ${pretty} para relaxar, explorar e viver o bem-estar.`} />
      </Helmet>

      <Navbar />
      <NavbarSpacer />

      <Section>
        <HeaderBox>
          <h1>{pretty}</h1>
          <p>Escolha seu próximo destino inspirador.</p>
        </HeaderBox>

        <Grid>
          {viagens.map((v) => (
            <ViagemCardBase key={v.slug} onClick={() => navigate(`/viagens/${categoria}/${v.slug}`)}>
              <ViagemCardImage src={v.image} alt={v.title} loading="lazy" />
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

/* styled local */
const Section = styled.section`padding: 3rem 2rem; max-width:1200px; margin:0 auto;`;
const HeaderBox = styled.div`text-align:center;margin-bottom:2rem;`;
const Grid = styled.div`display:grid; gap:1.5rem; grid-template-columns: repeat(auto-fit,minmax(260px,1fr));`;
