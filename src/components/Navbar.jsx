import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import mtgLogo from '../images/mtglogo-1.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md shadow-lg border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
                {/* Logo and App Name */}
                <Link to="/" className="flex items-center space-x-3 group">
                    <img src={mtgLogo} alt="MTG Discovery Logo" className="h-9 w-9 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300 select-none">
                        MTG Discovery
                    </span>
                </Link>
                {/* Desktop Nav Links + SearchBar */}
                <div className="hidden md:flex items-center space-x-2">
                    <NavLink to="/" active={isActive('/')}>Home</NavLink>
                    <NavLink to="/discover" active={isActive('/discover')}>Discover</NavLink>
                    <NavLink to="/your-cards" active={isActive('/your-cards')}>Your Cards</NavLink>
                    <div className="ml-4 w-56">
                        <SearchBar />
                    </div>
                </div>
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setIsMenuOpen((v) => !v)}
                    aria-label="Open menu"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-lg border-b border-white/10 animate-fade-in shadow-xl">
                    <div className="flex flex-col items-center py-4 space-y-2">
                        <NavLink to="/" active={isActive('/')} onClick={() => setIsMenuOpen(false)}>
                            Home
                        </NavLink>
                        <NavLink to="/discover" active={isActive('/discover')} onClick={() => setIsMenuOpen(false)}>
                            Discover
                        </NavLink>
                        <NavLink to="/your-cards" active={isActive('/your-cards')} onClick={() => setIsMenuOpen(false)}>
                            Your Cards
                        </NavLink>
                        <div className="w-11/12 mt-2">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

function NavLink({ to, active, children, ...props }) {
    return (
        <Link
            to={to}
            {...props}
            className={`relative px-4 py-2 text-base font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400
                ${active ? 'text-blue-400' : 'text-gray-200 hover:text-white'}
                hover:bg-white/5
            `}
        >
            <span className="relative z-10">
                {children}
            </span>
            {/* Animated underline */}
            <span
                className={`absolute left-2 right-2 -bottom-1 h-0.5 rounded-full transition-all duration-300
                    ${active ? 'bg-blue-400 scale-x-100' : 'bg-blue-400 scale-x-0 group-hover:scale-x-100'}
                `}
                aria-hidden="true"
            />
        </Link>
    );
}

export default Navbar;