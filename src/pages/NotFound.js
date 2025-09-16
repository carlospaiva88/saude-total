import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Container>
        <h1>404 - Página não encontrada 😢</h1>
        <p>O conteúdo que você procura não existe ou foi movido.</p>
        <Link to="/blog">Voltar ao Blog</Link>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #e76f51;
  }

  a {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.7rem 1.5rem;
    background: #43aa8b;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      background: #2a6f61;
    }
  }
`;
