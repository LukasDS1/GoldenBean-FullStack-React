import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/homePage.pages";
import { CoffeApp } from "../CoffeApp";
import { BlogsPage } from "../pages/BlogsPage.pages";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/loginPage.pages";
import { AboutPage } from "../pages/AboutPage.pages";
import {CafeDetailComponent} from "../pages/coffeDetailComponents/coffeDetail"





export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Catálogo */}
        <Route path="/catalogo" element={<CoffeApp />} />
        

        {/* Página vlogs */}
        <Route path="/blogs" element={<BlogsPage/>} /> 
        
        {/* Registro */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* About Us */}
        <Route path="/about" element={<AboutPage />} />
        
         <Route path="/cafe/:id" element={<CafeDetailComponent />} />
        

        {/* 404 */}
        <Route path="*" element={<div className="text-white p-5">Página no encontrada (404)</div>} />
      </Routes>
    </BrowserRouter>
  );
};
