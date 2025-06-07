import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios.jsx';

export default function GoogleLoginButton() {
    const navigate = useNavigate();

    const handleCredentialResponse = async (response) => {
        const token = response.credential;

        try {
            const res = await API.post('/auth/googlesignup', { token });
            localStorage.setItem('token', res.data.token);
            navigate('/Profile');
        } catch (err) {
            console.error('❌ Login error:', err.response?.data || err.message);
        }
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        google.accounts.id.renderButton(
            document.getElementById('google-button'),
            { theme: 'outline', size: 'large' }
        );
    }, []);

    return <div id="google-button"></div>;
}
