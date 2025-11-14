// src/pages/RegisterPage.jsx
import { useState } from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${API_URL}/api/users/register`, {
                username,
                email,
                password
            });

            // alert('Registration successful! Please login.');
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.errors || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form
                title="Register"
                onSubmit={handleRegister}
                btnText="Register"
                isLoading={loading}
            >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </Form>
            <ToastContainer />
        </>
    );
};

export default RegisterPage;