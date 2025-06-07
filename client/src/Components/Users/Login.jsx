import React, { useState } from 'react'
// import './Login.css'
import { useNavigate } from 'react-router-dom'
import API from '../utils/axios.jsx';
import GoogleLoginButton from './GoogleLoginButton.jsx';
import FacebookLoginButton from './FacebookLoginButton.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', res.data.token);
            navigate('/');

        } catch (error) {

            setError(error.response?.data?.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-md">
                <p className="text-center text-gray-700 mb-6">
                    Login to your existing account and enjoy shopping with fantastic vouchers!
                </p>
                {error && (<div className='text-center font-semibold my-2 p-2 bg-gray-200 rounded text-sm text-red-700'>
                    {error}
                </div>)}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300"
                    >
                        LOGIN
                    </button>
                </form>

                <div
                    className="text-sm text-green-600 mt-4 text-center cursor-pointer hover:underline"
                    onClick={() => navigate('/forgot-pass')}
                >
                    FORGOT YOUR PASSWORD?
                </div>

                <p className="text-center text-gray-500 my-4">OR LOGIN USING</p>

                <div className="flex flex-col space-y-3">
                    <GoogleLoginButton />
                    <FacebookLoginButton />

                </div>

                <div
                    className="text-sm text-green-600 mt-6 text-center cursor-pointer hover:underline"
                    onClick={() => navigate('/register')}
                >
                    DON'T HAVE AN ACCOUNT? REGISTER
                </div>
            </div>
        </div>

    )
}

export default Login
