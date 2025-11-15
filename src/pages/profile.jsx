// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage = () => {
    const { token, userId } = Auth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    // password fields
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    const [loading, setLoading] = useState(false);

    /** Fetch profile */
    useEffect(() => {
        if (!token) return;

        axios.get(`${API_URL}/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            setUsername(res.data.username);
            setEmail(res.data.email);
        })
        .catch(() => alert("Gagal mengambil data user"));
    }, [token, userId]);


    /** Submit update */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const body = {
                username,
                email,
            };

            // jika user isi password → kirim currentPassword juga
            if (password.trim() !== "") {
                body.password = password;
                body.currentPassword = currentPassword;
            }

            await axios.put(`${API_URL}/api/users/${userId}`, body, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Profil berhasil diperbarui");
        } catch (error) {
            alert(error.response?.data?.errors || "Update gagal");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ minHeight: "90vh" }}
        >
            <div className="row w-100 justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h1 className="h3 mb-0 text-gray-800">Profile</h1>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Username */}
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* New Password */}
                                <div className="mb-3">
                                    <label className="form-label">Password Baru</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        // placeholder="Kosongkan jika tidak ingin mengubah password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Current Password muncul HANYA jika user mengisi password baru */}
                                {password.trim() !== "" && (
                                    <div className="mb-3">
                                        <label className="form-label">Password Saat Ini</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Masukkan password lama kamu"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100 mt-3"
                                >
                                    {loading ? "Loading..." : "Update Profile"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
