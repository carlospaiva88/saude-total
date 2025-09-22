import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { keyframes, css } from "styled-components";

const wave = keyframes`
  0% { background-position-x: 0; }
  100% { background-position-x: 60px; }
`;

export const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%; /* mudou para 100% */
  left: 0;
  right: 0;
  box-sizing: border-box;
  background: #ffffffcc;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.7rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: "Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
  }
`;


export const Logo = styled.div`
  position: relative;
  font-size: 1.9rem;
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
    display: none; /* oculta menu no mobile */
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
    border-bottom: none;
  }
`;

export const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1100; /* maior que NavbarContainer */

  span {
    width: 100%;
    height: 3px;
    background: #264653;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 40px;
  right: 0;
  background: #ffffffcc;
  backdrop-filter: blur(8px);
  border-radius: 0 0 8px 8px;
  list-style: none;
  padding: 1rem 0;
  box-shadow: 0 4px 18px rgba(0,0,0,0.15);
  min-width: 180px;
  z-index: 1200; /* maior que hamburguer */
  gap: 1rem;

  ${MenuItem} {
    padding: 0 1.5rem;

    a {
      display: block;
      width: 100%;
      font-size: 1.1rem;
      color: #264653;
      text-decoration: none;
      font-family: inherit;
      padding: 0.5rem 0;
    }
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-left: auto;
  width: 100%;
  max-width: 350px; /* ajusta para largura máxima aceitável */

  @media (max-width: 768px) {
    margin-left: 0;
    width: auto;
    max-width: 180px;
    flex-grow: 1;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 240px; /* largura máxima fixa */
  padding: 0.5rem 2.8rem 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #43aa8b;
  font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
  background: #fff;
  transition: width 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(67, 170, 139, 0.3);
  }

  @media (max-width: 768px) {
    max-width: 180px;
  }
`;

export const SearchButtonMobile = styled.button`
  display: none;
  background: transparent;
  border: none;
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #264653;
  font-size: 1.4rem;

  @media (max-width: 768px) {
    display: ${({ showSearchMobile }) => (showSearchMobile ? "none" : "block")};
  }
`;

export const ResultsDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #43aa8b;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 0.5rem;
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  z-index: 20;
  list-style: none;
`;

export const ResultItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 1px solid #edf7f4;
  color: #40514e; /* cor mais suave */

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #e2f0ea; /* cor de hover suave */
    color: #2a6f61;
  }

  strong {
    font-weight: 600;  /* menos negrito que bold 700 */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* fonte mais agradável */
    color: inherit;
  }

  p {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #647d67;
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
