import React, { useState, useEffect, useRef } from 'react';
import '../styling/Discover.css';
import Card from '../components/Card.jsx';
import SearchBar from '../components/SearchBar.jsx';
import ModeSelector from '../components/ModeSelector.jsx';
import ColorSelector from '../components/ColorSelector.jsx';
import TypeSelector from '../components/TypeSelector.jsx';
import SetsTable from '../components/SetsTable.jsx';
import CardGrid from '../components/CardGrid.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import AdvancedFilters from '../components/AdvancedFilters.jsx';
import EnhancedSorting from '../components/EnhancedSorting.jsx';
import CardModal from '../components/CardModal.jsx';

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

  // Advanced filtering and sorting state
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // For pagination
  const [nextPage, setNextPage] = useState(null);
  // Ref for the card grid to scroll to top
  const cardGridRef = useRef(null);

  // For modal
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch all sets from Scryfall when "Sets" mode is selected
  useEffect(() => {
    if (mode === 'sets' && sets.length === 0) {
      setLoading(true);
      fetch('https://api.scryfall.com/sets')
        .then(res => res.json())
        .then(data => {
          setSets(data.data || []);
          setLoading(false);
          // Force scroll to top when sets are loaded
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
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
    // Reset filters when mode changes
    setFilters({});
    // Force scroll to top when mode changes
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
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

  // Handle enhanced sorting changes
  const handleSortChange = ({ field, order }) => {
    setSortField(field);
    setSortOrder(order);
  };

  // Handler to open modal with card details
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Handler to close modal
  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  // Table-like layout for sets, now full width and height, with card count
  const renderSets = () => (
      <SetsTable sets={sets} onSetSelect={setSelectedSet} loading={loading} />
  );

  // UI for selecting colors
  const renderColors = () => (
      <ColorSelector onColorSelect={setSelectedColor} />
  );

  // UI for selecting types
  const renderTypes = () => (
      <TypeSelector onTypeSelect={setSelectedType} />
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative pt-28 pb-12 px-2">
      {/* Hero Accent Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[600px] h-[300px] bg-gradient-to-br from-blue-700/30 via-purple-700/20 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
      {/* Hero Icon and Heading */}
      <div className="relative z-10 flex flex-col items-center mb-8 animate-fade-in">
        <div className="w-14 h-14 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-slow">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight text-center drop-shadow-lg">Discover</h1>
        <p className="text-base md:text-lg text-gray-300 text-center max-w-xl mb-2">
          Explore Magic: The Gathering sets, colors, and card types. Use advanced filters and sorting to find your next favorite card.
        </p>
      </div>
      {/* Glassy Card for Mode Selector */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center mb-10 animate-fade-in">
        <div className="w-full glass rounded-2xl shadow-xl border border-white/10 p-6 flex flex-col items-center">
          <ModeSelector mode={mode} onModeChange={setMode} />
        </div>
      </div>
      {/* Main Content: Mode Options and Card Grid */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Show relevant options based on mode */}
        {mode === 'sets' && !selectedSet && (
          <div className="w-full animate-fade-in">
            {renderSets()}
          </div>
        )}
        {mode === 'color' && !selectedColor && (
          <div className="w-full animate-fade-in">
            {renderColors()}
          </div>
        )}
        {mode === 'type' && !selectedType && (
          <div className="w-full animate-fade-in">
            {renderTypes()}
          </div>
        )}
        {/* Show cards if any option is selected */}
        {(selectedSet || selectedColor || selectedType) && (
          <div className="mt-8 w-full animate-fade-in">
            <h2 className="text-xl font-bold mb-2 text-white">Cards</h2>
            <AdvancedFilters 
              filters={filters}
              onFiltersChange={setFilters}
              sets={sets}
              isOpen={filtersOpen}
              onToggle={() => setFiltersOpen(!filtersOpen)}
            />
            <EnhancedSorting 
              sortField={sortField}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
            {loading && <p className="text-gray-300">Loading cards...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <CardGrid 
              cards={cards} 
              filters={filters}
              sortField={sortField}
              sortOrder={sortOrder}
              cardGridRef={cardGridRef}
              onCardClick={handleCardClick}
            />
            <PaginationControls 
              nextPage={nextPage}
              loading={loading}
              onLoadMore={handleLoadMore}
              onBackToTop={handleBackToTop}
              hasCards={cards.length > 0}
            />
          </div>
        )}
        {selectedCard && (
          <CardModal card={selectedCard} onClose={handleCloseModal} />
        )}
      </div>
      {/* Custom Animation Keyframes for Hero Icon */}
      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
      `}</style>
    </div>
  );
};

export default Discover;