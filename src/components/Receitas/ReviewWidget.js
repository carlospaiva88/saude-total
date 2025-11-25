// src/components/Recipes/ReviewWidget.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import slugify from "slugify";

const STORAGE_PREFIX = "vivanoflow:recipe_reviews:";

function loadReviews(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveReviews(key, reviews) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(reviews));
  } catch {}
}

export default function ReviewWidget({ recipeSlug }) {
  const storageKey = slugify(String(recipeSlug || "unknown"), { lower: true, strict: true });
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setReviews(loadReviews(storageKey));
  }, [storageKey]);

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) : 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.text.trim()) return;
    const newR = {
      id: Date.now(),
      name: form.name || "Anônimo",
      rating: Number(form.rating || 5),
      text: form.text.trim(),
      createdAt: new Date().toISOString()
    };
    const next = [newR, ...reviews];
    setReviews(next);
    saveReviews(storageKey, next);
    setForm({ name: "", rating: 5, text: "" });
    setSending(true);
    setTimeout(() => setSending(false), 700);
  };

  return (
    <WidgetWrapper aria-labelledby="reviews-title">
      <Header>
        <h3 id="reviews-title">Avaliações</h3>
        <Summary>
          <Stars aria-hidden>⭐️ {avgRating ? avgRating.toFixed(1) : "—"}</Stars>
          <small>{reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}</small>
        </Summary>
      </Header>

      <Form onSubmit={onSubmit} aria-label="Enviar avaliação">
        <Row>
          <Input placeholder="Seu nome (opcional)" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
          <Select value={form.rating} onChange={(e)=>setForm({...form, rating: e.target.value})} aria-label="Nota">
            <option value="5">5 — Excelente</option>
            <option value="4">4 — Muito bom</option>
            <option value="3">3 — Bom</option>
            <option value="2">2 — Regular</option>
            <option value="1">1 — Ruim</option>
          </Select>
        </Row>
        <Textarea placeholder="Conte pra gente o que você achou..." value={form.text} onChange={(e)=>setForm({...form, text: e.target.value})} />
        <FormActions>
          <small>Seja gentil — comentários ofensivos serão removidos.</small>
          <div>
            <Button type="submit" disabled={sending}>{sending ? "Enviando…" : "Enviar avaliação"}</Button>
          </div>
        </FormActions>
      </Form>

      <List>
        {reviews.length === 0 && <Empty>Nenhuma avaliação — seja o primeiro!</Empty>}
        {reviews.map(r => (
          <Review key={r.id}>
            <Top>
              <strong>{r.name}</strong>
              <time dateTime={r.createdAt}>{new Date(r.createdAt).toLocaleDateString()}</time>
            </Top>
            <Rating>{"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}</Rating>
            <Text>{r.text}</Text>
          </Review>
        ))}
      </List>
    </WidgetWrapper>
  );
}

/* Styled */
const WidgetWrapper = styled.section`
  margin-top: 2rem;
  background: ${({theme}) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({theme}) => theme.radius.md};
  box-shadow: ${({theme}) => theme.shadow.xs};
`;
const Header = styled.div`display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem`;
const Summary = styled.div`display:flex;gap:.6rem;align-items:center;color:${({theme})=>theme.colors.secondaryDark}`;
const Stars = styled.span`font-weight:700;color:${({theme})=>theme.colors.primary};`;
const Form = styled.form`margin-bottom:1rem;`;
const Row = styled.div`display:flex;gap:.6rem;margin-bottom:.5rem;@media(max-width:480px){flex-direction:column}`;
const Input = styled.input`flex:1;padding:.6rem;border-radius:8px;border:1px solid ${({theme})=>theme.colors.border};`;
const Select = styled.select`width:160px;padding:.6rem;border-radius:8px;border:1px solid ${({theme})=>theme.colors.border};`;
const Textarea = styled.textarea`width:100%;min-height:90px;padding:.6rem;border-radius:8px;border:1px solid ${({theme})=>theme.colors.border};`;
const FormActions = styled.div`display:flex;justify-content:space-between;align-items:center;margin-top:.5rem;small{color:${({theme})=>theme.colors.secondaryDark}}`;
const Button = styled.button`background:${({theme})=>theme.colors.primary};color:white;border:0;padding:.6rem .9rem;border-radius:${({theme})=>theme.radius.pill};cursor:pointer`;
const List = styled.div`display:flex;flex-direction:column;gap:.75rem;margin-top:1rem`;
const Empty = styled.div`text-align:center;color:${({theme})=>theme.colors.secondaryDark}`;
const Review = styled.article`padding:.6rem;border-radius:8px;background:rgba(0,0,0,0.02)`;
const Top = styled.div`display:flex;justify-content:space-between;font-size:.9rem;color:${({theme})=>theme.colors.secondaryDark};margin-bottom:.25rem`;
const Rating = styled.div`color:${({theme})=>theme.colors.primary};font-weight:700;margin-bottom:.4rem`;
const Text = styled.p`margin:0;color:${({theme})=>theme.colors.text}`;
