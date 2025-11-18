import { Link } from "react-router-dom";
import { Auth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
    const { token, role, isAdmin, logout } = Auth();
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow-sm">
            <div className="container-fluid">

                <Link className="navbar-brand d-flex align-items-center" to="/">
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

                        {token && role === "SUPERADMIN" && (
                            <Link className="nav-link" to="/user">Data User</Link>
                        )}

                        {token && (
                            <Link className="nav-link" to="/bookmarks">Bookmark</Link>
                        )}

                        {/* USER DROPDOWN */}
                        <div className="nav-item dropdown ms-3">
                            <button
                                className="btn btn-light border rounded-circle p-2"
                                onClick={() => setOpen(!open)}
                                style={{ width: 40, height: 40 }}
                            >
                                <i className="bi bi-person fs-5"></i>
                            </button>

                            {open && (
                                <ul className="dropdown-menu dropdown-menu-end show mt-2" style={{ position: "absolute" }}>

                                    {/* Jika sudah login */}
                                    {token ? (
                                        <>
                                            <li>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/profile"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        logout();
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        /* Jika belum login */
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/login"
                                                onClick={() => setOpen(false)}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
