import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/SearchBar.css';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate(); // React Router hook for navigation

    // When the form is submitted, navigate to the CardDetail page for the searched card
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            // Navigate to /card/<cardName> (encodeURIComponent for URL safety)`
            navigate(`/card/${encodeURIComponent(input.trim())}`);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {/*
              - text-black: input text is black
              - placeholder: 'Search for a card...'
              - placeholder disappears on focus or when input has text (default HTML behavior)
              - px-3 py-1 rounded for styling
            */}
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                type="text"
                placeholder="Search for a card..."
                className="text-black px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoComplete="off"
            /> 
            <button type="submit" className="ml-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Search</button>
        </form>
    );
};

export default SearchBar;