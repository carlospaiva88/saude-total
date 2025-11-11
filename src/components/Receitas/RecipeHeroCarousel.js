import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RecipeHeroCarousel = ({ receitas }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % receitas.length),
      5000
    );
    return () => clearInterval(interval);
  }, [receitas.length]);

  const receita = receitas[index];

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-2xl shadow-lg mb-10">
      <AnimatePresence mode="wait">
        <motion.img
          key={receita.slug}
          src={receita.imagem}
          alt={receita.titulo}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-6">
        <h2 className="text-4xl font-bold mb-3">{receita.titulo}</h2>
        <p className="max-w-lg">{receita.descricao}</p>
      </div>
    </div>
  );
};

export default RecipeHeroCarousel;
