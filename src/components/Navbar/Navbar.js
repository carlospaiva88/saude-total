import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import {
  NavbarContainer,
  LogoImg,
  Menu,
  MenuItem,
  StyledNavLink,
  SearchIconButton,
  SearchOverlay,
  SearchBox,
  SearchInputLarge,
  ResultsList,
  ResultItem,
  NoResults,
  MobileMenuButton,
  MobileMenuContainer,
} from "./Navbar.styles";

import { articlesArray } from "../../data/articles";
import productsData from "../../data/products";
import logoImg from "../../components/Navbar/viva.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const normalizeText = (text) =>
    text?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query.trim()) return setResults([]);

      const lowerQuery = normalizeText(query);

      const filteredArticles = articlesArray
        .filter((a) =>
          [a.title, a.slug, a.friendlySlug].some((f) =>
            normalizeText(f).includes(lowerQuery)
          )
        )
        .map((a) => ({
          type: "article",
          title: a.title,
          description: a.excerpt || "",
          slug: `/blog/${a.category}/${a.subcategory}/${a.friendlySlug}`,
        }));

      const filteredProducts = productsData.products
        .filter((p) =>
          [p.name, p.description].some((f) =>
            normalizeText(f).includes(lowerQuery)
          )
        )
        .map((p) => ({
          type: "product",
          title: p.name,
          id: p.id,
          description: p.shortDescription || "",
        }));

      setResults([...filteredArticles, ...filteredProducts]);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  function handleResultClick(result) {
    if (result.type === "article") {
      navigate(result.slug);
    } else if (result.type === "product") {
      const product = productsData.products.find((p) => p.id === result.id);
      if (product) {
        navigate("/produtos", {
          state: {
            searchedProductId: result.id,
            searchedCategory: product.category,
          },
        });
      }
    }
    setShowSearch(false);
    setQuery("");
    setResults([]);
  }

  return (
    <>
      <NavbarContainer>
    
      <LogoImg
        src={logoImg}
        alt="Viva no Flow"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

        {/* Menu Desktop */}
        <Menu data-type="desktop">
          <MenuItem><StyledNavLink to="/blog">Blog</StyledNavLink></MenuItem>
          <MenuItem><StyledNavLink to="/receitas">Receitas</StyledNavLink></MenuItem>
          <MenuItem><StyledNavLink to="/produtos">Produtos</StyledNavLink></MenuItem>
          <MenuItem><StyledNavLink to="/viagens">Viagens</StyledNavLink></MenuItem>
          <MenuItem><StyledNavLink to="/sobre">Sobre nós</StyledNavLink></MenuItem>
        </Menu>

        {/* Ícones à direita */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <SearchIconButton onClick={() => setShowSearch(true)}>
            <FiSearch size={22} />
          </SearchIconButton>

          {/* Botão Mobile */}
          <MobileMenuButton onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </MobileMenuButton>
        </div>
      </NavbarContainer>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenuContainer
            as={motion.div}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Menu style={{ flexDirection: "column", gap: "24px" }}>
              <MenuItem><StyledNavLink to="/blog" onClick={() => setMenuOpen(false)}>Blog</StyledNavLink></MenuItem>
              <MenuItem><StyledNavLink to="/receitas" onClick={() => setMenuOpen(false)}>Receitas</StyledNavLink></MenuItem>
              <MenuItem><StyledNavLink to="/produtos" onClick={() => setMenuOpen(false)}>Produtos</StyledNavLink></MenuItem>
              <MenuItem><StyledNavLink to="/viagens" onClick={() => setMenuOpen(false)}>Viagens</StyledNavLink></MenuItem>
              <MenuItem><StyledNavLink to="/sobrenos" onClick={() => setMenuOpen(false)}>Sobre nós</StyledNavLink></MenuItem>
              <MenuItem><StyledNavLink to="/calculadora" onClick={() => setMenuOpen(false)}>Ferramentas</StyledNavLink></MenuItem>

            </Menu>
          </MobileMenuContainer>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <SearchOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchBox
              as={motion.div}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1rem",
                }}
              >
                <FiSearch size={22} />
                <SearchInputLarge
                  type="text"
                  placeholder="Buscar artigos ou produtos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <FiX
                  size={22}
                  onClick={() => setShowSearch(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <ResultsList>
                {query && results.length === 0 && (
                  <NoResults>Nenhum resultado encontrado</NoResults>
                )}
                {results.map((result, i) => (
                  <ResultItem key={i} onClick={() => handleResultClick(result)}>
                    <strong>{result.title}</strong>
                    <p>{result.description}</p>
                  </ResultItem>
                ))}
              </ResultsList>
            </SearchBox>
          </SearchOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
