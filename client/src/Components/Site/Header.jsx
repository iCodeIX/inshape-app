import React, { useState } from 'react'
// import './Header.css';
import hamburgerIcon from './../../assets/hamburger.png';
import searchIcon from './../../assets/search.png';
import closeIcon from './../../assets/close.png';
import cart from './../../assets/cart.png';
import profileIcon from './../../assets/profile.png';
import logo from './../../assets/logo.png';
import promo from './../../assets/promo.png';
import facebook from './../../assets/socials/facebook.png';
import instagram from './../../assets/socials/instagram.png';
import lazada from './../../assets/socials/lazada.PNG';
import shopee from './../../assets/socials/shopee.PNG';
import close from './../../assets/close.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cart from '../Products/Cart.jsx';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <nav className="">

            <div className="block md:hidden" onClick={toggleMenu}>
                <img className="w-8" src={hamburgerIcon} alt="hamburger icon" />
            </div>
            {
                isOpen &&
                <div className="md:hidden absolute top-0 left-0 bg-white rounded w-70 p-8">

                    <div className="grid grid-cols-1 gap-4">
                        <div className="w-5 m-2 justify-self-end" onClick={toggleMenu}>
                            <img src={close} alt="close" />
                        </div>
                        <Link to='/' className="px-3 py-1 rounded hover:bg-gray-200">Home</Link>
                        <Link to='/all-products' className="px-3 py-1 rounded hover:bg-gray-200">All Products</Link>
                        <Link to='/new-products' className="px-3 py-1 rounded hover:bg-gray-200">New Products</Link>
                        <Link to='/top-products' className="px-3 py-1 rounded hover:bg-gray-200">Top Products</Link>
                    </div>
                    <div className="flex flex-row gap-2">
                        <a className="" href="https://facebook.com"><img className="w-6" src={facebook} alt="Facebook" /></a>
                        <a className="" href="https://twitter.com"><img className="w-6" src={instagram} alt="Instagram" /></a>
                        <a className="" href="https://instagram.com"><img className="w-6" src={lazada} alt="lazada shop" /></a>
                        <a className="" href="https://twitter.com"><img className="w-6" src={shopee} alt="Shopee shop" /></a>
                    </div>
                </div>

            }

        </nav>
    );
}


function MainNav() {

    return (
        <nav className="flex py-4 hidden md:block z-50 max-w-lg mx-auto">
            <Link to='/' className='p-3 cursor-pointer py-1 font-semibold rounded hover:bg-red-400 hover:text-white mx-2'>Home</Link>
            <Link to='/AllProducts' className='p-3 cursor-pointer py-1 font-semibold  rounded hover:bg-red-400 hover:text-white mx-2'>All Products</Link>
            <Link to='/NewProducts' className='p-3 cursor-pointer py-1 font-semibold  rounded hover:bg-red-400 hover:text-white mx-2r'>New Products</Link>
            <Link to='/TopProducts' className='p-3 cursor-pointer py-1 font-semibold  rounded hover:bg-red-400 hover:text-white mx-2'>Top Products</Link>
        </nav>
    )
}

const Header = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');


    const handleSearch = () => {
        if (searchInput.trim()) {
            navigate(`/all-products?query=${encodeURIComponent(searchInput)}`);
        }
    };
    const [showSearch, setShowSearch] = useState(true);
    const [searchImage, setSearchImage] = useState(true);


    const handleSearchClick = () => {
        setShowSearch(prev => !prev); // toggle
        setSearchImage(prev => !prev);
        console.log(showSearch);
    };


    const [isOpenCart, setIsOpenCart] = useState(false);

    const openCart = () => {
        setIsOpenCart(true);
    }

    const closeCart = () => {
        setIsOpenCart(false);
    }
    return (
        <div className="fixed bg-white w-full z-50">
            <div className="w-full h-[50px] bg-gradient-to-r from-red-500 to-red-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-sm md:text-3xl font-extrabold tracking-wide animate-pulse">
                    🎉 25% OFF & FREE SHIPPING! 🎉
                </span>
            </div>

            <div className="flex relative p-4 justify-between items-center">
                <Navbar />
                {isOpenCart && <Cart handleOpenCart={openCart} handleCloseCart={closeCart} />}
                <div className="w-40"><img className="w-40" src={logo} alt="logo" /></div>
                <div className="hidden md:block cursor-pointer ml-auto p-2" onClick={handleSearchClick}><img className="w-8 mx-2" src={searchImage ? searchIcon : closeIcon} alt="search" /></div>
                <nav className="flex gap-2">
                    <div onClick={() => navigate("./profile")}><img className="cursor-pointer  w-8" src={profileIcon} alt="search" /></div>
                    <div onClick={openCart}><img className="cursor-pointer w-8" src={cart} alt="cart" /></div>
                </nav>
            </div>

            <div className={`${showSearch ? 'block md:hidden' : 'block md:block'} w-full`}>
                <div className="flex items-center max-w-lg min-w-10 mx-auto px-6">
                    <input
                        className="flex-grow px-4 text-gray-700 border-b-1"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="text"
                        placeholder="Search products..."
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-white cursor-pointer"
                    >
                        <img className="w-8" src={searchIcon} />
                    </button>
                </div>

            </div>

            <MainNav />

        </div >
    )
}

export default Header
