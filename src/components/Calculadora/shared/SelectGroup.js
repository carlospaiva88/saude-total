import React from "react";
import styled from "styled-components";

export default function SelectGroup({ label, value, onChange, options }) {
  return (
    <Wrapper>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-weight: 600;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  select {
    padding: 0.7rem 0.9rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    font-size: 1rem;
  }
`;
