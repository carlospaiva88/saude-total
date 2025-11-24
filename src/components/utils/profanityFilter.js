// src/utils/profanityFilter.js
const blacklist = ["puto","idiota","burro"]; // adicione palavras que preferir
export default function profanityFilter(text = "") {
  let s = String(text);
  blacklist.forEach(w => {
    const re = new RegExp(w, "ig");
    s = s.replace(re, "****");
  });
  return s;
}
