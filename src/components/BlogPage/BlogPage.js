import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import blogPosts from "../../data/blogPosts";
import {
  Page,
  Breadcrumbs,
  Title,
  Meta,
  Cover,
  ArticleBody,
  ProductsSection,
  CtaButton,
  NotFound,
  SectionTitle,
  ProductCard,
  ProductDesc,
  ProductGrid,
  ProductName,
  RelatedCard,
  RelatedGrid,
  RelatedSection,
  RelatedThumb,
  RelatedTitle,
} from "./BlogPage.styles";

import { parseDatePtBr, formatDatePtBr } from "./utils";

export default function BlogPage() {
  const { slug } = useParams();
  const post = blogPosts?.[slug];

  const publishedAt = useMemo(() => parseDatePtBr(post?.date), [post?.date]);

  const related = useMemo(() => {
    if (!blogPosts || !slug) return [];
    return Object.entries(blogPosts)
      .filter(([key]) => key !== slug)
      .map(([s, data]) => ({ slug: s, ...data }))
      .sort((a, b) => parseDatePtBr(b.date) - parseDatePtBr(a.date))
      .slice(0, 3);
  }, [slug]);

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

      {/* Produtos recomendados */}
      {Array.isArray(post.products) && post.products.length > 0 && (
        <ProductsSection aria-labelledby="produtos-recomendados">
          <SectionTitle id="produtos-recomendados">
            Produtos recomendados
          </SectionTitle>
          <ProductGrid>
            {post.products.map((p, i) => (
              <ProductCard key={i}>
                <ProductName>{p.name}</ProductName>
                {p.description && <ProductDesc>{p.description}</ProductDesc>}
                <CtaButton
                  href={p.link}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  aria-label={`Ver ${p.name} na Amazon (link externo, afiliado)`}
                >
                  Ver na Amazon
                </CtaButton>
              </ProductCard>
            ))}
          </ProductGrid>
        </ProductsSection>
      )}

      {/* Artigos relacionados */}
      {related.length > 0 && (
        <RelatedSection aria-labelledby="artigos-relacionados">
          <SectionTitle id="artigos-relacionados">
            Artigos relacionados
          </SectionTitle>
          <RelatedGrid>
            {related.map((rp) => (
              <RelatedCard
                key={rp.slug}
                to={`/blog/${rp.slug}`}
                aria-label={`Ir para ${rp.title}`}
              >
                {rp.image && (
                  <RelatedThumb src={rp.image} alt="" loading="lazy" />
                )}
                <RelatedTitle>{rp.title}</RelatedTitle>
                <Meta style={{ margin: 0 }}>
                  {formatDatePtBr(parseDatePtBr(rp.date))}
                  {rp.readTime ? ` · ${rp.readTime} min` : ""}
                </Meta>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedSection>
      )}
    </Page>
  );
}
