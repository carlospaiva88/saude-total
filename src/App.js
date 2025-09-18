import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";

// Componentes comuns
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Testimonials from "./components/Testimonials/Testimonials";
import FinalCTA from "./components/FinalCTA/FinalCTA";
import Footer from "./components/Footer/Footer";
import HealthTips from "./components/HealthTips/HealthTips";

import CalculadorasInterativas from './components/CalculadorasInterativas';

// Lazy loading das páginas
const BlogHome = lazy(() => import("./pages/BlogHome"));
const Categoria = lazy(() => import("./pages/Categoria"));
const Subcategoria = lazy(() => import("./pages/SubCategoria"));
const Artigo = lazy(() => import("./pages/Artigo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductsPage = lazy(() => import("./components/ProductsPage/ProductsPage"));

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Carregando...</div>}>
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <HealthTips />
                  <CalculadorasInterativas />
                  <Testimonials />
                  <FinalCTA />
                  <Footer />
                </>
              }
            />

            {/* Produtos */}
            <Route path="/produtos" element={<ProductsPage />} />

            {/* Blog */}
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/:categoria" element={<Categoria />} />
            <Route path="/blog/:categoria/:subcategoria" element={<Subcategoria />} />
            <Route
              path="/blog/:categoria/:subcategoria/:slug"
              element={<Artigo />}
            />

            {/* Redirecionamentos antigos */}
            <Route path="/dicas-saude" element={<Navigate to="/blog" replace />} />
            <Route
              path="/dicas-saude/:categoria"
              element={<Navigate to="/blog/:categoria" replace />}
            />
            <Route
              path="/dicas-saude/:categoria/:subcategoria"
              element={<Navigate to="/blog/:categoria/:subcategoria" replace />}
            />
            <Route
              path="/dicas-saude/:categoria/:subcategoria/:slug"
              element={<Navigate to="/blog/:categoria/:subcategoria/:slug" replace />}
            />

            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
