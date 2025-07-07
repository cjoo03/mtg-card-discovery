import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AUTOCOMPLETE_API = 'https://api.scryfall.com/cards/autocomplete?q=';

const Search = () => {
  const [input, setInput] = useState('');
  const [randomCards, setRandomCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Fetch 5 random cards for the stack
  useEffect(() => {
    fetchRandomCards();
    // eslint-disable-next-line
  }, []);

  const fetchRandomCards = async () => {
    setLoading(true);
    const cards = [];
    for (let i = 0; i < 5; i++) {
      try {
        const res = await fetch('https://api.scryfall.com/cards/random');
        const data = await res.json();
        cards.push(data);
      } catch (e) {
        // fallback: skip
      }
    }
    setRandomCards(cards);
    setLoading(false);
  };

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
    }, 200);
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
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) setShowSuggestions(true);
  };

  const handleRandomCard = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.scryfall.com/cards/random');
      const data = await res.json();
      navigate(`/card/${encodeURIComponent(data.name)}`);
    } catch (e) {}
    setLoading(false);
  };

  return (
    <>
      <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-b from-[#181c2e] via-[#2a1a3a] to-black -z-10" aria-hidden="true" />
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-2 py-12">
        {/* Centered Search Section */}
        <div className="flex flex-col items-center w-full max-w-xl mx-auto z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center drop-shadow-lg">Search Magic Cards</h1>
          <form onSubmit={handleSubmit} className="w-full mb-4 relative">
            <div className="flex items-center shadow-lg bg-black/60 rounded-full px-2 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
              <svg className="w-7 h-7 text-blue-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                type="text"
                placeholder="Search for a card..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 text-lg rounded-full focus:outline-none"
                autoFocus
                autoComplete="off"
              />
              <button
                type="submit"
                className="ml-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
                disabled={!input.trim()}
              >
                Search
              </button>
            </div>
            {/* Autocomplete Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-2 bg-black/80 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 z-50 max-h-72 overflow-y-auto animate-fade-in">
                {suggestionLoading && (
                  <li className="px-4 py-3 text-gray-400">Loading...</li>
                )}
                {suggestions.map((name, idx) => (
                  <li
                    key={name}
                    className="px-4 py-3 text-white hover:bg-blue-700/60 cursor-pointer transition-colors duration-150 text-lg"
                    onMouseDown={() => handleSuggestionClick(name)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <div className="flex flex-row gap-4 mb-8">
            <button
              onClick={() => alert('Advanced Search coming soon!')}
              className="px-5 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Advanced Search
            </button>
            <button
              onClick={handleRandomCard}
              className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-medium shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Random Card'}
            </button>
          </div>
        </div>
        {/* Fanned Stack of Random Cards (Image Only) */}
        <div className="relative flex flex-row items-end justify-center mt-2 mb-8 min-h-[260px] w-full max-w-3xl">
          {randomCards.map((card, i) => (
            <div
              key={card.id || i}
              className={`relative z-${i+1} -mx-6 hover:z-50 transition-transform duration-300 hover:scale-110 cursor-pointer`}
              style={{ transform: `rotate(${(i-2)*7}deg) translateY(${Math.abs(i-2)*8}px)` }}
              onClick={() => navigate(`/card/${encodeURIComponent(card.name)}`)}
              title={card.name}
            >
              <img
                src={card.image_uris?.large || card.image_uris?.normal}
                alt={card.name}
                className="rounded-xl shadow-2xl border-2 border-gray-800 w-44 h-64 object-cover bg-gray-900 hover:border-blue-400 transition-all duration-200"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search; 