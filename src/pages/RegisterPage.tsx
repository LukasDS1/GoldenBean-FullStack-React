import { useState } from "react";
import { NavBar } from "./sharedComponents/NavBar";
import { saveUser } from "../utils/userStorage";
import type { User } from "../interfaces/user.interfaces";
import { useNavigate } from "react-router-dom";


export const RegisterPage = () => {

  const [formData, setFormData] = useState<User>({
    nombre: "",
    email: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const navigate = useNavigate(); 

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.nombre || !formData.email || !formData.password) {
    alert("Completa todos los campos");
    return;
  }

  if (formData.password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const res = saveUser(formData);

  if (!res.ok) {
    alert("Este email ya está registrado");
    return;
  }

  alert("Usuario registrado exitosamente");

  setFormData({
    nombre: "",
    email: "",
    password: ""
  });
  setConfirmPassword("");

  navigate("/login");
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
          
          <h2 className="text-center mb-3">Crear Cuenta</h2>

          {msg && <div className="alert alert-warning">{msg}</div>}

          <label>Nombre</label>
          <input className="form-control mb-2" name="nombre" onChange={handleChange}/>

          <label>Email</label>
          <input className="form-control mb-2" name="email" type="email" onChange={handleChange}/>

          <label>Contraseña</label>
          <input className="form-control mb-2" name="password" type="password" onChange={handleChange}/>

          <label>Confirmar contraseña</label>
          <input className="form-control mb-3" type="password" onChange={(e)=>setConfirmPassword(e.target.value)}/>

          <button className="btn btn-warning w-100">Registrarse</button>
        </form>
      </div>

    </>
  );
};
