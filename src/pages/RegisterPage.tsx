import { useState } from "react";
import { NavBar } from "./sharedComponents/NavBar";
import type { RegisterRequest } from "../interfaces/auth.interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthService";

export const RegisterPage: React.FC = () => {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim() || !confirmPass.trim()) {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPass) {
      setMsg("Las contraseñas no coinciden");
      return;
    }

    const user: RegisterRequest = { 
      username: username.trim(), 
      email: email.trim(), 
      password 
    };

    const res = await register(user);

    if (res.ok) {
      setMsg("Usuario registrado exitosamente");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPass("");

      navigate("/login");
    } else {
      setMsg(res.message);
    }
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
        <form onSubmit={handleSubmit} className="card p-4 bg-dark text-white shadow" style={{ width: "400px" }}>
          
          <h2 className="text-center mb-3">Crear Cuenta</h2>

          {msg && <div className="alert alert-warning">{msg}</div>}

          <label>Nombre</label>
          <input 
            className="form-control mb-2"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input 
            className="form-control mb-2"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input 
            className="form-control mb-2"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <label>Confirmar contraseña</label>
          <input 
            className="form-control mb-3"
            name="confirmPass"
            type="password"
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
            required
          />

          <button className="btn btn-warning w-100">Registrarse</button>
        </form>
      </div>
    </>
  );
};
