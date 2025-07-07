import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTOCOMPLETE_API = 'https://api.scryfall.com/cards/autocomplete?q=';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionLoading, setSuggestionLoading] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const debounceTimeout = useRef(null);

    // Autocomplete suggestions
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        if (!input.trim() || input.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        setSuggestionLoading(true);
        debounceTimeout.current = setTimeout(async () => {
            try {
                const res = await fetch(AUTOCOMPLETE_API + encodeURIComponent(input));
                const data = await res.json();
                setSuggestions(data.data || []);
                setShowSuggestions(true);
            } catch (e) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
            setSuggestionLoading(false);
        }, 100); // 100ms debounce for faster response
        // Cleanup
        return () => clearTimeout(debounceTimeout.current);
    }, [input]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            navigate(`/card/${encodeURIComponent(input.trim())}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (name) => {
        setInput(name);
        setShowSuggestions(false);
        navigate(`/card/${encodeURIComponent(name)}`);
    };

    const handleInputBlur = () => {
        setTimeout(() => setShowSuggestions(false), 120); // allow click
        setIsFocused(false);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
        if (suggestions.length > 0) setShowSuggestions(true);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full relative">
            <div className={`flex shadow-md transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-400' : ''}`}>
                <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    type="text"
                    placeholder="Search for a card..."
                    className="flex-1 px-5 py-2 md:py-2.5 rounded-l-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none text-base md:text-base"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="px-6 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-base"
                    disabled={!input.trim()}
                >
                    Search
                </button>
            </div>
            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 z-50 max-h-72 overflow-y-auto animate-fade-in">
                    {suggestionLoading && (
                        <li className="px-4 py-3 text-gray-400">Loading...</li>
                    )}
                    {suggestions.map((name, idx) => (
                        <li
                            key={name}
                            className="px-4 py-3 text-white hover:bg-blue-700/60 cursor-pointer transition-colors duration-150 text-base"
                            onMouseDown={() => handleSuggestionClick(name)}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;