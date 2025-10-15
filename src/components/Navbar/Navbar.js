import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Logo from "../Navbar/Logo"; // ajuste caminho conforme sua estrutura
import {
  NavbarContainer,
  Menu,
  MenuItem,
  StyledNavLink,
  Hamburger,
  MobileMenu,
  SearchContainer,
  SearchInput,
  SearchButtonMobile,
  ResultsDropdown,
  ResultItem,
  EmojiIcon,
  NoResults,
} from "./Navbar.styles";
import { articlesArray } from "../../data/articles";
import productsData from "../../data/products";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const searchRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const normalizeText = (text) => {
    if (!text) return "";
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const lowerQuery = normalizeText(query);
      const filteredArticles = articlesArray
        .filter((article) =>
          [article.title, article.slug, article.friendlySlug].some((f) =>
            normalizeText(f).includes(lowerQuery)
          )
        )
        .map((article) => ({
          type: "article",
          title: article.title,
          description: article.excerpt || "",
          slug: `/blog/${article.category}/${article.subcategory}/${article.friendlySlug}`,
        }));

      const filteredProducts = productsData.products
        .filter((product) =>
          [product.name, product.description].some((f) =>
            normalizeText(f).includes(lowerQuery)
          )
        )
        .map((product) => ({
          type: "product",
          title: product.name,
          id: product.id,
          description:
            product.shortDescription ||
            "Veja mais detalhes na página de produtos.",
        }));

      setResults([...filteredArticles, ...filteredProducts]);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showSearchMobile &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearchMobile(false);
      }
      if (
        results.length > 0 &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchMobile, results]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setShowSearchMobile(false);
  }

  return (
    <NavbarContainer>
      <Logo />

      <Menu>
        <MenuItem>
          <StyledNavLink to="/produtos" onClick={() => setIsOpen(false)}>
            Produtos
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/blog" onClick={() => setIsOpen(false)}>
            Blog de Saúde
          </StyledNavLink>
        </MenuItem>
      </Menu>

      <SearchContainer ref={searchRef} showSearchMobile={showSearchMobile}>
        {(showSearchMobile || window.innerWidth > 768) && (
          <SearchInput
            type="text"
            placeholder={isMobile ? "Buscar Algo.." : "Pesquisar artigos ou produtos..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar artigos ou produtos"
            aria-expanded={results.length > 0}
            autoFocus={showSearchMobile}
            maxLength={100}
          />
        )}

        {!showSearchMobile && window.innerWidth <= 768 && (
          <SearchButtonMobile
            onClick={() => setShowSearchMobile(true)}
            aria-label="Abrir busca"
          >
            <FiSearch />
          </SearchButtonMobile>
        )}

        {results.length > 0 && (
          <ResultsDropdown role="listbox">
            {results.map((result, index) => (
              <ResultItem
                key={index}
                onClick={() => handleResultClick(result)}
                role="option"
                tabIndex={0}
              >
                <EmojiIcon>{result.type === "article" ? "📖" : "🛒"}</EmojiIcon>
                <div>
                  <strong>{result.title}</strong>
                  <p>{result.description}</p>
                </div>
              </ResultItem>

            ))}
          </ResultsDropdown>
        )}

        {query && results.length === 0 && (
          <ResultsDropdown>
            <NoResults>Nenhum resultado para “{query}”</NoResults>
          </ResultsDropdown>
        )}
      </SearchContainer>

      <Hamburger onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
        <span />
        <span />
        <span />
      </Hamburger>

      <MobileMenu isOpen={isOpen}>
        <MenuItem>
          <StyledNavLink to="/produtos" onClick={() => setIsOpen(false)}>
            Produtos
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/blog" onClick={() => setIsOpen(false)}>
            Blog de Saúde
          </StyledNavLink>
        </MenuItem>
      </MobileMenu>
    </NavbarContainer>
  );
}
