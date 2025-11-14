// src/utils/jwt.js
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