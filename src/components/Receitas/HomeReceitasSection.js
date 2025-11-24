// src/components/Receitas/HomeReceitasSection.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import receitas from "../../data/receitas";

// CardBase compartilhado
import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardDescription,
  CardButton,
  CardSticker,
} from "../CardBase/cardBase";

export default function HomeReceitasSection() {
  const todasReceitas = [
    ...(receitas.fitness || []),
    ...(receitas.salgadas || []),
    ...(receitas.doces || []),
  ];

  // apenas destaque (mas sem sticker "destaque")
  const receitasDestaque = todasReceitas.filter((r) => r.destaque);

  return (
    <SectionContainer aria-labelledby="receitas-destaque-title">
      <SectionHeader>
        <SectionTitle id="receitas-destaque-title">Receitas em destaque</SectionTitle>
        <HeaderActions>
          <ViewAll to="/receitas">Ver todas</ViewAll>
        </HeaderActions>
      </SectionHeader>

      {receitasDestaque.length === 0 ? (
        <EmptyBox>
          <p>Não encontramos receitas em destaque no momento.</p>
          <SmallNote>Confira a seção completa de receitas.</SmallNote>
        </EmptyBox>
      ) : (
        <RecipesGrid>
          {receitasDestaque.map((receita) => {
            const alt = receita.titulo || receita.nome || "Receita";
            const imgSrc = receita.imagem || receita.image || "/placeholder-4x3.png";
            const excerpt = receita.descricaoCurta || receita.description || "";

            return (
              <RecipeCard as={CardBase} key={receita.slug}>
                
                {/* ÚNICO STICKER DO CARD — categoria */}
                {receita.categoria && (
                  <CardSticker>
                    {String(receita.categoria).charAt(0).toUpperCase() + String(receita.categoria).slice(1)}
                  </CardSticker>
                )}

                <CardImage
                  src={imgSrc}
                  alt={alt}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = "/placeholder-4x3.png"; }}
                />

                <CardBodyStyled>
                  <CardTitle>{receita.titulo}</CardTitle>

                  <CardDescription>
                    {excerpt}
                  </CardDescription>

                  <FooterRow>
                    <CardButton as={Link} to={`/receitas/${encodeURIComponent(receita.slug)}`}>
                      Ver receita
                    </CardButton>

                    {receita.tempo && <TimeNote>{receita.tempo}</TimeNote>}
                  </FooterRow>
                </CardBodyStyled>
              </RecipeCard>
            );
          })}
        </RecipesGrid>
      )}
    </SectionContainer>
  );
}

/* ---------------- Styled ---------------- */

const SectionContainer = styled.section`
  max-width: ${({ theme }) => theme.layout?.maxWidth || "1200px"};
  margin: 0 auto;
  padding: 2.25rem 1rem;
`;

const SectionHeader = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:1.25rem;
`;

const SectionTitle = styled.h2`
  margin:0;
  color: ${({ theme }) => theme.colors?.primaryDark};
  font-size: clamp(1.4rem, 2.6vw, 2rem);
`;

const HeaderActions = styled.div``;

const ViewAll = styled(Link)`
  font-weight:700;
  color: ${({ theme }) => theme.colors?.primary};
  text-decoration:none;
  &:hover { opacity:0.7; }
`;

const EmptyBox = styled.div`
  padding:2rem;
  text-align:center;
  background: ${({ theme }) => theme.colors?.surface};
  border-radius:12px;
`;

const SmallNote = styled.p`
  margin-top:.25rem;
  color:#666;
`;

const RecipesGrid = styled.div`
  display:grid;
  gap:1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const RecipeCard = styled(CardBase)`
  position:relative;
  overflow:hidden;
`;

const CardBodyStyled = styled(CardBody)`
  display:flex;
  flex-direction:column;
  gap:0.5rem;
  flex:1;
`;

const FooterRow = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-top:auto;
`;

const TimeNote = styled.span`
  font-size:0.85rem;
  color:#666;
`;
