// src/components/Recipes/EbookCTA.jsx
import React from "react";
import styled from "styled-components";

export default function EbookCTA({ href = "/ebooks/viva_no_flow.pdf" }) {
  return (
    <Wrapper role="region" aria-labelledby="ebook-title">
      <Content>
        <Left>
          <h3 id="ebook-title">Baixe nosso ebook de receitas saudáveis</h3>
          <p>Receitas fáceis e nutritivas para toda a semana — planejadas para quem tem pouco tempo.</p>
          <Actions>
            <a href={href} download rel="noopener noreferrer">Baixar gratuitamente</a>
          </Actions>
        </Left>
        <Right>
          <img src="/ebook-cover-placeholder.png" alt="Capa do ebook" />
        </Right>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 2rem;
  background: linear-gradient(135deg, rgba(42,157,143,0.06), rgba(38,70,83,0.02));
  padding: 1rem;
  border-radius: ${({theme})=>theme.radius.md};
  box-shadow: ${({theme})=>theme.shadow.xs};
`;
const Content = styled.div`
  display:flex;gap:1rem;align-items:center;justify-content:space-between;
  @media(max-width:780px){flex-direction:column}
`;
const Left = styled.div`flex:1; h3{margin:0} p{margin:.4rem 0;color:${({theme})=>theme.colors.secondaryDark}}`;
const Actions = styled.div`margin-top:.6rem; a{background:${({theme})=>theme.colors.primary};color:white;padding:.6rem 1rem;border-radius:${({theme})=>theme.radius.pill};text-decoration:none;font-weight:700}`;
const Right = styled.div`width:120px img{width:100%;height:auto;border-radius:8px}`;
