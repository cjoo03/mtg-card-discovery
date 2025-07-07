import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Home.css';

const Home = () => {
    return (
        <div className="home-container bg-black min-h-screen flex flex-col items-center justify-center">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center w-full max-w-2xl px-2 mb-8">
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2 text-center">MTG Discovery</h1>
                <p className="text-base text-gray-300 text-center mb-2">
                    Explore the vast world of Magic: The Gathering cards. Discover new sets, 
                    filter by colors and types, and build your perfect collection.
                </p>
            </div>

            {/* Feature Cards - Centered Row on Large Screens, Column on Small */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-4xl mb-8">
                <div className="glass rounded-2xl p-4 text-center flex-1 min-w-[220px] max-w-xs">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Discover Cards</h3>
                    <p className="text-xs text-gray-300 mb-2">
                        Browse through thousands of Magic cards with advanced filtering and search capabilities.
                    </p>
                    <Link 
                        to="/search"
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs"
                    >
                        Start Exploring
                    </Link>
                </div>

                <div className="glass rounded-2xl p-4 text-center flex-1 min-w-[220px] max-w-xs">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Your Collection</h3>
                    <p className="text-xs text-gray-300 mb-2">
                        Manage your personal card collection and track your favorite cards.
                    </p>
                    <Link 
                        to="/your-cards"
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs"
                    >
                        View Collection
                    </Link>
                </div>

                <div className="glass rounded-2xl p-4 text-center flex-1 min-w-[220px] max-w-xs">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">Advanced Features</h3>
                    <p className="text-xs text-gray-300 mb-2">
                        Powerful filtering, sorting, and search tools to find exactly what you're looking for.
                    </p>
                    <Link 
                        to="/discover"
                        className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs"
                    >
                        Explore Features
                    </Link>
                </div>
            </div>

            {/* Stats Section */}
            <div className="glass rounded-2xl p-4 mb-8 animate-fade-in w-full max-w-2xl">
                <h2 className="text-lg font-bold text-white text-center mb-2">Why Choose MTG Discovery?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="text-center">
                        <div className="text-base font-bold text-blue-400 mb-1">20,000+</div>
                        <div className="text-xs text-gray-300">Cards Available</div>
                    </div>
                    <div className="text-center">
                        <div className="text-base font-bold text-green-400 mb-1">500+</div>
                        <div className="text-xs text-gray-300">Sets Covered</div>
                    </div>
                    <div className="text-center">
                        <div className="text-base font-bold text-purple-400 mb-1">Real-time</div>
                        <div className="text-xs text-gray-300">Price Data</div>
                    </div>
                    <div className="text-center">
                        <div className="text-base font-bold text-yellow-400 mb-1">Advanced</div>
                        <div className="text-xs text-gray-300">Filtering</div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center animate-fade-in w-full max-w-2xl px-2">
                <h2 className="text-xl font-bold text-white mb-2">Ready to Start Your Journey?</h2>
                <p className="text-base text-gray-300 mb-4 max-w-xl mx-auto">
                    Join thousands of Magic players who use MTG Discovery to explore, collect, and manage their cards.
                </p>
                <Link 
                    to="/discover"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    Get Started Now
                </Link>
            </div>
        </div>
    );
};

export default Home;