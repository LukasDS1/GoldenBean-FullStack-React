import { registerUser, loginUser } from "../service/authService";
import type { RegisterRequest, loginRequest } from "../interfaces/auth.interfaces";

export function useAuth() {
  const register = async (request: RegisterRequest) => {
    return await registerUser(request);
  }; 

  const login = async (request: loginRequest) => {
    return await loginUser(request);
  };

  return { register, login };
}


