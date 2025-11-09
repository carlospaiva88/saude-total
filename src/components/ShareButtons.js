import React from "react";
import styled from "styled-components";
import { FaLinkedin, FaFacebook, FaWhatsapp, FaInstagram, FaLink } from "react-icons/fa";

// Contêiner dos botões organizados horizontalmente
const ShareContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
`;

// Botão estilizado para ícones
const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #43aa8b;
  color: white;
  border-radius: 50%;
  width: 2.6rem;
  height: 2.6rem;
  font-size: 1.4rem;
  text-decoration: none;
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    background: #2a6f61;
  }
`;

// Função utilitária para copiar link para a área de transferência
const copiarParaAreaTransferencia = (texto) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(texto).then(() => {
      alert("Link copiado para a área de transferência!");
    });
  } else {
    alert("Seu navegador não suporta esta função.");
  }
};

export default function ShareButtons() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title || "Leia este artigo");
  const text = encodeURIComponent("Confira este artigo interessante!");

  // Link para copiar (atual da página)
  const linkParaCopiar = window.location.href;

  return (
    <ShareContainer aria-label="Compartilhar artigo nas redes sociais">
      <ShareButton
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no LinkedIn"
      >
        <FaLinkedin />
      </ShareButton>

      <ShareButton
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no Facebook"
      >
        <FaFacebook />
      </ShareButton>

      <ShareButton
        href={`https://api.whatsapp.com/send?text=${text}%20${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no WhatsApp"
      >
        <FaWhatsapp />
      </ShareButton>

      {/* Instagram não permite compartilhamento direto via URL, então usamos cópia do link */}
      <ShareButton
        as="button"
        onClick={() => copiarParaAreaTransferencia(linkParaCopiar)}
        aria-label="Copiar link para compartilhar no Instagram"
        title="Copiar link para compartilhar"
      >
        <FaInstagram />
      </ShareButton>

      {/* Botão para copiar link genérico */}
      <ShareButton
        as="button"
        onClick={() => copiarParaAreaTransferencia(linkParaCopiar)}
        aria-label="Copiar link para compartilhar"
        title="Copiar link para compartilhar"
      >
        <FaLink />
      </ShareButton>
    </ShareContainer>
  );
}
