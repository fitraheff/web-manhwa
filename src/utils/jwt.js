// src/utils/jwt.js
import { jwtDecode } from "jwt-decode";
export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role || null;
    } catch (error) {  // ← GANTI 'err' → 'error' (atau hapus kalau gak dipakai)
        console.error('Invalid token:', error); // ← 'error', bukan 'err'
        localStorage.removeItem('token');
        return null;
    }
};

export const isAdmin = () => {
    const role = getUserRole();
    return role === 'ADMIN' || role === 'SUPERADMIN';
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export const getUserId = () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const decoded = jwtDecode(token);
        return decoded.userId; // ← ini yang benar!
    } catch {
        return null;
    }
};
