import viagensData from "./index";

const viagensArray = Object.values(viagensData);

export function searchViagens(query) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();

  return viagensArray.filter(viagem => {
    const fieldsToSearch = [
      viagem.title,
      viagem.slug,
      viagem.friendlySlug,
      ...(viagem.keywords || []),
    ];

    return fieldsToSearch.some(field => 
      field.toLowerCase().includes(lowerQuery)
    );
  });
}
