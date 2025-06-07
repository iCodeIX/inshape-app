import React, { use, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from '../utils/axios.jsx';
import GoogleLoginButton from './GoogleLoginButton.jsx';
import FacebookLoginButton from './FacebookLoginButton.jsx';

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password == confirmPassword) {
            try {
                const res = await API.post('/auth/register', {
                    name: firstName + " " + lastName,
                    authType: "local",
                    email,
                    password
                });
                console.log("User data", res.data);
            }

            catch (err) {
                console.error('Register error:', err.response?.data || err.message);
            }
        } else {
            setError("Passwords not match!")
        }


    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <p className="text-center text-gray-700 mb-6">
                    Create an Inshape Account and get an instant voucher when you register!
                </p>

                <div
                    className="text-sm text-green-600 mb-4 text-center cursor-pointer hover:underline"
                    onClick={() => navigate('/login')}
                >
                    ALREADY HAVE AN ACCOUNT? SIGN IN
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            placeholder="First Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
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
                    <div className='text-sm text-centet text-red-700 font-semibold'>
                        {error}
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
                    <div>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            id="agree"
                            className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            required
                        />
                        <label htmlFor="agree" className="flex flex-wrap">
                            By signing up, you agree to our&nbsp;
                            <span className="text-green-600 hover:underline cursor-pointer">
                                Terms of Service
                            </span>
                            &nbsp;and&nbsp;
                            <span className="text-green-600 hover:underline cursor-pointer">
                                Privacy Policy
                            </span>.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors duration-300"
                    >
                        REGISTER
                    </button>
                </form>

                <p className="text-center text-gray-500 my-4">OR SIGN UP USING</p>

                <div className="flex flex-col space-y-3">
                    <GoogleLoginButton />
                    <FacebookLoginButton />
                </div>
            </div>
        </div>

    )
}

export default Register
