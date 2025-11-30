import { useState } from "react";
import { NavBar } from "./sharedComponents/NavBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    const res = await login({
      username: username.trim(),
      password,
    });

    if (!res.ok) {
      setMsg(res.message);
      return;
    }

    console.log("Login OK");

    navigate("/"); 
  };

  return (
    <>
      <NavBar 
        onQuery={() => {}} 
        cart={[]} 
        showCart={false}
        increaseQty={() => {}} 
        decreaseQty={() => {}} 
        clearCart={() => {}} 
      />

      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleLogin}
          className="card p-4 bg-dark text-white shadow"
          style={{ width: "400px" }}
        >
          <h2 className="text-center mb-3">Iniciar Sesión</h2>

          {msg && <div className="alert alert-warning">{msg}</div>}

          <label>Username</label>
          <input
            className="form-control mb-2"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
