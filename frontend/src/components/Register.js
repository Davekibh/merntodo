import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            navigate('/');
        } catch (err) {
            setError('Registration failed. Try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full border px-4 py-2 rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full border px-4 py-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full border px-4 py-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
                        Register
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-500">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
