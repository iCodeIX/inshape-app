import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios.jsx';

export default function GoogleLoginButton() {
    const navigate = useNavigate();

    const handleCredentialResponse = async (response) => {
        const token = response.credential;

        try {
            const res = await API.post('/auth/googlesignup', { token });
            console.log('✅ Login success:', res.data);
            localStorage.setItem('token', res.data.token);
            navigate('/Profile');
        } catch (err) {
            console.error('❌ Login error:', err.response?.data || err.message);
        }
    };

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '42432750324-hfjor6r90b0covqehpbc8643fivfk3h3.apps.googleusercontent.com',
            callback: handleCredentialResponse,
        });

        google.accounts.id.renderButton(
            document.getElementById('google-button'),
            { theme: 'outline', size: 'large' }
        );
    }, []);

    return <div id="google-button"></div>;
}
