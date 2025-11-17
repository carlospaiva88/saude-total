import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts from "../../data/blogPosts";

// Calculadoras
import CalculadoraIMC from "../../components/Calculadora/CalculadoraIMC";
import CalculadoraCalorica from "../../components/Calculadora/CalculadoraCalorica";

// Utilidades
import { parseDatePtBr, formatDatePtBr } from "./utils";

// Estilos
import {
  Page,
  Breadcrumbs,
  Title,
  Meta,
  Cover,
  ArticleBody,
  ToolsSection,
  ToolsTitle,
  ToolsSubtitle,
  CalculatorsWrapper,
  NotFound
} from "./BlogPage.styles";

export default function BlogPage() {
  const { slug } = useParams();
  const post = blogPosts?.[slug];

  const publishedAt = useMemo(() => parseDatePtBr(post?.date), [post?.date]);

  if (!post) {
    return (
      <NotFound>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Início</Link>
          <span className="sep">/</span>
          <span>Blog</span>
        </Breadcrumbs>
        <h1>Artigo não encontrado</h1>
        <p>Verifique o endereço ou volte à página inicial.</p>
        <p>
          <Link to="/" style={{ color: "#2a9d8f", textDecoration: "none" }}>
            ← Voltar ao início
          </Link>
        </p>
      </NotFound>
    );
  }

  return (
    <Page>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">Início</Link>
        <span className="sep">/</span>
        <Link to="/blog">Dicas de Saúde</Link> &gt;{" "}
        <span className="sep">/</span>
        <span>{post.title}</span>
      </Breadcrumbs>

      {/* Conteúdo principal */}
      <Title>{post.title}</Title>
      <Meta>
        {post.date && (
          <>
            {formatDatePtBr(publishedAt)}
            {post.readTime ? ` · ${post.readTime} min de leitura` : ""}
          </>
        )}
      </Meta>

      {post.image && <Cover src={post.image} alt={post.title} loading="lazy" />}

      <ArticleBody>{post.text}</ArticleBody>

      {/* Bloco de Calculadoras */}
      <ToolsSection>
        <ToolsTitle>Ferramentas de Saúde</ToolsTitle>
        <ToolsSubtitle>
          Calcule seu IMC ou suas necessidades calóricas e acompanhe sua saúde!
        </ToolsSubtitle>
        <CalculatorsWrapper>
          <CalculadoraIMC />
          <CalculadoraCalorica />
        </CalculatorsWrapper>
      </ToolsSection>
    </Page>
  );
}
