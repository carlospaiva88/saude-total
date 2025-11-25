import React from "react";
import styled from "styled-components";

export default function SearchBox({ value, onChange }) {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Buscar receitas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin: 1rem 0 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.border || "#ccc"};
  outline: none;
  transition: 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
