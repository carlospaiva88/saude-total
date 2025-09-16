import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { keyframes } from "styled-components";


const wave = keyframes`
  0% { background-position-x: 0; }
  100% { background-position-x: 60px; }
`;


export const NavbarContainer = styled.nav`
  background: #ffffff;
  padding: 1.5rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Logo = styled.div`
  position: relative;
  font-size: 2rem;
  font-weight: 700;
  color: #264653;
  user-select: none;

  a {
    color: inherit;
    text-decoration: none;
    position: relative;
    padding-bottom: 6px;
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-image: url('data:image/svg+xml;utf8,<svg width="120" height="8" viewBox="0 0 120 8" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="%2343aa8b" stroke-width="2" d="M0 4c15 8 30-8 45 0s30 8 45 0 30-8 45 0"/></svg>');
    background-repeat: repeat-x;
    background-size: 60px 8px;
    animation: ${wave} 4s linear infinite;
    pointer-events: none;
  }
`;


export const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    display: none; // Isso está correto!
  }
`;

export const MenuItem = styled.li``;


export const StyledNavLink = styled(RouterNavLink)`
  color: #264653;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  font-family: inherit;
  font-size: 1.1rem;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease;

  &.active {
    color: #2a6f61;
    border-bottom: none; /* sem sublinhado */
  }

`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    width: 100%;
    height: 3px;
    background: #264653;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 70px;
  right: 0;
  background: #ffffff;
  width: 220px;
  box-shadow: 0 6px 20px rgba(38, 70, 83, 0.15);
  border-radius: 0 0 0 12px;
  list-style: none;
  padding: 1rem 0;
  z-index: 999;
  transition: all 0.3s ease; // Opcional: animação suave

  ${MenuItem} {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;

    a {
      width: 100%;
      display: block;
      text-align: left;
      font-size: 1.1rem;
      text-decoration: none;
      color: #264653;
      font-family: inherit;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

// Adicione ao seu styles.js (ou Navbar.styles.js)
export const SearchContainer = styled.div`
  position: relative;
  margin-left: auto;       // Empurra para a direita
  width: 250px;            // Largura do input (ajuste conforme desejar)
  @media (max-width: 768px) {
    width: 180px;          // Largura menor em mobile, se quiser
  }
`;
export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #43aa8b;
  font-family: inherit;
  font-size: 0.95rem;
  background: #fff;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(67, 170, 139, 0.3);
  }
`;
export const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #40514e;
`;
export const ResultsDropdown = styled.ul`
  position: absolute;
  top: 100%;             // Logo abaixo do input
  left: 0;               // Alinhado à esquerda do container
  width: 100%;           // Mesma largura do input
  background: #fff;
  border: 1px solid #43aa8b;
  border-radius: 8px;
  max-height: 300px;     // Altura máxima (role interno)
  overflow-y: auto;      // Rolagem se muitos resultados
  margin-top: 0.5rem;    // Pequeno espaçamento
  padding: 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  z-index: 20;
  list-style: none;
`;


export const ResultItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  border-bottom: 1px solid #edf7f4;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #edf7f4;
  }
`;

export const EmojiIcon = styled.span`
  font-size: 1.1em;
`;
export const NoResults = styled.div`
  padding: 1rem;
  color: #6c757d;
  text-align: center;
`;
