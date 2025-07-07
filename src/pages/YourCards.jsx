import React, { useEffect, useState } from 'react';
import {
  getCollection,
  removeCardFromCollection,
  updateCardQuantity,
  clearCollection,
  addCardToCollection,
  importCardsToCollection,
  exportCollectionToCSV
} from '../utils/localCollection.js';
import CardGrid from '../components/CardGrid.jsx';
import CardModal from '../components/CardModal.jsx';
import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import SearchBar from '../components/SearchBar.jsx';
import '../styling/YourCards.css';

// Parse decklist text (Archidekt/Moxfield style) into [{name, quantity}]
function parseDecklist(text) {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('//'))
    .map(line => {
      const match = line.match(/^(\d+)x?\s+(.+)$/i);
      if (match) {
        return { quantity: parseInt(match[1], 10), name: match[2].trim() };
      }
      return null;
    })
    .filter(Boolean);
}

// Fetch card details from Scryfall in batches (max 75 per batch)
async function fetchCardsByNames(names) {
  const results = [];
  const errors = [];
  const batchSize = 75;
  for (let i = 0; i < names.length; i += batchSize) {
    const batch = names.slice(i, i + batchSize);
    const query = batch.map(n => `!\"${n}\"`).join(' or ');
    const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.data) {
        results.push(...data.data);
      }
      if (data.warnings) {
        errors.push(...data.warnings);
      }
    } catch (err) {
      errors.push(`Failed to fetch batch: ${batch.join(', ')}`);
    }
  }
  return { results, errors };
}

const YourCards = () => {
  const [collection, setCollection] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  // State for Archidekt import
  const [importText, setImportText] = useState('');
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');
  const [importError, setImportError] = useState('');
  const [showImport, setShowImport] = useState(false);
  // State for card modal
  const [selectedCard, setSelectedCard] = useState(null);

  // Load collection on mount
  useEffect(() => {
    setCollection(getCollection());
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Remove a card
  const handleRemove = (id) => {
    removeCardFromCollection(id);
    setCollection(getCollection());
  };

  // Update quantity
  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      removeCardFromCollection(id);
    } else {
      updateCardQuantity(id, quantity);
    }
    setCollection(getCollection());
  };

  // Clear all
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your entire collection?')) {
      clearCollection();
      setCollection([]);
    }
  };

  // Handle Archidekt import
  const handleImport = async () => {
    setImporting(true);
    setImportProgress('Parsing decklist...');
    setImportError('');
    
    // Parse decklist
    const parsed = parseDecklist(importText);
    if (parsed.length === 0) {
      setImportError('No valid cards found in decklist.');
      setImporting(false);
      return;
    }
    
    setImportProgress(`Fetching details for ${parsed.length} cards...`);
    
    // Fetch card details in batches
    const { results, errors } = await fetchCardsByNames(parsed.map(c => c.name));
    
    // Prepare cards for import
    const cardsToImport = [];
    parsed.forEach(({ name, quantity }) => {
      const card = results.find(c => c.name.toLowerCase() === name.toLowerCase());
      if (card) {
        cardsToImport.push({
          ...card,
          quantity: quantity
        });
      } else {
        errors.push(`Card not found: ${name}`);
      }
    });
    
    // Import cards (merge with existing collection)
    if (cardsToImport.length > 0) {
      importCardsToCollection(cardsToImport);
      setCollection(getCollection());
    }
    
    setImportProgress('');
    setImporting(false);
    setImportError(errors.length > 0 ? errors.join('\n') : '');
    if (errors.length === 0) {
      setImportText('');
      setShowImport(false);
    }
  };

  // Handle export
  const handleExport = () => {
    exportCollectionToCSV(collection);
  };

  // Handle export to TCGPlayer
  const handleExportToTCGPlayer = () => {
    if (!collection.length) return;
    // Format: quantity name [SET] number
    const lines = collection.map(card => {
      const qty = card.quantity || 1;
      const name = card.name;
      const set = card.set?.toUpperCase() || card.set_name?.toUpperCase() || '';
      const num = card.collector_number || '';
      return `${qty} ${name} [${set}] ${num}`;
    });
    const exportText = lines.join('\n');
    // Copy to clipboard
    navigator.clipboard.writeText(exportText).then(() => {
      window.open('https://www.tcgplayer.com/massentry', '_blank');
      setTimeout(() => {
        alert('Your cards have been copied to the clipboard!\n\nGo to the TCGPlayer Mass Entry page and paste (Ctrl+V) into the box.');
      }, 500);
    });
  };

  const filteredCards = collection.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative pt-28 pb-12 px-2">
      {/* Hero Accent Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[600px] h-[300px] bg-gradient-to-br from-green-700/30 via-blue-700/20 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight text-center drop-shadow-lg">Your Collection</h1>
        <p className="text-base md:text-lg text-gray-300 text-center max-w-xl mb-2">
          Manage and organize your Magic: The Gathering card collection
        </p>
      </div>
      {/* Glassy Card for Stats/Search/Actions */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center mb-10 animate-fade-in">
        <div className="w-full glass rounded-2xl shadow-xl border border-white/10 p-6 flex flex-col items-center">
          <div className="flex flex-row items-center justify-center w-full mb-4 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{collection.length}</div>
              <div className="text-gray-300 text-xs">Total Cards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                ${collection.reduce((sum, card) => sum + (parseFloat(card.prices?.usd || 0) * (card.quantity || 1)), 0).toFixed(2)}
              </div>
              <div className="text-gray-300 text-xs">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {new Set(collection.map(card => card.set_name)).size}
              </div>
              <div className="text-gray-300 text-xs">Sets</div>
            </div>
          </div>
          <div className="w-full flex flex-row gap-4 mb-4">
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search your collection..."
              className="w-full px-5 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
            />
            <button
              onClick={handleExport}
              className="ml-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Export CSV
            </button>
            <button
              onClick={handleExportToTCGPlayer}
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Export to TCGPlayer
            </button>
          </div>
          <div className="flex flex-row w-full gap-2 mt-2">
            <button
              onClick={() => setShowImport(!showImport)}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Import Cards
            </button>
            <button
              onClick={handleClear}
              disabled={collection.length === 0}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Clear Collection
            </button>
          </div>
          {/* Import Section */}
          {showImport && (
            <div className="mt-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 w-full">
              <h3 className="text-lg font-bold text-white mb-4">Import from Decklist</h3>
              <textarea
                className="w-full h-32 p-4 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="4 Lightning Bolt&#10;2 Counterspell&#10;1 Sol Ring"
                disabled={importing}
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleImport}
                  disabled={importing || !importText.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {importing ? (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Importing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      <span>Import Cards</span>
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setShowImport(false)}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
              </div>
              {importProgress && (
                <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">{importProgress}</span>
                  </div>
                </div>
              )}
              {importError && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-400 mb-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Import Errors</span>
                  </div>
                  <pre className="text-red-300 text-sm whitespace-pre-wrap">{importError}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Card Grid */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
          {filteredCards.map((card, index) => (
            <Card 
              key={card.id} 
              card={card}
              quantity={card.quantity}
              onQuantityChange={handleQuantityChange}
              onClick={setSelectedCard}
            />
          ))}
        </div>
      </div>
      {/* Card Modal for details */}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
};

export default YourCards;