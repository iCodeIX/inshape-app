import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout'
import API from '../utils/axios.jsx';


const UserProfile = ({ name, id, email }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center p-10 gap-4">
            <div className="relative w-full max-w-md bg-gray-100 p-8 border-2 border-dotted rounded-xl shadow-md">
                <h3 className="absolute -top-4 -left-4 bg-white text-gray-500 text-sm font-semibold px-3 py-1 rounded shadow">
                    User Information
                </h3>

                <div className="mb-4 space-y-2">
                    <p className="text-gray-700">
                        <span className="font-semibold">Name:</span> {name}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {email}
                    </p>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                    <button
                        className="w-full py-2 text-sm text-white bg-green-700 rounded hover:bg-green-600 transition"
                        onClick={() => navigate('/view-orders')}
                    >
                        View Orders
                    </button>
                    <button
                        className="w-full py-2 text-sm text-white bg-red-600 rounded hover:bg-red-500 transition"
                        onClick={() => navigate('/setup-payment-methods')}
                    >
                        Set Up Payment
                    </button>
                    <button
                        className="w-full py-2 text-sm text-white bg-red-600 rounded hover:bg-red-500 transition"
                        onClick={() => navigate('/setup-shipping-address')}
                    >
                        Set Up Address
                    </button>
                    <button
                        className="w-full py-2 text-sm text-white bg-sky-900 rounded hover:bg-sky-700 transition"
                        onClick={() => navigate('/manage-products')}
                    >
                        Manage Products
                    </button>
                </div>

                <Logout />
            </div>
        </div>


    )
}
const NoProfile = () => {
    const navigate = useNavigate();
    return (
        <div className='container flex justify-center items-center p-8'>
            <div className='text-center'>
                <h3>It appears that you dont have an account.</h3>
                <p>Try to</p>
                <button className="bg-green-500 py-1 px-2 text-white rounded-sm cursor-pointer hover:bg-green-400" onClick={() => navigate('/register', { replace: true })}>Register</button>
                <p>or</p>
                <button className="bg-blue-500 py-1 px-2 text-white rounded-sm cursor-pointer hover:bg-blue-400" onClick={() => navigate('/login')}>Login</button>
            </div >
        </div>

    )
}


const Profile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");


    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await API.get('/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setName(res.data.name);
                setEmail(res.data.email);
            } catch (err) {
                console.error('Unauthorized or error:', err);
            }
        };

        fetchProfile();
    }, []);


    const isLoggedIn = localStorage.getItem('token');
    return (
        <div className=''>
            {isLoggedIn ? (<UserProfile name={name} email={email} />) : (
                <NoProfile />)
            }
        </div >
    )
}

export default Profile
