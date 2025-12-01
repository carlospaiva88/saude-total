// src/pages/GlobalCalculadoraPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { PageShell } from "../../components/Calculadora/CalculadoraShared.styles";
import IMCCalculator from "../../components/Calculadora/IMC/IMCCalculator";
import TMBCalculator from "../../components/Calculadora/TMB/TMBCalculator";
import CaloriasCalculator from "../../components/Calculadora/Calorias/CaloriasCalculator";
import { recommend } from "../../components/utils/recommender";
import articlesData from "../../data/articles/index";
import receitasIndex from "../../data/receitas/index";
import productsData from "../../data/products";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";

/* Helpers thumbnails */
const getThumbForArticle = (a) => a?.image || a?.imagem || a?.thumb || "/placeholder-16x9.png";
const getThumbForRecipe = (r) => r?.imagem || r?.image || "/placeholder-4x3.png";

/* small util: chave única para items (article/recipe/product) */
function uniqueKeyFor(data) {
  if (!data) return "";
  return (data.slug || data.id || data.title || data.titulo || JSON.stringify(data)).toString();
}

/* dedupe preserving order */
function dedupeByKey(items, keyFn) {
  const seen = new Set();
  const out = [];
  for (const it of items || []) {
    const k = keyFn(it);
    if (!k) continue;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

const STORAGE_KEY = "vnf_calculadora_history_v1";

export default function GlobalCalculadoraPage() {
  const [active, setActive] = useState("calorias");
  const [lastResult, setLastResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); } catch {}
  }, [history]);

  // Recommender depende apenas do lastResult (ok)
  const recs = useMemo(() => {
    try {
      return recommend({
        goal: lastResult?.goal || "manter",
        tmb: lastResult?.tmb || null,
        limit: 8
      }) || {};
    } catch (e) {
      console.warn("Recommender falhou:", e);
      return {};
    }
  }, [lastResult]);

  // Recent: garantir que não haja duplicatas (slug/id/title) e limite a 6
  const recent = useMemo(() => {
    const arr = Array.isArray(articlesData) ? articlesData : Object.values(articlesData || {});
    const dedup = dedupeByKey(arr, (a) => (a?.slug || a?.id || a?.title || a?.titulo || "").toString().trim());
    return dedup.slice(0, 6);
  }, []); // ESLint fix: array vazio

  // Unified visual recommendations for grid — manter ordem mas remover duplicatas entre tipos
  const visualRecs = useMemo(() => {
    const list = [];
    // push in priority order
    (recs.recipes || []).forEach(r => list.push({ kind: "recipe", data: r }));
    (recs.articles || []).forEach(a => list.push({ kind: "article", data: a }));
    (recs.products || []).forEach(p => list.push({ kind: "product", data: p }));

    // dedupe across kinds: key uses kind + uniqueKeyFor(data) to avoid conflicting recipe/article with same slug
    const deduped = [];
    const seen = new Set();
    for (const it of list) {
      const innerKey = uniqueKeyFor(it.data);
      const key = `${it.kind}:${innerKey}`;
      if (!innerKey) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(it);
      if (deduped.length >= 8) break;
    }

    return deduped;
  }, [recs]);

  // top 3 products for sidebar (guardando array e evitando repetição por id)
  const featuredProducts = useMemo(() => {
    const prods = Array.isArray(productsData?.products) ? productsData.products : [];
    return dedupeByKey(prods, (p) => (p?.id || p?.link || p?.affiliateLink || p?.name || "").toString()).slice(0, 3);
  }, []); // ESLint fix: array vazio

  // On result — payload already contains goal for both calculators
  function handleOnResult(r) {
    setLastResult(r);
    try {
      const entry = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        payload: r,
        type: r.tmb ? "tmb" : r.imc ? "imc" : "other"
      };
      setHistory(h => [entry, ...h].slice(0, 30));
    } catch {}
  }

  // Utility to interpret IMC
  function interpretIMC(imc) {
    if (imc < 18.5) return { label: "Abaixo do peso", advice: "Considere um leve superávit e foco em proteína e força." };
    if (imc < 25) return { label: "Faixa saudável", advice: "Mantenha rotina, sono e alimentação equilibrada." };
    if (imc < 30) return { label: "Sobrepeso", advice: "Reduza calorias gradualmente e aumente atividade física." };
    return { label: "Obesidade", advice: "Consulte profissional de saúde para plano individualizado." };
  }

  // Render richer result card
  function ResultRich({ data }) {
    if (!data) return null;
    // TMB path
    if (data.tmb) {
      const maintenance = Number(data.tmb) || 0;
      const lose = Math.max(800, Math.round(maintenance - 500));
      const gain = Math.round(maintenance + 300);
      return (
        <ResultPanel>
          <ResultTitle>Resultado TMB</ResultTitle>
          <ResultBody>
            <Row><strong>TMB:</strong> {maintenance.toLocaleString()} kcal/dia</Row>
            <Row><strong>Objetivo:</strong> {data.goal || "manter"}</Row>
            <Row><strong>Est. para manter:</strong> {maintenance.toLocaleString()} kcal</Row>
            <Row><strong>Est. para perder (–500):</strong> {lose.toLocaleString()} kcal</Row>
            <Row><strong>Est. para ganhar (+300):</strong> {gain.toLocaleString()} kcal</Row>
          </ResultBody>
          <ResultActions>
            <ActionButton
              onClick={async () => {
                try {
                  await navigator.clipboard?.writeText(JSON.stringify(data));
                  alert("Resultado copiado!");
                } catch {
                  alert("Não foi possível copiar — use Ctrl+C.");
                }
              }}
            >
              Copiar
            </ActionButton>
          </ResultActions>
        </ResultPanel>
      );
    }

    // IMC path
    if (data.imc) {
      const info = interpretIMC(Number(data.imc));
      return (
        <ResultPanel>
          <ResultTitle>Resultado IMC</ResultTitle>
          <ResultBody>
            <Row><strong>IMC:</strong> {data.imc}</Row>
            <Row><strong>Interpretação:</strong> {info.label}</Row>
            <Row><strong>Recomendação:</strong> {info.advice}</Row>
            <Row><strong>Objetivo:</strong> {data.goal || "manter"}</Row>
          </ResultBody>
          <ResultActions>
            <ActionButton
              onClick={async () => {
                try {
                  await navigator.clipboard?.writeText(JSON.stringify(data));
                  alert("Resultado copiado!");
                } catch {
                  alert("Não foi possível copiar — use Ctrl+C.");
                }
              }}
            >
              Copiar
            </ActionButton>
          </ResultActions>
        </ResultPanel>
      );
    }

    // generic fallback
    return (
      <ResultPanel>
        <ResultTitle>Resultado</ResultTitle>
        <ResultBody>
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
        </ResultBody>
      </ResultPanel>
    );
  }

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      <PageShell>
        <Header>
          <Heading>Central de Ferramentas de Saúde</Heading>
          <Sub>IMC • TMB • Calorias — recomendações visuais e produtos para apoiar seus objetivos.</Sub>
        </Header>

        <MainGrid>
          <LeftCol>
            <Tabs role="tablist" aria-label="Calculadoras">
              <Tab isActive={active === "imc"} onClick={() => setActive("imc")}>IMC</Tab>
              <Tab isActive={active === "tmb"} onClick={() => setActive("tmb")}>TMB</Tab>
              <Tab isActive={active === "calorias"} onClick={() => setActive("calorias")}>Calorias</Tab>
              <Spacer />
            </Tabs>

            <ContentArea>
              <CalcWrap>
                {active === "imc" && <IMCCalculator onResult={handleOnResult} />}
                {active === "tmb" && <TMBCalculator onResult={handleOnResult} />}
                {active === "calorias" && <CaloriasCalculator onResult={handleOnResult} />}
              </CalcWrap>

              <ResultRich data={lastResult} />

              <Section>
                <SectionTitle>Recomendações</SectionTitle>
                <VisualGrid>
                  {(visualRecs.length === 0) && <small>Faça um cálculo para ver recomendações personalizadas.</small>}
                  {visualRecs.map((it, idx) => {
                    const key = uniqueKeyFor(it.data) || idx;
                    if (it.kind === "recipe") {
                      const r = it.data || {};
                      return (
                        <VisualCard key={key} href={`/receitas/${encodeURIComponent(r.slug || r.id || "")}`}>
                          <VisualThumb style={{ backgroundImage: `url(${getThumbForRecipe(r)})` }} />
                          <VisualBody>
                            <VisualTag>Receita</VisualTag>
                            <VisualTitle>{r.titulo || r.title || "Receita"}</VisualTitle>
                            <VisualMeta>{r.tempo ? `${r.tempo}${r.calorias ? ` • ${r.calorias} kcal` : ""}` : ""}</VisualMeta>
                          </VisualBody>
                        </VisualCard>
                      );
                    }
                    if (it.kind === "article") {
                      const a = it.data || {};
                      const category = encodeURIComponent(a.category || a.categoria || "geral");
                      const slug = encodeURIComponent(a.slug || a.id || "");
                      return (
                        <VisualCard key={key} href={`/blog/${category}/${slug}`}>
                          <VisualThumb style={{ backgroundImage: `url(${getThumbForArticle(a)})` }} />
                          <VisualBody>
                            <VisualTag>Artigo</VisualTag>
                            <VisualTitle>{a.title || a.titulo || "Artigo"}</VisualTitle>
                            <VisualMeta>{(a.excerpt || a.descricao || "").slice(0, 80)}{(a.excerpt || a.descricao || "").length > 80 ? "…" : ""}</VisualMeta>
                          </VisualBody>
                        </VisualCard>
                      );
                    }
                    const p = it.data || {};
                    const href = p.affiliateLink || p.link || "#";
                    return (
                      <VisualCard key={key} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
                        <VisualThumb style={{ backgroundImage: `url(${p.image || "/placeholder-4x3.png"})` }} />
                        <VisualBody>
                          <VisualTag>Produto</VisualTag>
                          <VisualTitle>{p.name || p.title || "Produto"}</VisualTitle>
                          <VisualMeta>{p.price ? `€ ${p.price}` : p.brand || ""}</VisualMeta>
                        </VisualBody>
                      </VisualCard>
                    );
                  })}
                </VisualGrid>
              </Section>
            </ContentArea>
          </LeftCol>

          <RightCol>
            <SidebarBox aria-labelledby="sidebar-title">
              <h4 id="sidebar-title">Artigos recentes</h4>
              <RecentList>
                {recent.map(a => {
                  const category = encodeURIComponent(a.category || a.categoria || "geral");
                  const slug = encodeURIComponent(a.slug || a.id || "");
                  return (
                    <RecentItem key={uniqueKeyFor(a)} href={`/blog/${category}/${slug}`}>
                      <img src={getThumbForArticle(a)} alt={a.title || a.titulo || "Artigo"} />
                      <div>
                        <strong>{a.title || a.titulo}</strong>
                        <small>{((a.excerpt || a.descricao || "")).slice(0, 70)}{(a.excerpt || a.descricao || "").length > 70 ? "…" : ""}</small>
                      </div>
                    </RecentItem>
                  );
                })}
              </RecentList>

              <hr />

              <h4>Receitas rápidas</h4>
              {Object.values(receitasIndex || {}).flat().slice(0, 4).map(r => (
                <RecentItem key={uniqueKeyFor(r)} href={`/receitas/${encodeURIComponent(r.slug)}`}>
                  <img src={getThumbForRecipe(r)} alt={r.titulo || r.title || "Receita"} />
                  <div>
                    <strong>{r.titulo}</strong>
                    <small>{r.tempo ? `${r.tempo} • ` : ""}{r.calorias ? `${r.calorias} kcal` : ""}</small>
                  </div>
                </RecentItem>
              ))}

              <hr />

              <h4>Produtos recomendados</h4>
              {featuredProducts.length === 0 ? <small>Sem produtos no momento.</small> : featuredProducts.map(p => (
                <ProductHighlight key={uniqueKeyFor(p)}>
                  <img src={p.image || "/placeholder-4x3.png"} alt={p.name || "Produto"} />
                  <div>
                    <strong>{p.name}</strong>
                    <small>{p.price ? `€ ${p.price}` : "Ver preço"}</small>
                    <div style={{ marginTop: 6 }}>
                      <a href={p.affiliateLink || p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#fff", background: "#ff9900", padding: "6px 10px", borderRadius: 8, fontWeight: 700 }}>Ver</a>
                    </div>
                  </div>
                </ProductHighlight>
              ))}

              <hr />

              <h4>Resultados salvos</h4>
              {history.length === 0 ? <small>Nenhum resultado salvo ainda.</small> : (
                <SavedList>
                  {history.map(h => (
                    <SavedItem key={h.id}>
                      <div>
                        <strong>{new Date(h.createdAt).toLocaleString()}</strong>
                        <small>{h.type}</small>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => { setLastResult(h.payload); alert("Reaplicado"); }}>↺</button>
                        <button onClick={async () => { try { await navigator.clipboard?.writeText(JSON.stringify(h.payload)); alert("Copiado"); } catch { alert("Copiar falhou"); } }}>📋</button>
                        <button onClick={() => { setHistory(prev => prev.filter(x => x.id !== h.id)); }}>🗑</button>
                      </div>
                    </SavedItem>
                  ))}
                </SavedList>
              )}
            </SidebarBox>
          </RightCol>
        </MainGrid>
      </PageShell>

      <Footer />
    </>
  );
}

/* ------ Styled (aproveita os estilos que já usamos) ------ */

const Header = styled.header` text-align:center; margin-bottom:1.25rem; `;
const Heading = styled.h1` font-size:2rem; color: ${({ theme }) => theme.colors.primaryDark}; `;
const Sub = styled.p` color: ${({ theme }) => theme.colors.secondaryDark}; `;

const MainGrid = styled.div`
  display:grid;
  grid-template-columns: 1fr 340px;
  gap:1.25rem;
  max-width:1200px;
  margin:0 auto 3rem;
  padding: 0 1rem;
  @media(max-width:980px){ grid-template-columns:1fr; }
`;
const LeftCol = styled.div``;
const RightCol = styled.aside``;

const Tabs = styled.div` display:flex; gap:.6rem; align-items:center; margin-bottom:1rem; flex-wrap:wrap; `;
const Tab = styled.button` background:${({isActive, theme}) => isActive ? theme.colors.primary : theme.colors.surface}; color:${({isActive}) => isActive ? "white" : "inherit"}; padding:.6rem .9rem; border-radius:10px; border:none; font-weight:700; cursor:pointer; `;
const Spacer = styled.div` flex:1; `;

const ContentArea = styled.div``;
const CalcWrap = styled.div` margin-bottom: 1rem; `;

const Section = styled.section` margin-top:1.5rem; `;
const SectionTitle = styled.h3` margin-bottom:.8rem; color: ${({ theme }) => theme.colors.primaryDark}; `;

/* Visual grid */
const VisualGrid = styled.div` display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap:1rem; margin-top:.6rem; `;
const VisualCard = styled.a` display:block; text-decoration:none; color:inherit; border-radius:12px; overflow:hidden; background:${({theme}) => theme.colors.surface}; box-shadow:${({theme}) => theme.shadow.xs}; transition:transform .22s; min-height:220px; &:hover{ transform: translateY(-6px);} `;
const VisualThumb = styled.div` width:100%; height:140px; background-size:cover; background-position:center; `;
const VisualBody = styled.div` padding:.8rem; display:flex; flex-direction:column; gap:.4rem; `;
const VisualTag = styled.span` display:inline-block; background: rgba(42,157,143,0.08); color:${({theme}) => theme.colors.primary}; padding:.2rem .5rem; border-radius:999px; font-size:.75rem; font-weight:700; `;
const VisualTitle = styled.h4` margin:0; font-size:1rem; color:${({theme}) => theme.colors.primaryDark}; `;
const VisualMeta = styled.small` color:${({theme}) => theme.colors.secondaryDark}; margin-top:auto;`;

/* Sidebar */
const SidebarBox = styled.div` background:${({theme}) => theme.colors.surface}; padding:1rem; border-radius:${({theme}) => theme.radius.md}; box-shadow:${({theme}) => theme.shadow.xs}; `;
const RecentList = styled.div` display:flex; flex-direction:column; gap:.6rem; `;
const RecentItem = styled.a` display:flex; gap:.6rem; align-items:center; text-decoration:none; color:inherit; img{ width:64px; height:48px; object-fit:cover; border-radius:8px; flex-shrink:0;} div{ display:flex; flex-direction:column; } strong{ color:${({theme}) => theme.colors.primaryDark}; } small{ color:${({theme}) => theme.colors.secondaryDark}; } `;

const ProductHighlight = styled.div` display:flex; gap:0.7rem; align-items:center; img{ width:64px; height:64px; object-fit:cover; border-radius:8px; } a{ text-decoration:none; } `;

/* Result panel */
const ResultPanel = styled.div` margin-top:1rem; background:${({theme}) => theme.colors.surface}; padding:0.9rem; border-radius:${({theme}) => theme.radius.md}; box-shadow:${({theme}) => theme.shadow.xs}; `;
const ResultTitle = styled.h4` margin:0 0 0.6rem 0; `;
const ResultBody = styled.div` display:flex; flex-direction:column; gap:.4rem; `;
const Row = styled.div` font-size:.95rem; color:${({theme}) => theme.colors.text}; `;
const ResultActions = styled.div` display:flex; gap:.6rem; margin-top:0.6rem; `;
const ActionButton = styled.button` padding:.45rem .8rem; border-radius:8px; border:none; background:${({theme}) => theme.colors.primary}; color:white; font-weight:700; cursor:pointer; `;

const SavedList = styled.div` display:flex; flex-direction:column; gap:0.5rem; margin-top:0.6rem; `;
const SavedItem = styled.div` display:flex; justify-content:space-between; align-items:center; gap:0.6rem; small{ color:${({theme}) => theme.colors.secondaryDark}; } `;
