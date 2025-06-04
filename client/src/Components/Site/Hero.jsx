import React from 'react'
import heroImage from '../../assets/hero-image.png';
import facebook from './../../assets/socials/facebook.png';
import instagram from './../../assets/socials/instagram.png';
import lazada from './../../assets/socials/lazada.PNG';
import shopee from './../../assets/socials/shopee.PNG';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section
            style={{ backgroundImage: `url(${heroImage})` }}
            className="bg-cover bg-center h-[100vh] flex flex-col items-center justify-center text-white text-center px-4"
        >
            <h1 className="text-4xl font-bold mb-4 md:text-6xl">InShape Fitness Store</h1>
            <p className="text-xl mb-6 md:text-4xl">Power Up Your Workout with the Best Gears.</p>
            <a onClick={()=> navigate("/AllProducts")} className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition md:w-50 md:text-lg">
                Shop Now
            </a>
            <p className='mt-4'>or Visit our Store on</p>
            <div className="flex gap-2 p-2">
                <a href="https://facebook.com" ><img className="w-8" src={facebook} alt="Facebook" /></a>
                <a href="https://twitter.com"><img className="w-8" src={instagram} alt="Instagram" /></a>
                <a href="https://instagram.com"><img className="w-8 rounded-full" src={lazada} alt="lazada shop" /></a>
                <a href="https://twitter.com"><img className="w-8 rounded-full" src={shopee} alt="Shopee shop" /></a>
            </div>
        </section>
    )
}

export default Hero
