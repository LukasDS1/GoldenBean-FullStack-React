import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/homePage.pages";
import { CoffeApp } from "../CoffeApp";
import { BlogsPage } from "../pages/BlogsPage.pages";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/loginPage.pages";
import { AboutPage } from "../pages/AboutPage.pages";
import { useAuth } from "../hooks/useAuth";
import type { ReactElement } from "react";
import { AdminPanel } from "../pages/AdminPanelPage";
import {CafeDetailComponent} from "../pages/coffeDetailComponents/coffeDetail"


const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to={"/login"} replace />
  return children
}

const AdminRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />; // no autorizado
  return children;
};


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
          } />

        {/* Catálogo */}
        
        <Route path="/catalogo" element={
          <PrivateRoute>
          <CoffeApp />
        </PrivateRoute>}  />
        

        {/* Página vlogs */}
        <Route path="/blogs" element={<BlogsPage/>} /> 
        
        {/* Registro */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* About Us */}
        <Route path="/about" element={<AboutPage />} />

        {/* Panel Admin */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } />
        
        <Route path="/cafe/:id" element={<CafeDetailComponent />} />

        
        {/* 404 */}
        <Route path="*" element={<div className="text-white p-5">Página no encontrada (404)</div>} />
      </Routes>
    </BrowserRouter>
  );
};
