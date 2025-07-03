import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

// const API = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
// });

// Add token to request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle expired token
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            console.warn('Token expired or unauthorized — logging out');
            // window.location.href = '/login'; // 🔁 Redirect if needed
        }
        return Promise.reject(error);
    }
);

export default API;
