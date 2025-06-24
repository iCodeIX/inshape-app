import React, { useState } from "react";
import facebook from './../../assets/socials/facebook.png';
import instagram from './../../assets/socials/instagram.png';
import lazada from './../../assets/socials/lazada.PNG';
import shopee from './../../assets/socials/shopee.PNG';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (email && message) {
            alert('Message sent! (Simulation)');
            setShowModal(false);
            setEmail('');
            setMessage('');
        } else {
            alert('Please fill out both fields.');
        }
    };

    return (
        <footer className="bg-black flex flex-col gap-4 p-8 items-center justify-center relative">
            <ul className="text-center space-y-1">
                <li>
                    <a onClick={() => navigate("/privacy-policy")} className="text-white hover:bg-red-500 p-2 cursor-pointer">Privacy Policy</a>
                </li>
                <li>
                    <a onClick={() => navigate("/terms-of-service")} className="text-white hover:bg-red-500 p-2 cursor-pointer">Terms of Service</a>
                </li>
                <li>
                    <a onClick={() => setShowModal(true)} className="text-white hover:bg-red-500 p-2 cursor-pointer">Contact Us</a>
                </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-2">
                <a href="https://facebook.com"><img className="w-6" src={facebook} alt="Facebook" /></a>
                <a href="https://instagram.com"><img className="w-6" src={instagram} alt="Instagram" /></a>
                <a href="https://lazada.com"><img className="w-6 rounded-full" src={lazada} alt="Lazada" /></a>
                <a href="https://shopee.com"><img className="w-6 rounded-full" src={shopee} alt="Shopee" /></a>
            </div>

            <p className="text-white text-sm">&copy; 2025 InShape Company. All Rights Reserved.</p>

            {/* Contact Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <h2 className="text-xl font-bold mb-4 text-center">Contact Us</h2>

                        <label className="block text-sm font-medium mb-1">Your Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded mb-3"
                            placeholder="you@example.com"
                            required
                        />

                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="w-full p-2 border rounded mb-3"
                            placeholder="Your message here..."
                            required
                        />

                        <button
                            onClick={handleSend}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
                        >
                            Send Message
                        </button>

                        <div className="text-sm text-gray-600 mt-4">
                            <p>You can also contact us directly:</p>
                            <p><strong>Email:</strong> support@inshapecompany.com</p>
                            <p><strong>Phone:</strong> 0912-345-6789</p>
                        </div>

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
