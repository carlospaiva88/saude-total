import RecipeCard from "./RecipeCard";

const RecipeGrid = ({ receitas }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-10 max-w-6xl">
      {receitas.map((r) => (
        <RecipeCard key={r.slug} receita={r} />
      ))}
    </div>
  );
};

export default RecipeGrid;
