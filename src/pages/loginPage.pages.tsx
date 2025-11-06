import { useState } from "react";
import { NavBar } from "./sharedComponents/NavBar";
import { Footer } from "./sharedComponents/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const LoginPage: React.FC = () => {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth()
  const [ msg , setMsg ] = useState("");


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await login(email.trim(), password);
    setMsg(res.message);

    if (res.ok) {
      setEmail("");
      setPassword("");
      alert("Inicio de sesión exitoso");  
      navigate("/catalogo"); 
    } else {
      alert(res.message)
    }
  };

  return (
    <>
      <NavBar 
        onQuery={() => {}} 
        cart={[]} showCart={false}
        increaseQty={() => {}} decreaseQty={() => {}} clearCart={() => {}}
      />

      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="card p-4 bg-dark text-white shadow" style={{ width: "400px" }}>
          <h2 className="text-center mb-3">Iniciar Sesión</h2>

          {msg && <div className="alert alert-warning">{msg}</div>}

          <label>Email</label>
          <input
            className="form-control mb-2"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            className="form-control mb-3"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="btn btn-warning w-100">Entrar</button>
        </form>
      </div>
    </>
  );
};
