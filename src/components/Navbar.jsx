import { Link } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
    const { token, isAdmin, logout } = Auth();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/home">
                    <img src="/vite.svg" alt="Logo" width="30" height="30" />
                    <span className="ms-2 fw-bold">Manhwa List</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto align-items-center">

                        <Link className="nav-link" to="/">Home</Link>

                        {isAdmin && (
                            <Link className="nav-link" to="/data">Data Manhwa</Link>
                        )}


                        {token ? (
                            <button
                                className="btn btn-outline-danger btn-sm ms-3"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link className="btn btn-outline-primary btn-sm ms-3" to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
