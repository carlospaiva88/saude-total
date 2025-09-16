import React from "react";
import {
  Section,
  SectionTitle,
  TestimonialsGrid,
  TestimonialCard,
  Avatar,
  TestimonialText,
  ClientName,
} from "./Testimonials.styles";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Carla S.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Melhorei minha disposição e saúde graças a esses produtos!",
    },
    {
      name: "Lucas M.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      text: "Perfeitos para alcançar meus objetivos de fitness!",
    },
    {
      name: "Fernanda R.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "Recomendo para todos que querem mudar de vida!",
    },
  ];

  return (
    <Section id="depoimentos">
      <SectionTitle>Depoimentos</SectionTitle>
      <TestimonialsGrid>
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx}>
            <Avatar src={t.avatar} alt={t.name} />
            <ClientName>{t.name}</ClientName>
            <TestimonialText>“{t.text}”</TestimonialText>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </Section>
  );
}
