import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { PageShell, CalculatorsGrid } from "../../components/Calculadora/CalculadoraShared.styles";
import IMCCalculator from "../../components/Calculadora/IMC/IMCCalculator";
import TMBCalculator from "../../components/Calculadora/TMB/TMBCalculator";
import CaloriasCalculator from "../../components/Calculadora/Calorias/CaloriasCalculator";
import CalculadoraPreview from "../../components/Calculadora/CalculadoraPreview";
import { recommend } from "../../components/utils/recommender"; // ajuste caminho se necessário
import articlesData from "../../data/articles/index";
import receitasIndex from "../../data/receitas/index";
import productsData from "../../data/products";
import Navbar from "../../components/Navbar/Navbar"
import NavbarSpacer from "../../components/Navbar/NavbarSpacer"
import Footer from "../../components/Footer/Footer"


export default function GlobalCalculadoraPage() {
  const [active, setActive] = useState("calorias"); // default
  const [lastResult, setLastResult] = useState(null);

  // recomendações automáticas (simples)
  const recs = useMemo(() => recommend({
    goal: lastResult?.goal || "manter",
    tmb: lastResult?.tmb || null,
    limit: 4
  }), [lastResult]);

  // Recentes quick (para sidebar)
  const recent = useMemo(() => {
    const arr = Array.isArray(articlesData) ? articlesData : Object.values(articlesData || {});
    return arr.slice(0, 6);
  }, []);

  return (
   <>
   
    <PageShell>
      <Navbar />
      <NavbarSpacer />
      <Header>
        <Heading>Central de Ferramentas de Saúde</Heading>
        <Sub>IMC • TMB • Calorias • receitas e recomendações — tudo num só lugar.</Sub>
      </Header>

      <MainGrid>
        <LeftCol>
          <Tabs role="tablist" aria-label="Calculators">
            <Tab isActive={active === "imc"} onClick={() => setActive("imc")}>IMC</Tab>
            <Tab isActive={active === "tmb"} onClick={() => setActive("tmb")}>TMB</Tab>
            <Tab isActive={active === "calorias"} onClick={() => setActive("calorias")}>Calorias</Tab>
            <Spacer />
            <PreviewWrapper>
              <CalculadoraPreview />
            </PreviewWrapper>
          </Tabs>

          <ContentArea>
            {active === "imc" && <IMCCalculator onResult={(r) => setLastResult(r)} />}
            {active === "tmb" && <TMBCalculator onResult={(r) => setLastResult(r)} />}
            {active === "calorias" && <CaloriasCalculator onResult={(r) => setLastResult(r)} />}

            {/* Recomendações dinamicas */}
            <Section>
              <SectionTitle>Recomendações para você</SectionTitle>
              <CardsRow>
                {(recs.articles || []).map(a => (
                  <Card key={a.slug || a.id}>
                    <CardTitle>{a.title || a.titulo}</CardTitle>
                    <CardText>{(a.excerpt || a.descricao || "").slice(0, 100)}</CardText>
                    <SmallLink href={`/blog/${a.category || a.categoria || "geral"}/${a.slug || a.friendlySlug || a.id}`}>Ler artigo →</SmallLink>
                  </Card>
                ))}
                {(recs.recipes || []).map(r => (
                  <Card key={r.slug}>
                    <CardTitle>{r.titulo}</CardTitle>
                    <CardText>{(r.descricao || "").slice(0, 100)}</CardText>
                    <SmallLink href={`/receitas/${r.slug}`}>Ver receita →</SmallLink>
                  </Card>
                ))}
                {(recs.products || []).map(p => (
                  <Card key={p.id}>
                    <CardTitle>{p.name}</CardTitle>
                    <CardText>{(p.description || "").slice(0, 100)}</CardText>
                    <SmallLink href={p.affiliateLink || p.link} target="_blank" rel="noreferrer">Comprar →</SmallLink>
                  </Card>
                ))}
              </CardsRow>
            </Section>
          </ContentArea>
        </LeftCol>

        <RightCol>
          <SidebarBox>
            <h4>Artigos recentes</h4>
            <RecentList>
              {recent.map(a => (
                <RecentItem key={a.slug || a.id} href={`/blog/${a.category || a.categoria || "geral"}/${a.slug || a.friendlySlug || a.id}`}>
                  <strong>{a.title || a.titulo}</strong>
                  <small>{(a.excerpt || a.descricao || "").slice(0, 70)}...</small>
                </RecentItem>
              ))}
            </RecentList>

            <hr />

            <h4>Receitas rápidas</h4>
            {Object.values(receitasIndex || {}).flat().slice(0,4).map(r => (
              <RecentItem key={r.slug} href={`/receitas/${r.slug}`}>
                <strong>{r.titulo}</strong>
                <small>{r.tempo ? `${r.tempo} • ` : ""}{r.calorias ? `${r.calorias} kcal` : ""}</small>
              </RecentItem>
            ))}

            <hr />

            <h4>Produto em destaque</h4>
            {productsData?.products?.[0] && (
              <ProductHighlight>
                <img src={productsData.products[0].image} alt={productsData.products[0].name} />
                <div>
                  <strong>{productsData.products[0].name}</strong>
                  <small>{productsData.products[0].price}</small>
                  <a href={productsData.products[0].affiliateLink} target="_blank" rel="noreferrer">Ver produto</a>
                </div>
              </ProductHighlight>
            )}
          </SidebarBox>
        </RightCol>
      </MainGrid>
      
    </PageShell>
    <Footer />
   
   </>
  );
}

/* Styled components for the page */
const Header = styled.header`
  text-align: center;
  margin-bottom: 1.25rem;
`;
const Heading = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primaryDark};
`;
const Sub = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.25rem;
  margin-top: 1rem;

  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

const LeftCol = styled.div``;
const RightCol = styled.aside``;

const Tabs = styled.div`
  display:flex;
  gap: 0.6rem;
  align-items:center;
  margin-bottom: 1rem;
  flex-wrap:wrap;
`;

const Tab = styled.button`
  background: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.surface)};
  color: ${({ isActive, theme }) => (isActive ? "white" : theme.colors.text)};
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  box-shadow: ${({ isActive, theme }) => isActive ? theme.shadow.sm : "none"};
`;

const Spacer = styled.div`flex:1;`;

const PreviewWrapper = styled.div`min-width:220px;`;

const ContentArea = styled.div`
  background: transparent;
`;

const Section = styled.section`
  margin-top: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const CardsRow = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
  gap: 0.9rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.9rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadow.xs};
`;

const CardTitle = styled.div`
  font-weight: 700;
  margin-bottom: 0.45rem;
`;

const CardText = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.6rem;
`;

const SmallLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;
`;

const SidebarBox = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};
`;

const RecentList = styled.div`
  display:flex;
  flex-direction:column;
  gap:0.6rem;
`;

const RecentItem = styled.a`
  display:block;
  text-decoration:none;
  color:inherit;

  strong { display:block; color: ${({ theme }) => theme.colors.primaryDark}; }
  small { display:block; color: ${({ theme }) => theme.colors.text}; opacity:0.85; }
`;

const ProductHighlight = styled.div`
  display:flex;
  gap:0.7rem;
  align-items:center;
  img { width:64px; height:64px; object-fit:cover; border-radius:8px; }
  a { display:inline-block; margin-top:6px; color: ${({ theme }) => theme.colors.primary}; }
`;
