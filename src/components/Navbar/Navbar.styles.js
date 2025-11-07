import styled, { keyframes } from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

const wave = keyframes`
  0% { background-position-x: 0; }
  100% { background-position-x: 60px; }
`;

export const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  margin: 0 auto;
  height: 144px;        // altura compacta
  background: #F8F6F3;
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
  box-shadow: ${({ theme }) => theme.shadow.light};
  transition: all 0.3s ease;
  overflow-x: hidden;

  @media (max-width: 768px) {
    height: 48px;
    padding: 0 0.5rem;
    max-width: 100%;
  }
`;


export const LogoImg = styled.img`
  height: 144px;    // proporção compacta
  width: auto;
  object-fit: contain;
  margin-right: 1rem;
  margin-left: 0;  // grudada na borda esquerda
  flex-shrink: 0;  // nunca comprime

  @media (max-width: 768px) {
    height: 26px;
  }
`;


export const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 1.5rem;
  flex: 1;
  min-width: 0;

  @media (max-width: 1024px) {
    gap: 1rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuItem = styled.li``;

export const StyledNavLink = styled(RouterNavLink)`
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;

  span {
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.dark};
    border-radius: 3px;
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
  top: 60px;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 0 0 10px 10px;
  padding: 1rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  list-style: none;
  z-index: 1200;
  gap: 1rem;

  ${MenuItem} {
    padding: 0 1.5rem;
    a {
      color: ${({ theme }) => theme.colors.text};
      text-decoration: none;
      transition: 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  flex: 0 1 220px;    // limite menor (antes 320px)
  max-width: 220px;
  min-width: 120px;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: ${({ showSearchMobile }) => (showSearchMobile ? "140px" : "auto")};
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 0.5rem 2rem 0.5rem 0.8rem;   // padding reduzido
  border-radius: 24px;                  // menos arredondado
  font-size: 0.85rem;                   // fonte menor
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
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.4rem;

  @media (max-width: 768px) {
    display: ${({ showSearchMobile }) => (showSearchMobile ? "none" : "block")};
  }
`;

export const ResultsDropdown = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.medium};
  max-height: 280px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  z-index: 200;
`;

export const ResultItem = styled.li`
  padding: 0.7rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #edf7f4;
  transition: 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #e9f5f1;
    color: ${({ theme }) => theme.colors.primary};
  }

  strong {
    display: block;
    font-weight: 600;
    font-size: 0.95rem;
  }

  p {
    font-size: 0.8rem;
    color: #6b7d7a;
    margin-top: 0.25rem;
  }
`;

export const EmojiIcon = styled.span`
  margin-right: 0.5rem;
`;

export const NoResults = styled.div`
  padding: 1rem;
  color: #6c757d;
  text-align: center;
  font-size: 0.9rem;
`;

export const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
`;