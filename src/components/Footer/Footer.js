import { FaInstagram, FaEnvelope } from "react-icons/fa";
import {
  FooterContainer,
  FooterContent,
  FooterLogo,
  FooterColumn,
  FooterBottom,
  SocialLinks,
  NewsletterForm,
} from "./Footer.styles";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <h2>Viva no Flow</h2>
          <p>
            Inspiração diária para uma vida mais equilibrada, saudável e cheia de energia.  
            Conecte corpo, mente e alma — todos os dias.
          </p>
        </FooterLogo>

        <FooterColumn>
          <h4>Explorar</h4>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/receitas">Receitas</a></li>
            <li><a href="/viagens">Viagens</a></li>
            <li><a href="/calculadora/imc">Calculadora IMC</a></li>
            <li><a href="/sobre">Sobre Nós</a></li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h4>Redes Sociais</h4>
          <SocialLinks>
            <a href="https://instagram.com/saudecommovimentobr" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </SocialLinks>
        </FooterColumn>

        <FooterColumn>
          <h4>Newsletter</h4>
          <p>Receba dicas exclusivas e novidades semanais no seu e-mail!</p>
          <NewsletterForm>
            <input type="email" placeholder="Seu e-mail" />
            <button><FaEnvelope /></button>
          </NewsletterForm>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <p>
          Como participante do Programa de Associados da Amazon, somos remunerados pelas compras qualificadas.
        </p>
        <p>© {new Date().getFullYear()} Saúde em Movimento. Todos os direitos reservados.</p>
      </FooterBottom>
    </FooterContainer>
  );
}
