import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import receitasData from "../../data/receitas";
import {
  ReceitasContainer,
  BannerRotativo,
  BannerItem,
  BannerOverlay,
  CategoriasFiltro,
  ListaReceitas,
  ReceitaCard,
} from "./Receitas.styles";

const categorias = ["Todas", "Café da manhã", "Almoço", "Jantar", "Sobremesas", "Snacks"];

export default function Receitas() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [receitasFiltradas, setReceitasFiltradas] = useState(receitasData);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % receitasData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (categoriaAtiva === "Todas") {
      setReceitasFiltradas(receitasData);
    } else {
      setReceitasFiltradas(
        receitasData.filter((r) => r.categoria === categoriaAtiva)
      );
    }
  }, [categoriaAtiva]);

  return (
    <ReceitasContainer>
      {/* Banner rotativo */}
      <BannerRotativo>
        <AnimatePresence mode="wait">
          <BannerItem
            key={bannerIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `url(${receitasData[bannerIndex].imagem})`,
            }}
          >
            <BannerOverlay>
              <h2>{receitasData[bannerIndex].titulo}</h2>
              <p>{receitasData[bannerIndex].descricao}</p>
              <Link
                to={`/receitas/${receitasData[bannerIndex].slug}`}
                className="btn-banner"
              >
                Ver receita
              </Link>
            </BannerOverlay>
          </BannerItem>
        </AnimatePresence>
      </BannerRotativo>

      {/* Filtro */}
      <CategoriasFiltro>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={categoriaAtiva === cat ? "ativo" : ""}
          >
            {cat}
          </button>
        ))}
      </CategoriasFiltro>

      {/* Lista de receitas */}
      <ListaReceitas>
        <AnimatePresence>
          {receitasFiltradas.map((receita) => (
            <ReceitaCard
              key={receita.slug}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to={`/receitas/${receita.slug}`}>
                <img src={receita.imagem} alt={receita.titulo} />
                <div className="receita-info">
                  <h3>{receita.titulo}</h3>
                  <p>{receita.descricao}</p>
                  <span>{receita.categoria}</span>
                </div>
              </Link>
            </ReceitaCard>
          ))}
        </AnimatePresence>
      </ListaReceitas>
    </ReceitasContainer>
  );
}
