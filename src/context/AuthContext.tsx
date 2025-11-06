import { createContext, useCallback, useEffect, useState } from "react";
import type { User } from "../interfaces/user.interfaces"
import * as auth from '../actions/auth.actions'

type AuthContextType = {
    user: User | null;
    register: (u: User) => Promise<{ ok: boolean; message: string; user?: User }>
    login: (email: string, password: string) => Promise<{ ok: boolean; message: string; user?: User}>
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ user, setUser ] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
        try {
            await auth.ensureAdmin();
            console.log("Admin ensured (creado si no existía)");
        } catch (err) {
            console.error("Error en ensureAdmin:", err);
        }
        })();
    }, []);

    useEffect(() => {
        (async () =>{
            const u = await auth.getCurrentUser();
            setUser(u);
        })();
    }, []);

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'goldenbean_session') {
                const newVal = e.newValue ? JSON.parse(e.newValue) : null;
                setUser(newVal);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const register = useCallback(async (u: User) => {
        const res = await auth.register(u);
        if (res.ok && res.user) setUser(res.user);
        return res;
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const res = await auth.login(email, password);
        if (res.ok && res.user) setUser(res.user);
        return res;
    }, [])

    const logout = useCallback(async () => {
        await auth.logout();
        setUser(null);
    }, []);

    return <AuthContext.Provider value = {{user, register, login, logout }}>{children}</AuthContext.Provider>
};