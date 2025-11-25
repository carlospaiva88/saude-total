// src/components/Recipes/TipsBox.jsx
import React from "react";
import styled from "styled-components";

export default function TipsBox({ tips = [], title = "Dicas do chef" }) {
  if (!tips || tips.length === 0) return null;
  return (
    <Wrapper aria-labelledby="tips-title">
      <h4 id="tips-title">{title}</h4>
      <ul>
        {tips.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 1.25rem;
  background: ${({theme}) => theme.colors.surface};
  padding: 0.9rem;
  border-radius: ${({theme}) => theme.radius.md};
  box-shadow: ${({theme}) => theme.shadow.xs};
  ul { margin:0;padding-left:1.05rem }
  li { margin-bottom:.5rem; color:${({theme})=>theme.colors.text} }
`;
