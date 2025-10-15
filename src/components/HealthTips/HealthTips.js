import { useNavigate } from "react-router-dom";
import {
  TipsSection,
  SectionTitle,
  TipsGrid,
  TipCard,
  TipIcon,
  TipTitle,
  TipText
} from "./HealthTips.styles";

export default function HealthTips() {
  const navigate = useNavigate();

  return (
    <TipsSection id="dicas-saude">
      <SectionTitle>Dicas de Saúde para Você</SectionTitle>
      <TipsGrid>
        <TipCard onClick={() => navigate("/blog/emocional")}>
          <TipIcon aria-hidden="true">mindfulness</TipIcon>
          <TipTitle>Saúde Emocional</TipTitle>
          <TipText>
            Manter a saúde emocional é importante para ter qualidade de vida, equilíbrio e bem-estar no dia a dia.
          </TipText>
        </TipCard>
        <TipCard onClick={() => navigate("/blog/fisica")}>
          <TipIcon aria-hidden="true">fitness_center</TipIcon>
          <TipTitle>Saúde Física</TipTitle>
          <TipText>Pratique exercícios que ajudam a aliviar dores e fortalecer o seu corpo.</TipText>
        </TipCard>
        <TipCard onClick={() => navigate("/blog/mental")}>
          <TipIcon aria-hidden="true">psychology</TipIcon>
          <TipTitle>Saúde Mental</TipTitle>
          <TipText>Descubra técnicas para melhorar seu bem-estar mental.</TipText>
        </TipCard>
          <TipCard onClick={() => navigate("/blog/espiritual")}>
          <TipIcon aria-hidden="true">self_improvement</TipIcon>
          <TipTitle>Saúde Espiritual</TipTitle>
          <TipText>Descubra técnicas de Espiritualidade.</TipText>
        </TipCard>
      </TipsGrid>
    </TipsSection>
  );
}
