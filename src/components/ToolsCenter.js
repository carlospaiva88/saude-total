// src/components/Tools/ToolsCenter.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ToolsCenter({ className }) {
return (
<Wrapper className={className}>
<h3>Central de Ferramentas</h3>
<p>
Uma coleção rápida de calculadoras e testes úteis — TMB, IMC, Macro,
Hidratação e mais.
</p>
<Link to="/ferramentas" className="cta">
Abrir Central →
</Link>
</Wrapper>
);
}

const Wrapper = styled.div`
padding: 0.8rem;
border-radius: 8px;
background: ${({ theme }) => theme.colors.surfaceAlt || "#fbfbfb"};

h3 {
margin: 0 0 0.25rem 0;
color: ${({ theme }) => theme.colors.primaryDark};
}

p {
margin: 0 0 0.6rem 0;
font-size: 0.92rem;
color: ${({ theme }) => theme.colors.text};
}

.cta {
display: inline-block;
padding: 0.5rem 0.75rem;
border-radius: 8px;
background: ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.surface};
text-decoration: none;
font-weight: 600;
}
`;






