import { Routes, Route } from "react-router-dom"

import Home from "../pages/home"
import Data from "../pages/data"
import LoginPage from "../pages/login"
import RegisterPage from "../pages/register"
import AdminRoute from "./AdminRoute";
import GuestRoute from "./GuestRoute"
import '../App.css'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* HANYA BISA DIAKSES JIKA BELUM LOGIN */}
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <GuestRoute>
                        <RegisterPage />
                    </GuestRoute>
                }
            />

            <Route
                path="/data"
                element={
                    <AdminRoute>
                        <Data />
                    </AdminRoute>
                }
            />

        </Routes>
    )
}

export default AppRoutes