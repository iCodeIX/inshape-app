import React from 'react'
import { useEffect } from 'react';
const FacebookLoginButton = () => {
    useEffect(() => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: import.meta.env.VITE_FB_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v19.0'  // or latest
            });
        };
    }, []);


    const handleFBLogin = () => {
        window.FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your info.... ');
                window.FB.api('/me', { fields: 'name,email,picture' }, function (profile) {
                    console.log('Successful login for:', profile);
                    // You can send profile or token to your backend here
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'public_profile,email' });
    };
    return (
        <div>
            <button onClick={handleFBLogin}
                type="button"
                className="w-full flex items-center justify-center cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
                Login with Facebook
            </button>
        </div>
    )
}

export default FacebookLoginButton
