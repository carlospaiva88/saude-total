// src/components/Blog/NewsletterCTA.jsx
import React, { useState } from "react";
import styled from "styled-components";

export default function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("Por favor, insira um email válido.");
      return;
    }
    // Simule um envio ou integre com seu serviço real (Mailchimp, ConvertKit, etc)
    setStatus("Obrigada por assinar a newsletter!");
    setEmail("");
  };

  return (
    <NewsletterWrapper>
      <h4>Assine nossa newsletter</h4>
      <Form onSubmit={handleSubscribe}>
        <Input
          type="email"
          placeholder="[translate:Seu email aqui]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Assinar</Button>
      </Form>
      {status && <StatusMessage>{status}</StatusMessage>}
    </NewsletterWrapper>
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
const NewsletterWrapper = styled.div`
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.xs};

  h4 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  form {
    display: flex;
    gap: 0.6rem;

    input {
      flex: 1;
      padding: 0.6rem;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.colors.border};
      font-size: 0.9rem;
    }

    button {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 700;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.85;
      }
    }
  }
`;

const StatusMessage = styled.p`
  margin-top: 0.8rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
