// searchArticles.js
import articlesData from "./index";

// Converte em array pra facilitar busca
const articlesArray = Object.values(articlesData);

export function searchArticles(query) {
  if (!query) return [];

  const lowerQuery = query.toLowerCase();

  return articlesArray.filter(article => {
    // Defina os campos a buscar
    const fieldsToSearch = [
      article.title,
      article.slug,
      article.friendlySlug,
      ...(article.keywords || []),
    ];

    return fieldsToSearch.some(field => 
      field.toLowerCase().includes(lowerQuery)
    );
  });
}
