import { useParams } from "react-router-dom";
import styled from "styled-components";
import blogPosts from "../data/blogPosts";
import { Helmet } from "react-helmet-async";

// ------------ ESTILOS ------------
const PageWrapper = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: ${({ theme }) => theme.layout.sectionPadding};
  margin: auto;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 350px;
  border-radius: ${({ theme }) => theme.radius.lg};
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.shadow.md};
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  color: #777;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;

  p {
    margin: 1rem 0;
  }

  ul {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 4rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1.5rem;
`;

// ------------ PRODUTOS RELACIONADOS ------------
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.a`
  display: block;
  background: white;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-bottom: 1rem;
`;

const ProductName = styled.h4`
  margin-bottom: 0.4rem;
`;

const ProductPrice = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const ProductDesc = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

// ------------ RECOMENDADOS ------------
const RecommendedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const RecCard = styled.a`
  display: block;
  background: white;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const RecImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const RecInfo = styled.div`
  padding: 1rem;
`;

const RecTitle = styled.h4`
  font-size: 1.2rem;
`;

// ------------ COMPONENTE PRINCIPAL ------------
export default function ArtigoPage() {
  const { categoria, subcategoria, slug } = useParams();

  const artigo = blogPosts.find(
    (post) =>
      post.category === categoria &&
      post.subCategory === subcategoria &&
      post.slug === slug
  );

  if (!artigo) {
    return (
      <PageWrapper>
        <h1>Artigo não encontrado</h1>
      </PageWrapper>
    );
  }

  const artigosRecomendados = blogPosts
    .filter((post) => post.id !== artigo.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{artigo.title} | Viva no Flow</title>
        <meta name="description" content={artigo.title} />
      </Helmet>

      <PageWrapper>
        <HeaderImage src={artigo.image} alt={artigo.title} />

        <Title>{artigo.title}</Title>

        <Meta>
          <span>{artigo.date}</span>
          <span>•</span>
          <span>{artigo.readingTime}</span>
        </Meta>

        <Content dangerouslySetInnerHTML={{ __html: artigo.content }} />

        {/* PRODUTOS RELACIONADOS */}
        {artigo.relatedProducts && artigo.relatedProducts.length > 0 && (
          <>
            <SectionTitle>Produtos Recomendados</SectionTitle>
            <ProductGrid>
              {artigo.relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  href={p.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ProductImage src={p.image} alt={p.name} />
                  <ProductName>{p.name}</ProductName>
                  <ProductPrice>{p.price}</ProductPrice>
                  <ProductDesc>{p.description}</ProductDesc>
                </ProductCard>
              ))}
            </ProductGrid>
          </>
        )}

        {/* ARTIGOS RECOMENDADOS */}
        <SectionTitle>Artigos Recentes</SectionTitle>
        <RecommendedGrid>
          {artigosRecomendados.map((r) => (
            <RecCard
              key={r.id}
              href={`/blog/${r.category}/${r.subCategory}/${r.slug}`}
            >
              <RecImage src={r.image} alt={r.title} />
              <RecInfo>
                <RecTitle>{r.title}</RecTitle>
              </RecInfo>
            </RecCard>
          ))}
        </RecommendedGrid>
      </PageWrapper>
    </>
  );
}
