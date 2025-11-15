import { Routes, Route } from "react-router-dom"

import Home from "../pages/home"
import Data from "../pages/data"
import LoginPage from "../pages/login"
import RegisterPage from "../pages/register"
import ProfilePage from "../pages/profile"
import { AdminRoute, SuperadminRoute, GuestRoute, ProtectedRoute } from "./AdminRoute";
import DataUser from "../pages/user"
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

            <Route
                path="/user"
                element={
                    <SuperadminRoute>
                        <DataUser />
                    </SuperadminRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes