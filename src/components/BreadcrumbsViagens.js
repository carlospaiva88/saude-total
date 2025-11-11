import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  const pathMap = {
    viagens: "Viagens",
    nacionais: "Viagens Nacionais",
    internacionais: "Viagens Internacionais",
    receitas: "Receitas Saudáveis",
    artigos: "Artigos",
  };

  let pathSoFar = "";

  return (
    <Wrapper
      as={motion.nav}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Trail>
        <Link to="/">🏠 Início</Link>
        {parts.map((part, i) => {
          pathSoFar += `/${part}`;
          const label = pathMap[part] || part.replace("-", " ");
          const isLast = i === parts.length - 1;

          return (
            <span key={part}>
              <Divider>-</Divider>
              {isLast ? (
                <strong>{label}</strong>
              ) : (
                <Link to={pathSoFar}>{label}</Link>
              )}
            </span>
          );
        })}
      </Trail>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto 1.5rem;
`;

const Trail = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.6rem 1rem;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  strong {
    color: #222;
    font-weight: 600;
  }
`;

const Divider = styled.span`
  color: #888;
`;
