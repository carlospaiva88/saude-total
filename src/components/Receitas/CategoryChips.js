import { useNavigate } from "react-router-dom";

const CategoryChips = ({ categorias }) => {
  const navigate = useNavigate();

  return (
    <div className="flex overflow-x-auto gap-3 py-4 px-6 w-full justify-center">
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => navigate(`/receitas/${cat.toLowerCase().replace(/\s/g, "-")}`)}
          className="px-4 py-2 rounded-full border border-gray-300 hover:bg-green-500 hover:text-white transition whitespace-nowrap"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
