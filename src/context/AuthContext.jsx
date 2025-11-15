import { createContext, useContext, useState, useEffect } from "react";
import { getUserRole, getUserId, isAdmin as checkAdmin } from "../utils/jwt";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(getUserRole());
    const [isAdmin, setIsAdmin] = useState(checkAdmin());
    const [userId, setUserId] = useState(getUserId());


    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setRole(getUserRole());
            setUserId(getUserId());
            setIsAdmin(checkAdmin());
        } else {
            localStorage.removeItem("token");
            setRole(null);
            setUserId(null);
            setIsAdmin(false);
        }
    }, [token]);

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ token, setToken, role, userId, isAdmin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const Auth = () => useContext(AuthContext);
