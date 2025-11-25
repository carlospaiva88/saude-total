// src/pages/ReceitasPage.jsx
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";
import RecipeGrid from "../../components/Receitas/RecipeGrid";
import receitasData from "../../data/receitas";
import CategoryFilter from "../../components/Receitas/CategoryFilter";
import CTASection from "../../components/Receitas/CtaSection";
import RecipeHeroCarousel from "./RecipeHeroCarousel";
import SearchBox from "../../components/Receitas/SearchBox";

import SortSelect from "../../components/Receitas/SortSelect";

// helper: tenta extrair minutos de strings como "25 min", "1h 20m", "45m"
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return Number.POSITIVE_INFINITY;
  const s = String(timeStr).toLowerCase().trim();
  // exemplo "1h 20m" ou "1h20m"
  const hourMatch = s.match(/(\d+)\s*h/);
  const minMatch = s.match(/(\d+)\s*m/);
  let minutes = 0;
  if (hourMatch) minutes += parseInt(hourMatch[1], 10) * 60;
  if (minMatch) minutes += parseInt(minMatch[1], 10);
  // se não houver match mas houver número (ex: "25 min" coberto), try parseInt
  if (!hourMatch && !minMatch) {
    const justNum = s.match(/(\d+)/);
    if (justNum) minutes = parseInt(justNum[1], 10);
    else return Number.POSITIVE_INFINITY;
  }
  return minutes;
}

// helper: map dificuldade textual para número (menor = mais fácil)
function difficultyScore(dif) {
  if (!dif) return 99;
  const v = String(dif).toLowerCase();
  if (v.includes("fácil") || v.includes("facil") || v.includes("easy")) return 1;
  if (v.includes("médio") || v.includes("medio") || v.includes("medium")) return 2;
  if (v.includes("difícil") || v.includes("dificil") || v.includes("hard")) return 3;
  // se for número já
  const num = parseInt(v, 10);
  if (!Number.isNaN(num)) return num;
  return 99;
}

export default function ReceitasPage() {
  // concatena arrays de receitas (seguro caso alguma categoria esteja undefined)
  const todas = useMemo(() => [
    ...(receitasData.fitness || []),
    ...(receitasData.salgadas || []),
    ...(receitasData.doces || []),
    ...(receitasData.veganas || []), // <--- incluir veganas
  ].filter(Boolean), []); // remove falsy e memoiza

  const categorias = ["Todas", "Fitness", "Salgadas", "Doces", "Veganas"]; // <--- incluir Veganas
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [sortBy, setSortBy] = useState("recomendado");


  const receitasFiltradas = useMemo(() => {
    if (categoriaAtiva === "Todas") return todas;
    const key = categoriaAtiva.toLowerCase();
    // se a chave existir no index, retornamos, senão retornamos []
    return (receitasData[key] || []).filter(Boolean);
  }, [categoriaAtiva, todas]);

const receitasBuscadas = useMemo(() => {
  if (!busca?.trim()) return receitasFiltradas;
  const termo = busca.toLowerCase();
  return receitasFiltradas.filter(r =>
    (r.titulo || r.title || "").toLowerCase().includes(termo) ||
    (r.descricaoCurta || r.description || "").toLowerCase().includes(termo)
  );
}, [busca, receitasFiltradas]);

// Ordenação estável com fallback
const receitasOrdenadas = useMemo(() => {
  const arr = (receitasBuscadas || []).map((r, idx) => ({ r, idx }));

  const compare = (a, b) => {
    const A = a.r, B = b.r;
    switch (sortBy) {
      case "mais-recentes":
        // usa createdAt/date se existir — senão mantém ordem original (idx)
        if (A.createdAt && B.createdAt) {
          return new Date(B.createdAt) - new Date(A.createdAt);
        }
        return a.idx - b.idx;
      case "menos-calorias": {
        const ca = Number(A.calorias ?? A.nutritional?.calories ?? Number.POSITIVE_INFINITY);
        const cb = Number(B.calorias ?? B.nutritional?.calories ?? Number.POSITIVE_INFINITY);
        if (ca !== cb) return ca - cb;
        return a.idx - b.idx;
      }
      case "mais-calorias": {
        const ca = Number(A.calorias ?? A.nutritional?.calories ?? -1);
        const cb = Number(B.calorias ?? B.nutritional?.calories ?? -1);
        if (ca !== cb) return cb - ca;
        return a.idx - b.idx;
      }
      case "tempo-asc": {
        const ta = parseTimeToMinutes(A.tempo);
        const tb = parseTimeToMinutes(B.tempo);
        if (ta !== tb) return ta - tb;
        return a.idx - b.idx;
      }
      case "dificuldade-asc": {
        const da = difficultyScore(A.dificuldade);
        const db = difficultyScore(B.dificuldade);
        if (da !== db) return da - db;
        return a.idx - b.idx;
      }
      case "recomendado":
      default:
        return a.idx - b.idx; // ordem original (estável)
    }
  };

  arr.sort(compare);
  return arr.map(x => x.r);
}, [receitasBuscadas, sortBy]);

  // DEBUG temporário (remova em produção)
  // console.log("Receitas totais:", todas.length, todas.map(r => r?.slug));
  // console.log("Filtradas:", receitasFiltradas.length, receitasFiltradas.map(r => r?.slug));

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      {RecipeHeroCarousel ? <RecipeHeroCarousel receitas={todas} /> : null}

      <PageContainer>

        <HeaderRow>
          <PageTitle>Receitas</PageTitle>
          <HeaderActions>
            <p>{receitasFiltradas.length} receitas</p>
          </HeaderActions>
        </HeaderRow>

        <FilterRow>
          <CategoryFilter
            categorias={categorias.slice(1)} // passa as opções sem "Todas"
            categoriaAtiva={categoriaAtiva}
            onChange={(val) => setCategoriaAtiva(val)}
          />
        </FilterRow>
        <SearchBox value={busca} onChange={setBusca} />
        <RowControls>
         <SortSelect value={sortBy} onChange={setSortBy} />
        </RowControls>

        {/* Garanta que RecipeGrid receba somente itens válidos */}
      <RecipeGrid receitas={(receitasOrdenadas || []).filter(Boolean)} />

        <CTASection />
      </PageContainer>

      <Footer />
    </>
  );
}

/* Styled */
const PageContainer = styled.main`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const HeaderRow = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  margin-bottom: 0.6rem;
`;

const PageTitle = styled.h1`
  margin:0;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const HeaderActions = styled.div`
  color: ${({ theme }) => theme.colors.secondaryDark};
`;

const FilterRow = styled.div`
  margin: 1rem 0 1.8rem;
`;
const RowControls = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:1rem;
  margin-bottom: .75rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
