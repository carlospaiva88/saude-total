// src/pages/Sobre.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import NavbarSpacer from "../Navbar/NavbarSpacer";
import Footer from "../Footer/Footer";

/**
 * Sobre — versão final conforme solicitado
 * - texto principal reescrito e integrado
 * - remove Timeline, Depoimentos, PressLogos, Números
 * - formulário de contato e newsletter melhorados
 * - todo estilo usa cores do theme.js
 * - JSON-LD Organization + founders
 */

export default function Sobre() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (sent) {
      const t = setTimeout(() => setSent(false), 5000);
      return () => clearTimeout(t);
    }
  }, [sent]);

  useEffect(() => {
    if (newsletterSent) {
      const t = setTimeout(() => setNewsletterSent(false), 5000);
      return () => clearTimeout(t);
    }
  }, [newsletterSent]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validateContact() {
    const errs = {};
    if (!form.nome || form.nome.trim().length < 2) errs.nome = "Insira seu nome.";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "E-mail inválido.";
    if (!form.mensagem || form.mensagem.trim().length < 6) errs.mensagem = "Escreva uma mensagem breve.";
    return errs;
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const errs = validateContact();
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // fallback mailto — você pode conectar a um backend depois
    const subject = encodeURIComponent("Contato via site — Sobre");
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nEmail: ${form.email}\n\nMensagem:\n${form.mensagem}`
    );
    window.location.href = `mailto:contato@vivanoflow.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ nome: "", email: "", mensagem: "" });
    setFormErrors({});
  }

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      alert("Por favor insira um e-mail válido.");
      return;
    }
    // placeholder: integra com provider (Mailchimp etc.)
    setNewsletterSent(true);
    setNewsletterEmail("");
  }

  const team = [
    {
      name: "Carlos Paiva",
      role: "Co-fundador — Tecnologia & Dados",
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      bio:
        "Desenvolvedor e data scientist. Cozinha, treina e transforma curiosidade em conteúdo prático.",
      socials: { instagram: "#", linkedin: "#" },
    },
    {
      name: "Marina Paiva",
      role: "Co-fundadora — Conteúdo & Produto",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      bio:
        "Designer e fotógrafa, apaixonada por receitas e práticas que trazem mais presença ao dia a dia.",
      socials: { instagram: "#", linkedin: "#" },
    },
  ];

  // JSON-LD Organization + founders
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Viva no Flow",
    url: "https://vivanoflow.com",
    logo: "https://vivanoflow.com/logo.png",
    sameAs: ["https://www.instagram.com/vivanoflow", "https://www.facebook.com/vivanoflow"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "contato@vivanoflow.com",
        contactType: "customer support",
        areaServed: ["PT", "BR"],
      },
    ],
    founder: [
      { "@type": "Person", name: "Carlos Paiva" },
      { "@type": "Person", name: "Marina Paiva" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Sobre Nós | Viva no Flow</title>
        <meta
          name="description"
          content="Viva no Flow — viver com mais equilíbrio. Receitas práticas, viagens conscientes e ferramentas para sua rotina."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />
      <NavbarSpacer />
      <Wrapper>
        <Hero>
          <HeroContent>
            <h1>Sobre Nós — Viva no Flow</h1>

            <Lead>
              No ritmo acelerado do mundo moderno, aprendemos juntos que viver bem não é sobre
              perfeição — é sobre equilíbrio. O Viva no Flow nasceu desse propósito: compartilhar um
              estilo de vida mais leve, consciente e alinhado ao que realmente importa.
            </Lead>

            <Paragraph>
              Somos um casal movido pela busca constante por bem-estar e evolução. Carlos Paiva é
              desenvolvedor, data scientist, cozinheiro de mão cheia, amante de esportes, jiu-jiteiro,
              calistênico e gamer nas horas vagas. Marina Paiva é arquiteta de soluções, designer,
              cozinheira apaixonada, fotógrafa e praticante dedicada de yoga. Diferentes em ritmos,
              complementares em essência — encontramos no equilíbrio o ponto comum que guia nossa vida.
            </Paragraph>

            <HeroCTAs>
              <Anchor href="/receitas">Ver receitas</Anchor>
              <OutlineAnchor href="/viagens">Explorar destinos</OutlineAnchor>
            </HeroCTAs>
          </HeroContent>

          <HeroImageWrap>
            <HeroImage
              src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg"
              alt="Carlos e Marina — Viva no Flow"
              loading="lazy"
            />
          </HeroImageWrap>
        </Hero>

        <Section>
          <SectionHeader>
            <h2>Nossa abordagem</h2>
            <p>
              Para nós, viver no flow é fluir com a vida: cuidar do corpo, da mente e das emoções com
              práticas simples e consistentes. Valorizamos a autenticidade e informação responsável.
            </p>
          </SectionHeader>

          <CardsGrid>
            <FeatureCard>
              <h3>Saúde holística</h3>
              <p>Conteúdo que integra aspectos físicos, mentais e emocionais — com base prática.</p>
            </FeatureCard>

            <FeatureCard>
              <h3>Receitas reais</h3>
              <p>Receitas simples, acessíveis e testadas — gostosas e alinhadas ao bem-estar.</p>
            </FeatureCard>

            <FeatureCard>
              <h3>Viagens com propósito</h3>
              <p>Dicas sinceras de destinos, hospedagens e experiências que valem a pena.</p>
            </FeatureCard>
          </CardsGrid>
        </Section>

        <Divider />

        <Section aria-labelledby="team-title">
          <h2 id="team-title">O time</h2>
          <p style={{ maxWidth: 780, margin: "0.5rem auto 1rem", textAlign: "center" }}>
            Pessoas reais por trás do conteúdo — expertise prática e cuidado editorial.
          </p>

          <TeamGrid>
            {team.map((m) => (
              <TeamCard key={m.name}>
                <figure>
                  <img src={m.img} alt={m.name} loading="lazy" />
                </figure>
                <div>
                  <h4>{m.name}</h4>
                  <small>{m.role}</small>
                  <p>{m.bio}</p>
                  <Socials>
                    {m.socials.instagram && <SocialLink href={m.socials.instagram}>Instagram</SocialLink>}
                    {m.socials.linkedin && <SocialLink href={m.socials.linkedin}>LinkedIn</SocialLink>}
                  </Socials>
                </div>
              </TeamCard>
            ))}
          </TeamGrid>
        </Section>

        <Divider />

        <Section aria-labelledby="colab-title">
          <h2 id="colab-title">Colabore com a gente</h2>
          <TwoCol>
            <Box>
              <h3>Parcerias & Conteúdo patrocinado</h3>
              <p>
                Se sua marca tem sinergia com saúde, sustentabilidade ou experiências, envie uma
                proposta. Trabalhamos com transparência e integração editorial.
              </p>
              <p>
                <a href="mailto:parcerias@vivanoflow.com">parcerias@vivanoflow.com</a>
              </p>
            </Box>

            <Box>
              <h3>Contribuições de especialistas</h3>
              <p>
                Nutricionistas, médicos, psicólogos e treinadores são bem-vindos para enviar artigos
                técnicos e guiados por referências. Envie seu pitch e referências.
              </p>
              <p>
                <a href="mailto:contato@vivanoflow.com">contato@vivanoflow.com</a>
              </p>
            </Box>
          </TwoCol>
        </Section>

        <Divider />

        <Section aria-labelledby="newsletter-title">
          <h2 id="newsletter-title">Newsletter</h2>
          <p>Curadoria semanal com receitas, roteiros e ferramentas práticas — sem spam.</p>

          <NewsletterForm onSubmit={handleNewsletterSubmit} aria-label="Formulário de newsletter">
            <input
              id="newsletter-email"
              type="email"
              placeholder="Seu melhor e-mail"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              aria-label="E-mail para newsletter"
              required
            />
            <button type="submit">Quero receber</button>
            {newsletterSent && <SuccessNote>Obrigado — confira seu e-mail em instantes.</SuccessNote>}
          </NewsletterForm>
        </Section>

        <Divider />

        <Section aria-labelledby="contato-title">
          <h2 id="contato-title">Fale com a gente</h2>
          <p>
            Use o formulário abaixo para mensagens rápidas — ou escreva para{" "}
            <a href="mailto:contato@vivanoflow.com">contato@vivanoflow.com</a>.
          </p>

          <ContactForm onSubmit={handleContactSubmit} aria-label="Formulário de contato">
            <div className="row">
              <label>
                Nome
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  aria-invalid={!!formErrors.nome}
                  required
                />
                {formErrors.nome && <FieldError>{formErrors.nome}</FieldError>}
              </label>

              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@exemplo.com"
                  aria-invalid={!!formErrors.email}
                  required
                />
                {formErrors.email && <FieldError>{formErrors.email}</FieldError>}
              </label>
            </div>

            <label className="full">
              Mensagem
              <textarea
                name="mensagem"
                rows="6"
                value={form.mensagem}
                onChange={handleChange}
                placeholder="Como podemos ajudar?"
                aria-invalid={!!formErrors.mensagem}
                required
              />
              {formErrors.mensagem && <FieldError>{formErrors.mensagem}</FieldError>}
            </label>

            <FormActions>
              <button type="submit">Enviar mensagem</button>
              {sent && <SuccessNote>Obrigado — abrimos seu app de e-mail.</SuccessNote>}
            </FormActions>
          </ContactForm>
        </Section>
      </Wrapper>

      <Footer />
    </>
  );
}

/* ---------------- Styles — todas as cores usam theme.colors.* ---------------- */

const Wrapper = styled.main`
  max-width: 1120px;
  margin: 2.4rem auto;
  padding: 0 1rem 4rem;
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-size: clamp(1.6rem, 3vw, 2.6rem);
    margin: 0 0 0.6rem;
    color: ${({ theme }) => theme.colors.primaryDark};
    line-height: 1.05;
  }
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.dark};
  margin: 0 0 0.9rem;
  font-weight: 600;
`;

const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1rem;
  max-width: 64ch;
  line-height: 1.6;
`;

const HeroCTAs = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Anchor = styled.a`
  display: inline-block;
  padding: 0.6rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-weight: 700;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadow.xs};
  &:hover {
    filter: brightness(0.98);
    transform: translateY(-2px);
  }
`;

const OutlineAnchor = styled(Anchor)`
  background: transparent;
  color: ${({ theme }) => theme.colors.primaryDark};
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
`;

const HeroImageWrap = styled.div`
  width: 100%;
  @media (max-width: 980px) {
    order: -1;
    margin-bottom: 1rem;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

/* Section / cards */
const Section = styled.section`
  padding: 1.5rem 0;
`;

const SectionHeader = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  h2 {
    color: ${({ theme }) => theme.colors.primaryDark};
    margin-bottom: 0.4rem;
  }
  p {
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 0.8rem;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};
  h3 {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 1.6rem 0;
`;

/* Team */
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.article`
  display: flex;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadow.xs};
  border: 1px solid ${({ theme }) => theme.colors.border};

  figure {
    margin: 0;
    width: 96px;
    height: 96px;
  }
  img {
    width: 96px;
    height: 96px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  h4 {
    margin: 0 0 0.25rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
  small {
    color: ${({ theme }) => theme.colors.secondaryDark};
    display: block;
    margin-bottom: 0.6rem;
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Socials = styled.div`
  margin-top: 0.6rem;
  display: flex;
  gap: 0.5rem;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;
`;

/* Two column boxes */
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Box = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.xs};

  h3 {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

/* Newsletter */
const NewsletterForm = styled.form`
  margin-top: 0.75rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input {
    padding: 0.7rem 0.9rem;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    outline: none;
    min-width: 260px;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    padding: 0.7rem 1rem;
    border-radius: ${({ theme }) => theme.radius.pill};
    border: none;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    font-weight: 700;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.xs};
  }
`;

/* Contact form */
const ContactForm = styled.form`
  margin-top: 1rem;
  display: grid;
  gap: 0.8rem;

  .row {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  label {
    display: block;
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.dark};
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem 0.9rem;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const FieldError = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.secondaryDark};
  margin-top: 0.35rem;
  font-size: 0.9rem;
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SuccessNote = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;
