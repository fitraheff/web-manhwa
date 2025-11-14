import { createContext, useContext, useState, useEffect } from "react";
import { getUserRole, isAdmin as checkAdmin } from "../utils/jwt";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(getUserRole());
    const [isAdmin, setIsAdmin] = useState(checkAdmin());

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setRole(getUserRole());
            setIsAdmin(checkAdmin());
        } else {
            localStorage.removeItem("token");
            setRole(null);
            setIsAdmin(false);
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ token, setToken, role, isAdmin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Ganti nama, jangan mulai dengan "use" → warning hilang
export const Auth = () => useContext(AuthContext);
