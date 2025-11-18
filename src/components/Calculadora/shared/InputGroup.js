import React from "react";
import styled from "styled-components";

export default function InputGroup({ label, value, onChange, type="number", placeholder }) {
  return (
    <Wrapper>
      <label>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  label {
    font-weight: 600;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  input {
    padding: 0.7rem 0.9rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    font-size: 1rem;
  }
`;
