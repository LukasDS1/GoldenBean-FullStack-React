import type { User } from "../interfaces/user.interfaces";

const STORAGE_KEY = "goldenbean_users";

export const saveUser = (user: User) => {
  const existing = localStorage.getItem(STORAGE_KEY);
  const users: User[] = existing ? JSON.parse(existing) : [];

  if (users.find(u => u.email === user.email)) {
    return { ok: false, message: "El email ya está registrado." };
  }

  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return { ok: true, message: "Usuario registrado exitosamente" };
};

export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const loginUser = (email: string, password: string) => {
  const data = localStorage.getItem("goldenbean_users");

  if (!data) return { ok: false, message: "No hay usuarios registrados" };

  const users = JSON.parse(data);

  const user = users.find((u: User) => u.email === email && u.password === password);

  if (!user) return { ok: false, message: "Credenciales inválidas" };

  
  localStorage.setItem("goldenbean_session", JSON.stringify(user));

  return { ok: true, message: "Inicio de sesión exitoso", user };
};

export const getLoggedUser = () => {
  const session = localStorage.getItem("goldenbean_session");
  return session ? JSON.parse(session) : null;
};

export const logoutUser = () => {
  localStorage.removeItem("goldenbean_session");
};

