import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './routes/AppRoutes'
import { Footer } from "./pages/sharedComponents/Footer";
import '../index.css'
import { AuthProvider } from './context/AuthContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
      <Footer />
    </AuthProvider>
  </React.StrictMode>
)
