import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: white;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 1000;
  overflow: hidden;
`;

export const LogoImg = styled.img`
  height: 148px; /* tamanho original desktop */
  width: auto;
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 80px; /* reduzido no mobile */
  }
`;

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 32px;
  margin: 0;
  padding: 0;
  max-width: 600px;

  
  @media (max-width: 768px) {
    &[data-type="desktop"] {
      display: none;
    }
  }
`;


export const MenuItem = styled.li`
  font-size: 1rem;
  font-weight: 500;
`;

export const StyledNavLink = styled(NavLink)`
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;

  &.active {
    color: #2eb897;
  }

  &:hover {
    color: #2eb897;
  }
`;

export const SearchIconButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    color: #2eb897;
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenuContainer = styled(motion.div)`
  position: fixed;
  top: 70px;
  right: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background: white;
  backdrop-filter: blur(6px);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  z-index: 999;
`;

export const SearchOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 120px;
`;

export const SearchBox = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
`;

export const SearchInputLarge = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
`;

export const ResultsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ResultItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  strong {
    display: block;
    color: #333;
  }

  p {
    margin: 4px 0 0;
    color: #777;
    font-size: 0.9rem;
  }

  &:hover {
    strong {
      color: #2eb897;
    }
  }
`;

export const NoResults = styled.li`
  text-align: center;
  color: #999;
  padding: 16px 0;
`;
