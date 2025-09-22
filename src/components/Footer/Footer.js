// Footer.js
import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FooterContainer, FooterTop, FooterBottom, SocialLinks } from "./Footer.styles";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterTop>
        <div>
          <h4>Saúde com Movimento</h4>
          <p>
            Conteúdo sobre saúde física, mental e emocional. 
            Dicas diárias e recomendações para transformar sua vida.
          </p>
        </div>
  
        <div>
          <h4>Redes Sociais</h4>
          <SocialLinks>
            <a href="http://instagram.com/saudecommovimentobr"><FaInstagram /></a>
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
