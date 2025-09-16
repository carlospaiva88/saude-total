// Footer.js
import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FooterContainer, FooterTop, FooterBottom, SocialLinks } from "./Footer.styles";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterTop>
        <div>
          <h4>Saúde em Movimento</h4>
          <p>
            Conteúdo sobre saúde física, mental e emocional. 
            Dicas diárias e recomendações para transformar sua vida.
          </p>
        </div>
        <div>
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="#dicas">Dicas de Saúde</a></li>
            <li><a href="#produtos">Produtos Recomendados</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>
        <div>
          <h4>Redes Sociais</h4>
          <SocialLinks>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </SocialLinks>
        </div>
      </FooterTop>

      <FooterBottom>
        <p>
          Como participante do Programa de Associados da Amazon, somos remunerados pelas compras qualificadas.
        </p>
        <p>© 2025 Saúde em Movimento. Todos os direitos reservados.</p>
      </FooterBottom>
    </FooterContainer>
  );
}
