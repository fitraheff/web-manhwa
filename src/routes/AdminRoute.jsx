import { Navigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { token, isAdmin } = Auth();

    if (!token) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/" />;

    return children;
};

export default AdminRoute;
