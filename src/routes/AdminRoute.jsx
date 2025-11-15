import { Navigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

export const AdminRoute = ({ children }) => {
    const { token, isAdmin } = Auth();

    if (!token) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/" />;
    console.log("AdminRoute check:", token, isAdmin);


    return children;
};

export const SuperadminRoute = ({ children }) => {
    const { token, role } = Auth();

    if (!token) return <Navigate to="/login" />;
    if (role !== "SUPERADMIN") return <Navigate to="/" />;

    return children;
};



export const ProtectedRoute = ({ children }) => {
    const { token } = Auth();
    if (!token) return <Navigate to="/login" />;
    return children;
};

export const GuestRoute = ({ children }) => {
    const { token } = Auth();

    // Jika sudah login → arahkan ke /home
    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

// export default ProtectedRoute;


// export default { AdminRoute, SuperadminRoute };
