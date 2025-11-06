import type { User } from "../interfaces/user.interfaces";
import { getLoggedUser, getUsers, loginUser, logoutUser, saveUser } from "../utils/userStorage";

type AuthResult = { ok: boolean; message: string; user?: User}

// Simulación de delay para pruebas
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms))

export const register = async (user: User): Promise<AuthResult> => {
    await delay();
    const res = saveUser(user);
    return res.ok ? { ok: true, message: res.message, user } : { ok: false, message: res.message };
}

export const login = async (email: string, password: string): Promise<AuthResult> => {
    await delay();
    const res = loginUser(email, password);
    return res.ok ? { ok: true, message: res.message, user: res.user } : { ok: false, message: res.message };
}

export const getCurrentUser = async (): Promise<User | null> => {
    await delay(100);
    return getLoggedUser();
}

export const ensureAdmin = async (): Promise<void> => {
    const users = getUsers();
    if (!users.find(u => u.isAdmin)) { // Comprueba y devuelve al primer usuario admin, sino, lo crea
        const admin: User = {
            name: 'admin',
            email: 'admin@goldenbean.test',
            password: 'admin123',
            isAdmin: true,
        } as unknown as User;
        saveUser(admin)
        console.info('Admin seed creado: ', admin.email)
    }
}

export const logout = async (): Promise<{ ok: true; message: string}> => {
    await delay(50);
    logoutUser();
    return { ok: true, message: 'Sesión cerrada' };
}