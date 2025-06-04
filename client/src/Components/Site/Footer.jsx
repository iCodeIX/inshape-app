import React from "react";
// import './Footer.css';
import facebook from './../../assets/socials/facebook.png';
import instagram from './../../assets/socials/instagram.png';
import lazada from './../../assets/socials/lazada.PNG';
import shopee from './../../assets/socials/shopee.PNG';

const Footer = () => {
    return (

        <footer className="bg-black flex flex-col gap-4 p-8 items-center justify-center">
            <ul className="text-center">
                <li><a className="text-white hover:bg-red-500 p-2" href="#privacy-policy">Privacy Policy</a></li>
                <li><a className="text-white hover:bg-red-500 p-2" href="#terms-of-service">Terms of Service</a></li>
                <li><a className="text-white hover:bg-red-500 p-2" href="#contact">Contact Us</a></li>
            </ul>
            <div className="flex gap-2">
                <a href="https://facebook.com" ><img className="w-6" src={facebook} alt="Facebook" /></a>
                <a href="https://twitter.com"><img className="w-6" src={instagram} alt="Instagram" /></a>
                <a href="https://instagram.com"><img className="w-6 rounded-full" src={lazada} alt="lazada shop" /></a>
                <a href="https://twitter.com"><img className="w-6 rounded-full" src={shopee} alt="Shopee shop" /></a>
            </div>
            <p className="text-white">&copy; 2025 InShape Company. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer;