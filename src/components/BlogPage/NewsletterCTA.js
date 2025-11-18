// src/components/Blog/NewsletterCTA.jsx
import React, { useState } from "react";
import styled from "styled-components";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return alert("Digite um e-mail válido.");
    // Aqui você pode integrar API ou serviço (Mailchimp, ConvertKit...). Por enquanto só simula.
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setEmail("");
  };

  return (
    <Wrap>
      <h4>Receba novidades</h4>
      <p>1 email por semana com receitas, ferramentas e guias exclusivos.</p>
      <Form onSubmit={handleSubmit}>
        <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="seu@email.com" />
        <Button type="submit">{saved ? "Obrigado!" : "Inscrever"}</Button>
      </Form>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 0.6rem 0.2rem;
  h4 { margin: 0 0 0.3rem 0; color: ${({ theme }) => theme.colors.primaryDark}; }
  p { margin: 0 0 0.6rem 0; color: ${({ theme }) => theme.colors.text}; font-size:0.95rem; }
`;

const Form = styled.form`
  display:flex;
  gap:0.5rem;
`;

const Input = styled.input`
  flex:1;
  padding:0.5rem 0.65rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background:white;
`;

const Button = styled.button`
  padding:0.55rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.primary};
  color:white;
  font-weight:700;
  border:none;
  cursor:pointer;
`;
