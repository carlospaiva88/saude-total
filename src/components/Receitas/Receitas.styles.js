import styled from "styled-components";
import { motion } from "framer-motion";

export const ReceitasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

/* Banner rotativo */
export const BannerRotativo = styled.div`
  position: relative;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
`;

export const BannerItem = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
`;

export const BannerOverlay = styled.div`
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  height: 100%;
  color: #fff;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 0.8rem;
  }

  .btn-banner {
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

/* Filtro */
export const CategoriasFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;

  button {
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 20px;
    padding: 0.4rem 1rem;
    font-weight: 500;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s;

    &.ativo {
      background: ${({ theme }) => theme.colors.primary};
      color: #fff;
      border-color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

/* Cards */
export const ListaReceitas = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

export const ReceitaCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.03);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .receita-info {
    padding: 1rem;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0.4rem;
    }

    p {
      font-size: 0.95rem;
      color: ${({ theme }) => theme.colors.textSecondary};
      margin-bottom: 0.6rem;
    }

    span {
      font-size: 0.85rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
