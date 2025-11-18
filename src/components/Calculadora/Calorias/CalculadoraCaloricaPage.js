import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import CalculadoraCalorica from "../Calorias/CalculadoraCalorica";
import styled from "styled-components";
import { recommend } from "../../utils/recommender";

export default function CalculadoraCaloricaPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const resultado = state?.resultado || null;
  const rec = recommend({
    goal: resultado?.goal || "manter",
    tmb: resultado?.tmb || null,
    weightKg: null,
    limit: 3,
  });

  return (
    <>
      <Navbar />
      <Main>
        <Header>
          <h1>Calculadora Calórica — Detalhes</h1>
          <p>Entenda sua TMB, faixas energéticas e sugestões práticas de refeições e produtos.</p>
        </Header>
        <Columns>
          <Left>
            <CalculadoraCalorica />
            {resultado && (
              <InfoBox>
                <h3>Seu Resultado</h3>
                <p><strong>TMB:</strong> {resultado.tmb} kcal</p>
                <p><strong>Manutenção aprox.:</strong> {resultado.manutencao} kcal/dia</p>
                <p>
                  <strong>Macros sugeridos:</strong> {resultado.proteinaGr}g proteína • {resultado.carboGr}g carbo • {resultado.gorduraGr}g gord.
                </p>
              </InfoBox>
            )}

            <CalculadorasSection>
              <h3>Outras Calculadoras</h3>
              <CalculadorasList>
                <CalcPreviewCard onClick={() => navigate("/calculadoras/imc")}>
                  Calculadora de IMC
                </CalcPreviewCard>
                <CalcPreviewCard active onClick={() => navigate("/calculadoras/calorias")}>
                  Calculadora Calórica
                </CalcPreviewCard>
              </CalculadorasList>
            </CalculadorasSection>
          </Left>

          <Right>
            <SideBox>
              <h3>Artigos Populares</h3>
              <PopularList>
                {rec.articles.map(a => (
                  <SmallPopular
                    key={a.slug || a.id}
                    to={`/blog/${a.category || a.categoria || "geral"}/${a.slug || a.friendlySlug || a.id}`}
                  >
                    <img src={a.image || a.imagem} alt={a.title || a.titulo} />
                    <div>
                      <strong>{a.title || a.titulo}</strong>
                      <span>{(a.excerpt || a.descricao || a.description || "").slice(0, 60)}...</span>
                    </div>
                  </SmallPopular>
                ))}
              </PopularList>

              <hr />

              <h3>Receitas Recomendadas</h3>
              <MiniRecipes>
                {rec.recipes.map(r => (
                  <MiniRecipe key={r.slug} to={`/receitas/${r.slug}`}>
                    <img src={r.image || r.imagem} alt={r.titulo || r.title} />
                    <div>
                      <strong>{r.titulo || r.title}</strong>
                      <small>{r.tempo || ""}</small>
                    </div>
                  </MiniRecipe>
                ))}
              </MiniRecipes>

              <hr />

              <h3>Produtos</h3>
              <ProductList>
                {rec.products.map(p => (
                  <ProductLink key={p.id} href={p.affiliateLink || p.link} target="_blank" rel="noreferrer">
                    {p.name}
                  </ProductLink>
                ))}
              </ProductList>
            </SideBox>
          </Right>
        </Columns>
      </Main>
      <Footer />
    </>
  );
}

/* Styled components */
const Main = styled.main`
  max-width: 1100px;
  margin: 2.5rem auto;
  padding: 0 1rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 1.2rem;
  h1 {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 1.5rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div``;
const Right = styled.aside``;

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.xs};
`;

const CalculadorasSection = styled.section`
  margin-top: 3rem;
  text-align: center;
`;

const CalculadorasList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 1rem;
`;

const CalcPreviewCard = styled.button`
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.surface)};
  color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1rem 1.5rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: none;
  font-weight: 600;
  min-width: 180px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: white;
  }
`;

const SideBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
`;

const PopularList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SmallPopular = styled(Link)`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  text-decoration: none;
  color: inherit;

  img {
    width: 64px;
    height: 52px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  strong {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
  span {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
  }
`;

const MiniRecipes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

const MiniRecipe = styled(Link)`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  text-decoration: none;
  color: inherit;

  img {
    width: 64px;
    height: 52px;
    object-fit: cover;
    border-radius: 6px;
  }
  strong {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
  small {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ProductList = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ProductLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
