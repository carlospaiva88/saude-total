// src/components/Calculadora/CalculadorasPanel.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import IMCCalculator from "./IMC";
import CaloricaCalculator from "./Calorica";
import TMBCalculator from "./TMB";
import {
  PanelWrapper,
  PanelHeader,
  Tabs,
  TabButton,
  ContentGrid,
  LeftColumn,
  RightColumn,
  SideBox,
  MiniList,
  MiniItem
} from "./CalculadoraShared.styles";

import { recommend } from "../utils/recommender"; // ajuste se seu recommender estiver em outro caminho

export default function CalculadorasPanel() {
  const [tab, setTab] = useState("calorica");
  const [lastResult, setLastResult] = useState(null);

  const rec = recommend({
    goal: lastResult?.goal || "manter",
    tmb: lastResult?.tmb || null,
    weightKg: lastResult?.peso || null,
    limit: 4,
  });

  return (
    <PanelWrapper>
      <PanelHeader>
        <h1>Ferramentas de Saúde</h1>
        <p>Calculadoras rápidas: IMC, TMB e Calorias. Receba recomendações personalizadas após o cálculo.</p>
      </PanelHeader>

      <Tabs role="tablist" aria-label="Calculators">
        <TabButton active={tab === "calorica"} onClick={() => setTab("calorica")} role="tab">Calórica</TabButton>
        <TabButton active={tab === "imc"} onClick={() => setTab("imc")} role="tab">IMC</TabButton>
        <TabButton active={tab === "tmb"} onClick={() => setTab("tmb")} role="tab">TMB</TabButton>
      </Tabs>

      <ContentGrid>
        <LeftColumn>
          {tab === "calorica" && (
            <CaloricaCalculator onResult={(r) => setLastResult(r)} />
          )}
          {tab === "imc" && (
            <IMCCalculator onResult={(r) => setLastResult(r)} />
          )}
          {tab === "tmb" && (
            <TMBCalculator onResult={(r) => setLastResult(r)} />
          )}
        </LeftColumn>

        <RightColumn>
          <SideBox>
            <h4>Recomendações</h4>
            <p style={{ marginTop: 6, marginBottom: 12 }}>Baseado no último cálculo:</p>

            <MiniList>
              <strong style={{ marginBottom: 6 }}>Artigos</strong>
              {rec.articles.length ? rec.articles.map(a => (
                <MiniItem key={a.slug || a.id} as={Link} to={`/blog/${a.category || a.categoria || "geral"}/${a.slug || a.friendlySlug || a.id}`}>
                  <img src={a.image || a.imagem} alt={a.title || a.titulo} />
                  <div>
                    <small><strong>{a.title || a.titulo}</strong></small>
                    <small>{(a.excerpt || a.descricao || a.description || "").slice(0, 60)}...</small>
                  </div>
                </MiniItem>
              )) : <div>Sem sugestões de artigos</div>}
            </MiniList>
          </SideBox>

          <SideBox>
            <h4>Receitas</h4>
            <MiniList>
              {rec.recipes.length ? rec.recipes.map(r => (
                <MiniItem key={r.slug} as={Link} to={`/receitas/${r.slug}`}>
                  <img src={r.imagem || r.image} alt={r.titulo || r.title} />
                  <div>
                    <small><strong>{r.titulo || r.title}</strong></small>
                    <small>{r.tempo || ""}</small>
                  </div>
                </MiniItem>
              )) : <div>Sem receitas</div>}
            </MiniList>
          </SideBox>

          <SideBox>
            <h4>Produtos</h4>
            <MiniList>
              {rec.products.length ? rec.products.map(p => (
                <MiniItem key={p.id} as="a" href={p.affiliateLink || p.link} target="_blank" rel="noreferrer">
                  <img src={p.image} alt={p.name} />
                  <div>
                    <small><strong>{p.name}</strong></small>
                    <small>{p.price || ""}</small>
                  </div>
                </MiniItem>
              )) : <div>Sem produtos</div>}
            </MiniList>
          </SideBox>
        </RightColumn>
      </ContentGrid>
    </PanelWrapper>
  );
}
