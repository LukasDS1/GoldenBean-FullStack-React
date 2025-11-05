import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/homePage.pages";
import { CoffeApp } from "../CoffeApp";
import { CoffeComponent } from "../pages/coffeComponents/CoffeComponent"; 

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Catálogo */}
        <Route path="/catalogo" element={<CoffeApp />} />
        
        {/* Detalle café */}
        <Route path="/coffe/:id" element={<CoffeComponent />} />
        

        {/* 404 */}
        <Route path="*" element={<div className="text-white p-5">Página no encontrada (404)</div>} />
      </Routes>
    </BrowserRouter>
  );
};
