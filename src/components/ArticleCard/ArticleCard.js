// src/components/ArticleCard/ArticleCard.jsx
import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardDescription,
  CardSticker
} from "../CardBase/cardBase";
import styled from "styled-components";

/* util */
function stripHtml(html = "") {
  if (!html) return "";
  return String(html).replace(/<[^>]*>?/gm, "").trim();
}
function safeText(...vals) { for (const v of vals) if (v || v === 0) return String(v); return ""; }
function safeImage(item) { return item?.image || item?.imagem || item?.thumbnail || item?.thumb || "/placeholder-16x9.png"; }
function buildLink(to) { if (!to) return "#"; return typeof to === "string" ? to : "#"; }
function formatShortDate(value) {
  if (!value) return "";
  try { const d = new Date(value); return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(d); }
  catch { return String(value).split("T")[0]; }
}

const ArticleCard = ({ item = {}, to }) => {
  const title = useMemo(() => safeText(item.title, item.titulo, item.name, "Sem título"), [item]);
  const rawExcerpt = useMemo(() => safeText(item.excerpt, item.descricao, item.description) || stripHtml(item.content || ""), [item]);
  const excerpt = rawExcerpt.length > 220 ? rawExcerpt.slice(0, 217) + "…" : rawExcerpt;
  const imgSrc = safeImage(item);
  const href = buildLink(to);
  const dateISO = item.date || item.datePublished || item.publishedAt || null;
  const category = safeText(item.category, item.categoria, "");
  return (
    <CardLink to={href} aria-label={`Abrir artigo: ${title}`}>
      <CardBase>
        {category && <CardSticker>{category}</CardSticker>}
        <CardImage src={imgSrc} alt={title} loading="lazy" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src="/placeholder-16x9.png"}} />
        <CardBody>
          <MetaRow>
            <small>{dateISO ? formatShortDate(dateISO) : ""}</small>
            {/* you can show reading time here if you want */}
          </MetaRow>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{excerpt || "—"}</CardDescription>
        </CardBody>
      </CardBase>
    </CardLink>
  );
};

export default memo(ArticleCard);

/* small styled wrapper to keep Link styles decoupled from CardBase */
const CardLink = styled(Link)`
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

const MetaRow = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: .9;
  margin-bottom: 0.45rem;
  display:flex;
  justify-content:space-between;
  gap:0.5rem;
`;
