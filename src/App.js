import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Layout
import SectionWrapper from "./Layout/SectionWrapper"

// Componentes comuns
import Navbar from "./components/Navbar/Navbar";
import NavbarSpacer from "./components/Navbar/NavbarSpacer";
import ScrollToTop from "./components/Shared/ScrollToTop";
import Footer from "./components/Footer/Footer";


// Home components
import Hero from "./components/Hero/Hero";
import HealthTips from "./components/HealthTips/HealthTips";
import HomeReceitasSection from "./components/Receitas/HomeReceitasSection";
import TravelHighlights from "./components/TravelHighlights/TravelHighlights";
import FinalCTA from "./components/FinalCTA/FinalCTA";
import ArticlePage from "./components/Article/ArtigoPage"
import viagensData from "./data/viagens";

// Páginas Receitas
import ReceitasPage from "./components/Receitas/ReceitasPage";
import ReceitaPage from "./components/Receitas/ReceitaPage";
import ReceitasCategoria from "./components/Receitas/ReceitasCategoria";


// Calculadoras
import GlobalCalculadoraPage from "./pages/Calculadoras/GlobalCalculadoraPage";
import IMCCalculator from "./components/Calculadora/IMC/IMCCalculator";
import TMBCalculator from "./components/Calculadora/TMB/TMBCalculator";
import CaloriasCalculator from "./components/Calculadora/Calorias/CaloriasCalculator";


// Viagens
import ViagensHome from "./components/Viagens/ViagensHome";
import ViagensCategoria from "./components/Viagens/ViagensCategoria";
import ViagemPage from "./components/Viagens/ViagemPage";

// Sobre
import Sobre from "./components/Sobre/Sobre";

// Lazy Loading
const BlogHome = lazy(() => import("./components/BlogPage/BlogHome"));
const Categoria = lazy(() => import("./components/Article/Categoria"));
const Subcategoria = lazy(() => import("./components/Article/SubCategoria"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductsPage = lazy(() => import("./components/Product/ProductsPage/ProductsPage"));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ScrollToTop />

          <Suspense fallback={<div>Carregando...</div>}>

            <Routes>

              {/* HOME */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <NavbarSpacer />

                  
                      <Hero />
                    

                    <SectionWrapper>
                      <HealthTips />
                    </SectionWrapper>

                 

                    <SectionWrapper>
                      <HomeReceitasSection />
                    </SectionWrapper>

                    <SectionWrapper>
                      <TravelHighlights travels={viagensData} />
                    </SectionWrapper>

                 

                    <FinalCTA />
                    <Footer />
                  </>
                }
              />

              {/* PRODUTOS */}
              <Route path="/produtos" element={<ProductsPage />} />

              {/* BLOG */}
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/:categoria" element={<Categoria />} />
              <Route path="/blog/:categoria/:subcategoria" element={<Subcategoria />} />
              <Route path="/blog/:categoria/:subcategoria/:slug" element={<ArticlePage />} />



           {/* CALCULADORAS */}

         <Route path="/calculadora" element={<GlobalCalculadoraPage />} />

        <Route path="/calculadora/imc" element={<IMCCalculator />} />
        <Route path="/calculadora/tmb" element={<TMBCalculator />} />
        <Route path="/calculadora/calorias" element={<CaloriasCalculator />} />


              {/* RECEITAS */}
              <Route path="/receitas" element={<ReceitasPage />} />
              <Route path="/receitas/categoria/:categoria" element={<ReceitasCategoria />} />
              <Route path="/receitas/:slug" element={<ReceitaPage />} />
              <Route path="/receitas/receita" element={<Navigate to="/receitas" replace />} />

              {/* SOBRE */}
              <Route path="/sobre" element={<Sobre />} />

              {/* VIAGENS */}
              <Route path="/viagens" element={<ViagensHome />} />
              <Route path="/viagens/:categoria" element={<ViagensCategoria />} />
              <Route path="/viagens/:categoria/:slug" element={<ViagemPage />} />

              {/* REDIRECIONAMENTOS ANTIGOS */}
              <Route path="/dicas-saude" element={<Navigate to="/blog" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
