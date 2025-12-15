import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { loginRequest } from "../interfaces/auth.interfaces";
import { loginUser } from "../service/authService";

/*
Interface decodedToken:
sub : username
role : user role
exp : expiration time 
*/

interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}

interface AuthContextProps {
  user: {
    username: string;
    role: string;
    isAdmin: boolean;
  } | null;
  login: (payload: loginRequest) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: any) {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUser({
        username: decoded.sub,
        role: decoded.role,
        isAdmin: decoded.role === "ADMIN",
      });
    } catch (e) {
      console.error("Invalid token");
      localStorage.removeItem("token");
    }
  }, []);


  const login = async (payload: loginRequest) => {
    const res = await loginUser(payload);

    if (!res.ok) return res;

    localStorage.setItem("token", res.token);

    const decoded: DecodedToken = jwtDecode(res.token);

    setUser({
      username: decoded.sub,
      role: decoded.role,
      isAdmin: decoded.role === "ADMIN",
    });

    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
