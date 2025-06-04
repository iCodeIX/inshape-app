import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // or sessionStorage.removeItem
        navigate('/Login'); // redirect to login or home
    };
    return (
        <div>
            <button onClick={handleLogout} className='text-red-600 underline cursor-pointer font-semibold'>Logout</button>
        </div>
    )
}

export default Logout
