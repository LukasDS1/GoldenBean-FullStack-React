import { useState } from "react";
import { NavBar } from "./sharedComponents/NavBar";
import type { User } from "../interfaces/user.interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const RegisterPage: React.FC = () => { // React.FC o functional component es sólo para marcar el tipo, no es necesario

  const { register } = useAuth();
  const navigate = useNavigate();
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPass, setConfirmPass ] = useState("")
  const [ msg, setMsg ] = useState("")
  
  
  // const [formData, setFormData] = useState<User>({
  //   nombre: "",
  //   email: "",
  //   password: ""
  // });

  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [msg, setMsg] = useState("");

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

// TODO: validaciones
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name.trim() || !email.trim() || !password.trim() || !confirmPass.trim()) {
    setMsg("Todos los campos son obligatorios");
    return;
  }

  if (password !== confirmPass) {
  setMsg("Las contraseñas no coinciden");
  return;
  }

  const user: User = { name: name.trim(), email: email.trim(), password: password };
  const res = await register(user);

  if (res.ok) {
    setMsg("Usuario registrado exitosamente");

    setName("")
    setEmail("")
    setPassword("")
    setConfirmPass("")

    navigate("/login");
  } else alert(res.message)

  // if (formData.password !== confirmPassword) {
  //   alert("Las contraseñas no coinciden");
  //   return;
  // }

  // if (!res.ok) {
  //   alert("Este email ya está registrado");
  //   return;
  // }

  // alert("Usuario registrado exitosamente");

  // setFormData({
  //   nombre: "",
  //   email: "",
  //   password: ""
  // });
  // setConfirmPassword("");

  
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
          <input 
          className="form-control mb-2" 
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
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
