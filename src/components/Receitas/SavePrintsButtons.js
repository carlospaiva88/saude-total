import React from "react";
import styled from "styled-components";

export default function SavePrintButtons({ recipe }) {
  const onSave = () => {
    try {
      const list = JSON.parse(localStorage.getItem("saved_recipes") || "[]");
      if (!list.find((r) => r.slug === recipe.slug)) {
        list.unshift({ slug: recipe.slug, titulo: recipe.titulo });
        localStorage.setItem("saved_recipes", JSON.stringify(list.slice(0, 30)));
        alert("Receita salva!");
      } else {
        alert("Receita já salva.");
      }
    } catch {
      alert("Falha ao salvar.");
    }
  };

  const onPrint = () => window.print();

  return (
    <Wrapper>
      <Btn onClick={onSave} type="button">💾 Salvar</Btn>
      <Btn onClick={onPrint} type="button">🖨 Imprimir</Btn>
    </Wrapper>
  );
}

const Wrapper = styled.div`display:flex;gap:0.6rem;`;
const Btn = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.45rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  cursor:pointer;
  font-weight:700;
`;
