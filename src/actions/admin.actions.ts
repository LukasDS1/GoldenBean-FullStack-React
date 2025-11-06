import type { coffeeProps } from "../interfaces/coffe.interfaces";
import { getCurrentUser } from "./auth.actions";

const API = 'http://localhost:3001/coffe';

type Result = { ok: boolean; message: string; data?: any }

export const createCoffee = async (coffee: Omit<coffeeProps, 'id'>): Promise<Result> => {
    const user = await getCurrentUser();
    
    if (!user || !user.isAdmin) {
        return { ok: false, message: 'No autorizado: solo administradores pueden crear cafes' };
    }

    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coffee),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        return { ok: true, message: 'Café creado exitosamente', data };
    } catch (error) {
        console.error('Error al crear café: ', error);
        return { ok: false, message: 'Error al crear café' }
    }
}

export const deleteCoffee = async(id: number): Promise<Result> => {
    const user = await getCurrentUser();

    if (!user || !user.isAdmin) {
        return { ok: false, message: 'No autorizado: solo administradores pueden eliminar cafés' };
    }

    try {
        const res = await fetch(`${API}/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        return { ok: true, message: 'Café eliminado exitosamente' };
    } catch (error) {
        console.error('Error al eliminar café', error);
        return { ok: false, message: 'Error al eliminar café' };
    }
}