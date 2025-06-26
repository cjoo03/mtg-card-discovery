import React, { useState, useEffect, useRef } from 'react';
import '../styling/Discover.css';
import Card from '../components/Card.jsx';
import SearchBar from '../components/SearchBar.jsx';

// List of card colors and types for user selection
const COLORS = [
  { name: 'White', code: 'W' },
  { name: 'Blue', code: 'U' },
  { name: 'Black', code: 'B' },
  { name: 'Red', code: 'R' },
  { name: 'Green', code: 'G' },
  { name: 'Multicolor', code: 'M' },
];
const TYPES = [
  'Artifact', 'Enchantment', 'Creature', 'Land', 'Instant', 'Planeswalker', 'Sorcery'
];

const Discover = () => {
  // UI state: which main category is selected
  const [mode, setMode] = useState(null); // 'sets', 'color', 'type'
  // For sets: list of sets from Scryfall
  const [sets, setSets] = useState([]);
  // For cards: array of cards to display
  const [cards, setCards] = useState([]);
  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // For selected set, color, or type
  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedType, setSelectedType] = useState(null);


  const [sortOption, setSortOption] = useState('name'); // 'name', 'cmc', 'price'

  // For pagination
  const [nextPage, setNextPage] = useState(null);
  // Ref for the card grid to scroll to top
  const cardGridRef = useRef(null);

  // Fetch all sets from Scryfall when "Sets" mode is selected
  useEffect(() => {
    if (mode === 'sets' && sets.length === 0) {
      setLoading(true);
      fetch('https://api.scryfall.com/sets')
        .then(res => res.json())
        .then(data => {
          setSets(data.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [mode, sets.length]);

  // Fetch all cards in a set, recursively following next_page, and only display after all are loaded and sorted
  useEffect(() => {
    if (selectedSet) {
      setLoading(true);
      setError(null);
      setCards([]); // Reset cards when new set is selected
      // Async function to fetch all pages
      const fetchCardsBySet = async (setCode) => {
        let allCards = [];
        let url = `https://api.scryfall.com/cards/search?q=set:${setCode}&order=name`;
        try {
          while (url) {
            const res = await fetch(url);
            const data = await res.json();
            allCards = [...allCards, ...data.data];
            url = data.has_more ? data.next_page : null;
          }
          // Sort alphabetically by name after all cards are fetched
          allCards.sort((a, b) => a.name.localeCompare(b.name));
          // Debug log: first card name and total count
          if (allCards.length > 0) {
            console.log('First card after sort:', allCards[0].name);
            console.log('Total cards fetched:', allCards.length);
          } else {
            console.log('No cards fetched for set:', setCode);
          }
          setCards(allCards);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch cards for set.');
          setLoading(false);
        }
      };
      fetchCardsBySet(selectedSet);
    }
  }, [selectedSet]);

  // Fetch cards for selected color
  useEffect(() => {
    if (selectedColor) {
      setLoading(true);
      setError(null);
      setCards([]);
      const colorQuery = selectedColor === 'M' ? 'c%3E1' : `c%3A${selectedColor}`;
      fetch(`https://api.scryfall.com/cards/search?q=${colorQuery}&unique=prints&order=random`)
        .then(res => res.json())
        .then(data => {
          setCards((data.data || []).slice(0, 150));
          setNextPage(null); // No pagination for color
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch cards for color.');
          setLoading(false);
        });
    }
  }, [selectedColor]);

  // Fetch cards for selected type (keep pagination for now)
  useEffect(() => {
    if (selectedType) {
      setLoading(true);
      setError(null);
      setCards([]);
      fetch(`https://api.scryfall.com/cards/search?q=type%3A${selectedType.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
          setCards(data.data || []);
          setNextPage(data.next_page || null);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch cards for type.');
          setLoading(false);
        });
    }
  }, [selectedType]);

  // Reset cards and selections when mode changes
  useEffect(() => {
    setCards([]);
    setSelectedSet(null);
    setSelectedColor(null);
    setSelectedType(null);
    setError(null);
    setNextPage(null);
  }, [mode]);

  // Load more cards (pagination): always append to the existing array (for type/color only)
  const handleLoadMore = () => {
    if (!nextPage) return;
    setLoading(true);
    fetch(nextPage)
      .then(res => res.json())
      .then(data => {
        setCards(prev => [...prev, ...(data.data || [])]);
        setNextPage(data.next_page || null);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load more cards.');
        setLoading(false);
      });
  };

  // Scroll the window to the very top (including above the navbar)
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Table-like layout for sets, now full width and height, with card count
  const renderSets = () => (
    <div className="overflow-x-auto h-[70vh] w-full bg-gray-900 rounded shadow flex flex-col">
      <h2 className="text-xl font-bold mb-2 text-white">Select a Set</h2>
      {loading && <p className="text-gray-300">Loading sets...</p>}
      <table className="w-full text-left text-base text-gray-200 table-fixed">
        <thead className="bg-gray-800 sticky top-0">
          <tr>
            <th className="py-2 px-4 w-2/5">Set Name</th>
            <th className="py-2 px-4 w-1/6">Code</th>
            <th className="py-2 px-4 w-1/6">Release Date</th>
            <th className="py-2 px-4 w-1/6">Card Count</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {sets.map(set => (
            <tr
              key={set.code}
              className="hover:bg-gray-700 cursor-pointer text-lg"
              onClick={() => setSelectedSet(set.code)}
            >
              <td className="py-2 px-4 border-b border-gray-800">{set.name}</td>
              <td className="py-2 px-4 border-b border-gray-800">{set.code.toUpperCase()}</td>
              <td className="py-2 px-4 border-b border-gray-800">{set.released_at}</td>
              <td className="py-2 px-4 border-b border-gray-800">{set.card_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // UI for selecting colors
  const renderColors = () => (
    <div>
      <h2 className="text-xl font-bold mb-2 text-white">Select a Color</h2>
      <div className="flex gap-2 flex-wrap">
        {COLORS.map(color => (
          <button
            key={color.code}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-500 text-white border border-gray-500"
            onClick={() => setSelectedColor(color.code)}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );

  // UI for selecting types
  const renderTypes = () => (
    <div>
      <h2 className="text-xl font-bold mb-2 text-white">Select a Card Type</h2>
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(type => (
          <button
            key={type}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-500 text-white border border-gray-500"
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );

  // UI for filtering/sorting (for sets, you can expand this as needed)
  // ...

  return (
    <div className="discover-container p-4 bg-black min-h-screen pt-20">
      <h1 className="text-2xl font-bold mb-4 text-white">Discover</h1>
      {/* Main category buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${mode === 'sets' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setMode('sets')}
        >
          Sets
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'color' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setMode('color')}
        >
          By Color
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'type' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setMode('type')}
        >
          Card Type
        </button>
      </div>

      {/* Show relevant options based on mode */}
      {mode === 'sets' && !selectedSet && renderSets()}
      {mode === 'color' && !selectedColor && renderColors()}
      {mode === 'type' && !selectedType && renderTypes()}

      {/* Show cards if any option is selected */}
      {(selectedSet || selectedColor || selectedType) && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2 text-white">Cards</h2>
          {/* Show loading spinner/message until all cards are loaded for sets */}
          {loading && <p className="text-gray-300">Loading cards...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {/* Card grid: responsive grid layout for cards in a scrollable container */}
          <div className="h-[70vh] w-full overflow-y-auto bg-black rounded">
            <div
              ref={cardGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full"
            >
              {cards.sort((a, b) => {
                if (sortOption === 'name') return a.name.localeCompare(b.name);
                if (sortOption === 'cmc') return a.cmc - b.cmc;
                if (sortOption === 'price') return (a.prices.usd || 0) - (b.prices.usd || 0);
                return 0;
              }).map(card => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          </div>
          {/* Pagination: Load More button if there are more cards (for type/color only) */}
          {nextPage && (
            <div className="mt-4 flex justify-center">
              <button
                className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 border border-gray-500"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
          {/* Back to Top button */}
          {cards.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 border border-gray-500"
                onClick={handleBackToTop}
              >
                Back to Top
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Discover;