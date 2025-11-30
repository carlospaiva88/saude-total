// src/utils/titleHelpers.js
export function shortenTitle(title = "", maxChars = 48) {
  if (!title) return "";
  // se houver ":" ou "—" ou "|" usa a parte antes
  const sepIndex = title.search(/[:—|-]/);
  if (sepIndex > 0 && sepIndex < 40) {
    const left = title.slice(0, sepIndex).trim();
    if (left.length >= 6) return left;
  }
  // senão, corta por palavras até maxChars (não corte no meio da palavra)
  if (title.length <= maxChars) return title;
  const words = title.split(" ");
  let out = "";
  for (const w of words) {
    if ((out + " " + w).trim().length > maxChars) break;
    out = (out + " " + w).trim();
  }
  if (!out) return title.slice(0, maxChars).trim() + "…";
  return out + "…";
}
