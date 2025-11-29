import axios from "axios";
import type { RegisterRequest } from "../interfaces/auth.interfaces";
import type { loginRequest } from "../interfaces/auth.interfaces";

export async function registerUser(data: RegisterRequest) {
  try {
    const res = await axios.post("http://localhost:8082/api-v1/register", data);
    return { ok: true, ...res.data };
  } catch (err: any) {
    return {
      ok: false,
      message: err.response?.data?.message || "Error en el registro"
    };
  }
}


export async function loginUser(data: loginRequest) {
  try {
    const res = await axios.post("http://localhost:8083/api-v1/login", data);
    return { ok: true, ...res.data };  
  } catch (err: any) {
    return {
      ok: false,
      message: err.response?.data?.message || "Error al iniciar sesión",
    };
  }
}
