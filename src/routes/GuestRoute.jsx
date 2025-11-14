import { Navigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { token } = Auth();

    // Jika sudah login → arahkan ke /home
    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;
