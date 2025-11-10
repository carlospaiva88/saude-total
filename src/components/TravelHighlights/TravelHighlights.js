import { useNavigate } from "react-router-dom";
import {
  Section,
  SectionTitle,
  CategoryTitle,
  CardsGrid,
  Card,
  CardImage,
  CardTitle,
  CardDescription,
  CardBadge,
  CardButton,
} from "./TravelHighlights.styles";

export default function TravelHighlights({ travels }) {
  const navigate = useNavigate();

  const { nacionais = [], internacionais = [] } = travels || {};

  const renderCards = (travelsArray) =>
    travelsArray.map((travel) => (
      <Card key={travel.slug}>
        <CardBadge category={travel.category}>
          {travel.category === "nacionais" ? "🇧🇷 Nacional" : "🌍 Internacional"}
        </CardBadge>
        <CardImage src={travel.image} alt={travel.title} />
        <CardTitle>{travel.title}</CardTitle>
        <CardDescription>{travel.shortDescription}</CardDescription>
        <CardButton onClick={() => navigate(`/viagens/${travel.category}/${travel.slug}`)}>
          Ver Detalhes
        </CardButton>
      </Card>
    ));

  return (
    <Section id="destaque-viagens">
      <SectionTitle>Os Destinos mais visitados</SectionTitle>

      {nacionais.length > 0 && (
        <>
          <CategoryTitle>Nacionais</CategoryTitle>
          <CardsGrid>{renderCards(nacionais)}</CardsGrid>
        </>
      )}

      {internacionais.length > 0 && (
        <>
          <CategoryTitle>Internacionais</CategoryTitle>
          <CardsGrid>{renderCards(internacionais)}</CardsGrid>
        </>
      )}
    </Section>
  );
}
