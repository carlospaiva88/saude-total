// src/pages/Sobre.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import NavbarSpacer from "../Navbar/NavbarSpacer";

import Footer from "../Footer/Footer";

/**
 * Página Sobre — versão enriquecida:
 * - SEO + JSON-LD (Organization)
 * - Missão, Visão, Valores
 * - História em timeline compacta
 * - Time (cards)
 * - Números / Impacto
 * - Depoimentos (simples)
 * - Logos de imprensa / parceiros
 * - CTA colaborador / newsletter + formulário de contato (mailto fallback)
 *
 * Observação: formulário de newsletter aqui é visual (não tem backend). Você conecta ao seu provider (Mailchimp, ConvertKit, etc.)
 * quando quiser: basta trocar o submit handler para chamar a API do provider.
 */

export default function Sobre() {
  // form state (contato)
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) {
      const t = setTimeout(() => setSent(false), 5000);
      return () => clearTimeout(t);
    }
  }, [sent]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    // fallback: abrir mailto com conteúdo prepreenchido
    const subject = encodeURIComponent("Contato via site - Sobre");
    const body = encodeURIComponent(`Nome: ${form.nome}\nEmail: ${form.email}\n\n${form.mensagem}`);
    const mailto = `mailto:contato@vivanoflow.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setSent(true);
    setForm({ nome: "", email: "", mensagem: "" });
  }

  // dados fictícios do time / métricas / depoimentos — troque pelos seus reais
  const team = [
    { name: "Mariana Alves", role: "Fundadora & Editora Chefe", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg", bio: "Nutricionista de formação, apaixonada por viagens e conteúdo prático." },
    { name: "Lucas Pereira", role: "Diretor de Conteúdo", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg", bio: "Jornalista e roteirista, responsável pelos guias de viagem." },
    { name: "Ana Costa", role: "Head de Produto", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg", bio: "Design e growth — faz os produtos digitais ganharem vida." },
  ];

  const metrics = [
    { label: "Leitores / mês", value: "120k+" },
    { label: "Receitas publicadas", value: "420+" },
    { label: "Destinos cobertos", value: "180+" },
    { label: "Parceiros ativos", value: "36" },
  ];

  const testimonials = [
    { name: "João M.", text: "Mudei minha rotina com as receitas e os roteiros — o site virou referência para meus finais de semana." },
    { name: "Clara S.", text: "Conteúdo honesto, receitas fáceis e um tom humano. Recomendo sempre!" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Viva no Flow",
    "url": "https://vivanoflow.com",
    "logo": "https://vivanoflow.com/logo.png",
    "sameAs": [
      "https://www.instagram.com/vivanoflow",
      "https://www.facebook.com/vivanoflow"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "contato@vivanoflow.com",
        "contactType": "customer support",
        "areaServed": "PT, BR"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Sobre Nós | Viva no Flow</title>
        <meta
          name="description"
          content="Conheça a missão do Viva no Flow: inspirar uma vida equilibrada com saúde, receitas, viagens e bem-estar."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />
      <NavbarSpacer/>
      <Wrapper>
        <Hero>
          <HeroText>
            <h1>Quem somos — Viva no Flow</h1>
            <p>
              Inspiramos milhares de pessoas a viverem com mais energia, saúde e curiosidade. Conteúdo prático de nutrição, viagens conscientes e bem-estar.
            </p>
            <HeroCTAs>
              <a href="/receitas" className="btn">Ver Receitas</a>
              <a href="/viagens" className="btn outline">Explorar Destinos</a>
            </HeroCTAs>
          </HeroText>
          <HeroImage
            src="https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg"
            alt="Equipe Viva no Flow"
            loading="lazy"
          />
        </Hero>

        <Section aria-labelledby="missao-title">
          <Intro>
            <h2 id="missao-title">Nossa Missão</h2>
            <p>
              Ajudar pessoas a encontrar o equilíbrio entre corpo, mente e experiências — com receitas simples, guias de viagem conscientes e conteúdo baseado em prática e evidência.
            </p>
          </Intro>

          <Grid>
            <Card>
              <h3>Visão</h3>
              <p>Ser a referência em conteúdo prático para uma vida mais saudável e cheia de descobertas.</p>
            </Card>
            <Card>
              <h3>Valores</h3>
              <ul>
                <li>Transparência</li>
                <li>Praticidade</li>
                <li>Respeito ao tempo do leitor</li>
                <li>Cuidado com o planeta</li>
              </ul>
            </Card>
            <Card>
              <h3>Como trabalhamos</h3>
              <p>Produção ética: testes reais, fontes confiáveis e conteúdo testado por especialistas quando necessário.</p>
            </Card>
          </Grid>
        </Section>

        <Divider />

        <Section aria-labelledby="history-title">
          <h2 id="history-title">Nossa história em poucas linhas</h2>
          <Timeline>
            <TimelineItem>
              <time>2017</time>
              <div>
                <strong>Início</strong>
                <p>Começamos como um blog de receitas saudáveis e rapidamente ganhamos leitores fiéis.</p>
              </div>
            </TimelineItem>

            <TimelineItem>
              <time>2019</time>
              <div>
                <strong>Expansão</strong>
                <p>Incluímos guias de viagem e conteúdo sobre hábitos — o público cresceu e formamos nossa pequena equipe.</p>
              </div>
            </TimelineItem>

            <TimelineItem>
              <time>2022</time>
              <div>
                <strong>Plataforma</strong>
                <p>Lançamos cursos, e-books e parcerias com marcas alinhadas ao nosso propósito.</p>
              </div>
            </TimelineItem>

            <TimelineItem>
              <time>2025</time>
              <div>
                <strong>Presente</strong>
                <p>Somos uma comunidade ativa com conteúdo diário e projetos editoriais recorrentes.</p>
              </div>
            </TimelineItem>
          </Timeline>
        </Section>

        <Divider />

        <Section aria-labelledby="team-title">
          <h2 id="team-title">O time</h2>
          <p style={{ maxWidth: 860, margin: "0.25rem auto 1rem" }}>Pessoas reais — profissionais de conteúdo, nutrição e experiência de viagem.</p>

          <TeamGrid>
            {team.map((m) => (
              <TeamCard key={m.name}>
                <img src={m.img} alt={m.name} loading="lazy" />
                <div className="info">
                  <h4>{m.name}</h4>
                  <small>{m.role}</small>
                  <p>{m.bio}</p>
                  <Socials>
                    <a href="#" aria-label={`Instagram ${m.name}`}>IG</a>
                    <a href="#" aria-label={`LinkedIn ${m.name}`}>LI</a>
                  </Socials>
                </div>
              </TeamCard>
            ))}
          </TeamGrid>
        </Section>

        <Divider />

        <Section aria-labelledby="impacto-title">
          <h2 id="impacto-title">Nossos números</h2>
          <Stats>
            {metrics.map((m) => (
              <Stat key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </Stat>
            ))}
          </Stats>
        </Section>

        <Divider />

        <Section aria-labelledby="testes-title">
          <h2 id="testes-title">Depoimentos</h2>
          <Testimonials>
            {testimonials.map((t, i) => (
              <Testimonial key={i}>
                <p>“{t.text}”</p>
                <footer>— {t.name}</footer>
              </Testimonial>
            ))}
          </Testimonials>
        </Section>

        <Divider />

        <Section aria-labelledby="press-title">
          <h2 id="press-title">Onde já fomos mencionados</h2>
          <PressLogos>
            <img src="https://via.placeholder.com/140x48?text=Folha" alt="Folha" />
            <img src="https://via.placeholder.com/140x48?text=GQ" alt="GQ" />
            <img src="https://via.placeholder.com/140x48?text=Vogue" alt="Vogue" />
            <img src="https://via.placeholder.com/140x48?text=Veja" alt="Veja" />
          </PressLogos>
        </Section>

        <Divider />

        <Section aria-labelledby="colab-title">
          <h2 id="colab-title">Colabore com a gente</h2>
          <TwoCol>
            <div>
              <h3>Parcerias & Conteúdo patrocinado</h3>
              <p>Se sua marca tem sinergia com saúde, sustentabilidade e experiências, nos envie uma proposta.</p>
              <p><a href="mailto:parcerias@vivanoflow.com">parcerias@vivanoflow.com</a></p>
            </div>

            <div>
              <h3>Quer contribuir com um artigo?</h3>
              <p>Enviamos guidelines e oferecemos feedback — escreva para <a href="mailto:contato@vivanoflow.com">contato@vivanoflow.com</a>.</p>
            </div>
          </TwoCol>
        </Section>

        <Divider />

        <Section aria-labelledby="newsletter-title">
          <h2 id="newsletter-title">Fique por dentro — Newsletter</h2>
          <p>Receba nossa curadoria semanal: receitas fáceis, roteiros e ferramentas para uma rotina com mais flow.</p>

          <NewsletterForm onSubmit={(e) => { e.preventDefault(); alert("Obrigado! Em produção conectamos no provider."); }}>
            <input type="email" placeholder="Seu melhor e-mail" aria-label="email" required />
            <button type="submit">Quero receber</button>
            <small>Prometemos envio responsável — sem spam.</small>
          </NewsletterForm>
        </Section>

        <Divider />

        <Section aria-labelledby="contato-title">
          <h2 id="contato-title">Fale com a gente</h2>
          <p>Use o formulário abaixo para mensagens rápidas — ou envie um e-mail diretamente para <a href="mailto:contato@vivanoflow.com">contato@vivanoflow.com</a>.</p>

          <ContactForm onSubmit={handleContactSubmit}>
            <label>
              Nome
              <input name="nome" value={form.nome} onChange={handleChange} required />
            </label>

            <label>
              E-mail
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>

            <label style={{ gridColumn: "1 / -1" }}>
              Mensagem
              <textarea name="mensagem" rows="5" value={form.mensagem} onChange={handleChange} required />
            </label>

            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, alignItems: "center" }}>
              <button type="submit">Enviar mensagem</button>
              {sent && <span style={{ color: "green" }}>Mensagem direcionada ao seu app de e-mail.</span>}
            </div>
          </ContactForm>
        </Section>
      </Wrapper>

      <Footer />
    </>
  );
}

/* ---------------- Styles ---------------- */

const Wrapper = styled.main`
  max-width: 1100px;
  margin: 2.4rem auto;
  padding: 0 1rem 4rem;
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

const HeroText = styled.div`
  h1 { font-size: clamp(1.6rem, 3vw, 2.8rem); margin: 0 0 .6rem; color: ${({ theme }) => theme.colors?.primary || "#163d35"}; }
  p { margin: 0 0 1rem; color: ${({ theme }) => theme.colors?.text || "#444"}; max-width: 50ch; }
  .btn { display:inline-block; padding:.6rem 1rem; margin-right:.6rem; border-radius:999px; text-decoration:none; font-weight:700; background:${({ theme })=>theme.colors?.primary||"#2a6f61"}; color:white; }
  .btn.outline { background: transparent; color: ${({ theme }) => theme.colors?.primary || "#2a6f61"}; border: 2px solid ${({ theme }) => theme.colors?.primary || "#2a6f61"}; }
`;

const HeroImage = styled.img`
  width:100%;
  height:260px;
  object-fit:cover;
  border-radius:12px;
  box-shadow: ${({ theme }) => theme.shadow?.sm || "0 8px 30px rgba(0,0,0,0.06)"};
`;

const Section = styled.section`
  padding: 1.5rem 0;
`;

const Intro = styled.div`
  text-align:left;
  max-width: 900px;
  margin: 0 auto 1rem;
  h2 { margin: 0 0 .4rem; color: ${({ theme }) => theme.colors?.primary || "#163d35"}; }
  p { margin: 0; color: ${({ theme }) => theme.colors?.text || "#333"}; }
`;

const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  @media(max-width:980px){ grid-template-columns: 1fr; }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 6px 18px rgba(16,88,71,0.04)"};
  text-align: left;
  h3 { margin: 0 0 .5rem; }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors?.border || "#eee"};
  margin: 1.6rem 0;
`;

const Timeline = styled.div`
  display:flex;
  flex-direction:column;
  gap: 1rem;
  max-width: 900px;
  margin: 1rem auto;
`;

const TimelineItem = styled.div`
  display:flex;
  gap: 1rem;
  align-items:flex-start;
  time { font-weight:700; color: ${({ theme }) => theme.colors?.primary || "#2a6f61"}; min-width:72px; }
  div { background: ${({ theme }) => theme.colors?.surface || "#fff"}; padding: 1rem; border-radius:10px; box-shadow: ${({ theme })=>theme.shadow?.xs || "0 6px 18px rgba(16,88,71,0.03)"}; }
  @media(max-width:720px){ flex-direction:column; }
`;

const TeamGrid = styled.div`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media(max-width:980px){ grid-template-columns: 1fr; }
`;

const TeamCard = styled.article`
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 6px 18px rgba(16,88,71,0.04)"};
  display:flex;
  gap: .8rem;
  align-items:flex-start;
  padding: .8rem;
  img { width:84px; height:84px; object-fit:cover; border-radius:10px; flex-shrink:0; }
  .info { h4 { margin:0; } small { color: ${({ theme }) => theme.colors?.secondaryDark || "#6b8a7b"}; } p { margin: .45rem 0 0; color: ${({ theme }) => theme.colors?.text || "#444"}; } }
`;

const Socials = styled.div`
  margin-top: .6rem;
  display:flex;
  gap:.5rem;
  a { color: ${({ theme }) => theme.colors?.primary || "#2a6f61"}; font-weight:700; text-decoration:none; font-size:.85rem; }
`;

const Stats = styled.div`
  display:flex;
  gap: 1rem;
  flex-wrap:wrap;
  justify-content:center;
  margin-top: 1rem;
`;

const Stat = styled.div`
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  padding: 1rem 1.2rem;
  border-radius: 10px;
  min-width: 140px;
  text-align:center;
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 6px 18px rgba(16,88,71,0.03)"};
  strong { display:block; font-size:1.2rem; color: ${({ theme }) => theme.colors?.primary || "#2a6f61"}; }
  span { color: ${({ theme }) => theme.colors?.secondaryDark || "#666"}; font-size: .95rem; }
`;

const Testimonials = styled.div`
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media(max-width:980px){ grid-template-columns: 1fr; }
`;

const Testimonial = styled.blockquote`
  background: ${({ theme }) => theme.colors?.surface || "#fff"};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow?.xs || "0 6px 18px rgba(16,88,71,0.03)"};
  p { margin:0 0 .5rem; font-style: italic; }
  footer { font-weight:700; color: ${({ theme }) => theme.colors?.secondaryDark || "#666"}; }
`;

const PressLogos = styled.div`
  display:flex;
  gap: 1rem;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  img { width: 140px; height: 48px; object-fit:contain; opacity:.9; filter:grayscale(.1); }
`;

const TwoCol = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media(max-width:980px){ grid-template-columns: 1fr; }
`;

const NewsletterForm = styled.form`
  margin-top: 1rem;
  display:flex;
  gap: .6rem;
  align-items:center;
  input { padding:.6rem .8rem; border-radius: 8px; border:1px solid ${({ theme }) => theme.colors?.border || "#eee"}; min-width: 260px; }
  button { padding:.6rem 1rem; border-radius:8px; border:none; background: ${({ theme }) => theme.colors?.primary || "#2a6f61"}; color:white; font-weight:700; cursor:pointer; }
  small { display:block; color: ${({ theme }) => theme.colors?.secondaryDark || "#666"}; margin-top:.6rem; grid-column: 1 / -1; }
  @media(max-width:720px){ flex-direction:column; align-items:stretch; input{width:100%} }
`;

const ContactForm = styled.form`
  margin-top: 1rem;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  input, textarea { width: 100%; padding:.6rem .8rem; border-radius:8px; border:1px solid ${({ theme }) => theme.colors?.border || "#eee"}; }
  button { padding:.6rem 1rem; border-radius:8px; border:none; background: ${({ theme }) => theme.colors?.primary || "#2a6f61"}; color:white; font-weight:700; cursor:pointer; }
  label { display:block; font-size: .95rem; color: ${({ theme }) => theme.colors?.text || "#333"}; }
  @media(max-width:720px){ grid-template-columns: 1fr; }
`;
const HeroCTAs = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;

  .btn {
    display: inline-block;
    padding: 0.7rem 1.2rem;
    border-radius: 999px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .btn.outline:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white !important;
  }
`;
