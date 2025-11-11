import { useParams, useNavigate } from "react-router-dom";
import receitas from "../../data/receitas";
import RecipeCard from "../../components/Receitas/RecipeCard";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import NavbarSpacer from "../../components/Navbar/NavbarSpacer";
import Footer from "../../components/Footer/Footer";

export default function ReceitasCategoria() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  const categoriaFormatada = categoria
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const receitasFiltradas = receitas.filter(
    (r) => r.categoria.toLowerCase().replace(/\s/g, "-") === categoria
  );

  return (
    <>
      <Navbar />
      <NavbarSpacer />

      <Container
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Breadcrumb>
          <span onClick={() => navigate("/")} className="link">
            Início
          </span>{" "}
          /{" "}
          <span onClick={() => navigate("/receitas")} className="link">
            Receitas
          </span>{" "}
          / <strong>{categoriaFormatada}</strong>
        </Breadcrumb>

        <Header>
          <h1>{categoriaFormatada}</h1>
          <p>
            Encontre receitas deliciosas e saudáveis de {categoriaFormatada.toLowerCase()} — todas testadas e aprovadas!
          </p>
        </Header>

        <Grid>
          {receitasFiltradas.map((r) => (
            <RecipeCard key={r.slug} receita={r} />
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

const Container = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.background};
  min-height: 80vh;
`;

const Breadcrumb = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;

  .link {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    transition: 0.3s;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = styled.header`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  p {
    color: #555;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  max-width: 1200px;
  margin: 0 auto;
`;
