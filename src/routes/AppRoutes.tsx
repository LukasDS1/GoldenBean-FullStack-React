import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/homePage.pages";
import { CoffeApp } from "../CoffeApp";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Catálogo */}
        <Route path="/catalogo" element={<CoffeApp />} />

        {/* 404 */}
        <Route path="*" element={<div className="text-white p-5">Página no encontrada (404)</div>} />
      </Routes>
    </BrowserRouter>
  );
};
