import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Navbar.css';
import SearchBar from './SearchBar.jsx';
import mtgLogo from '../images/mtglogo-1.png';

const Navbar = () => {
    return (
        <nav className="w-full bg-gray-800 text-white px-4 py-2 flex flex-col md:flex-row items-center justify-between fixed top-0 left-0 z-50 shadow">
            <div className="flex items-center mb-2 md:mb-0">
                <img src={mtgLogo} alt="CardFlow Logo" className="h-9 w-auto mr-2" />
                <Link to="/" className="text-2xl font-bold">CardFlow</Link>
            </div>
            <ul className="flex flex-col md:flex-row gap-2 md:gap-6 items-center mb-2 md:mb-0">
                <li>
                    <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
                </li>
                <li>
                    <Link to="/discover" className="hover:text-gray-400 transition-colors">Discover</Link>
                </li>
                <li>
                    <Link to="/your-cards" className="hover:text-gray-400 transition-colors">Your Cards</Link>
                </li>
            </ul>
            <div className="w-full md:w-auto">
                <SearchBar />
            </div>
        </nav>
    )
}

export default Navbar;