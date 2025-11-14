// src/pages/LoginPage.jsx
import { useState } from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Auth } from '../context/AuthContext';


const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setToken } = Auth();


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${API_URL}/api/users/login`, {
                email,
                password
            });

            setToken(res.data.accessToken);    // ← GANTI INI
            navigate('/');
        } catch (error) {
            alert(error.response?.data?.errors || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            title="Login"
            onSubmit={handleLogin}
            btnText="Login"
            isLoading={loading}
        >
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
    );
};

export default LoginPage;