import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  NavbarContainer,
  Logo,
  Menu,
  MenuItem,
  StyledNavLink,
  Hamburger,
  MobileMenu,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ResultsDropdown,
  ResultItem,
  EmojiIcon,
  NoResults,
} from './Navbar.styles';
import articlesData, { articlesArray } from '../../data/articles';
import productsData from '../../data/products';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  // Remove acentos e deixa tudo minúsculo
  const normalizeText = (text) => {
    if (!text) return '';
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  // Debounce para evitar buscas a cada tecla
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const lowerQuery = normalizeText(query);
      const filteredArticles = articlesArray
        .filter((article) =>
          [article.title, article.slug, article.friendlySlug]
            .some((f) => normalizeText(f).includes(lowerQuery))
        )
        .map((article) => ({
          type: 'article',
          title: article.title,
          description: article.excerpt || '',
          slug: `/blog/${article.category}/${article.subcategory}/${article.friendlySlug}`,
        }));

      const filteredProducts = productsData.products
      .filter((product) =>
        [product.name, product.description]
          .some((f) => normalizeText(f).includes(lowerQuery))
      )
      .map((product) => ({
        type: 'product',
        title: product.name,
        id: product.id,
        description: product.shortDescription || 'Veja mais detalhes na página de produtos.',
      }));


      setResults([...filteredArticles, ...filteredProducts]);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        results.length > 0
      ) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [results]);

  function handleResultClick(result) {
    if (result.type === 'article') {
      navigate(result.slug);
    } else if (result.type === 'product') {
      // Procura o produto no banco de dados para obter a categoria dele
      const product = productsData.products.find(p => p.id === result.id);
      if (product) {
        navigate('/produtos', { state: { 
          searchedProductId: result.id,
          searchedCategory: product.category
        } });
      }
    }
    setQuery('');
    setResults([]);
    setIsOpen(false);
}



  return (
    <NavbarContainer>
      <Logo>
        <StyledNavLink to="/" onClick={() => setIsOpen(false)}>
          Saúde em Movimento
        </StyledNavLink>
      </Logo>

      <Menu>
        <MenuItem>
          <StyledNavLink to="/produtos">Produtos</StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/blog">Blog de Saúde</StyledNavLink>
        </MenuItem>
      </Menu>

      <SearchContainer ref={searchRef}>
        <SearchInput
          type="text"
          placeholder="Pesquisar artigos ou produtos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar artigos ou produtos"
          aria-expanded={results.length > 0}
        />
       
        {results.length > 0 && (
          <ResultsDropdown>
            {results.map((result, index) => (
              <ResultItem
                key={index}
                onClick={() => handleResultClick(result)}
                role="option"
              >
                <EmojiIcon>{result.type === 'article' ? '📖' : '🛒'}</EmojiIcon>
                <div>
                  <strong>{result.title}</strong>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.9em', color: '#6c757d' }}>
                    {result.description}
                  </p>
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
