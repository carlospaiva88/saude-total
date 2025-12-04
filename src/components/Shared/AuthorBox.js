// src/components/Article/AuthorBox.jsx
import React from "react";
import styled from "styled-components";
import logoImg from "../../components/Navbar/viva.png";


export default function AuthorBox({ author = {} }) {
  const name = author.name || "Viva no Flow";
  const bio = author.bio || "Conteúdo criado por especialistas em saúde e bem-estar. Siga para mais conteúdos práticos.";
  const avatar = author.avatar || logoImg;

  return (
    <Wrapper>
      <img src={avatar} alt={name} loading="lazy" />
      <div>
        <h4>{name}</h4>
        <p>{bio}</p>
        {author.twitter && <a href={author.twitter} target="_blank" rel="noreferrer">Seguir</a>}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`display:flex;gap:1rem;align-items:center;max-width:68ch;margin:1.25rem auto;padding:.75rem;border-radius:${({ theme }) => theme.radius.sm};background:${({ theme }) => theme.colors.surface};box-shadow:${({ theme }) => theme.shadow.xs}; img{width:64px;height:64px;border-radius:50%;object-fit:cover}`;
