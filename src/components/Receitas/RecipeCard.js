import { useNavigate } from "react-router-dom";

const RecipeCard = ({ receita }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/receitas/${receita.slug}`)}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
    >
      <img
        src={receita.imagem}
        alt={receita.titulo}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{receita.titulo}</h3>
        <p className="text-gray-600 text-sm">{receita.descricao}</p>
        <div className="flex justify-between mt-3 text-sm text-gray-500">
          <span>{receita.tempo}</span>
          <span>{receita.calorias} kcal</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
