import React, { useEffect, useState } from 'react';
import {
  getCollection,
  removeCardFromCollection,
  updateCardQuantity,
  clearCollection,
  addCardToCollection
} from '../utils/localCollection.js';
import CardGrid from '../components/CardGrid.jsx';
import CardModal from '../components/CardModal.jsx';
import '../styling/YourCards.css';

// Utility to export collection to CSV
function exportToCSV(collection) {
  const headers = ['Name', 'Set', 'Type', 'Price', 'Quantity'];
  const rows = collection.map(card => [
    card.name,
    card.set,
    card.type,
    card.price,
    card.quantity
  ]);
  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mtg-collection.csv';
  a.click();
  URL.revokeObjectURL(url);
}

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
  // State for Archidekt import
  const [importText, setImportText] = useState('');
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');
  const [importError, setImportError] = useState('');
  // State for card modal
  const [selectedCard, setSelectedCard] = useState(null);

  // Load collection on mount
  useEffect(() => {
    setCollection(getCollection());
  }, []);

  // Remove a card
  const handleRemove = (id) => {
    removeCardFromCollection(id);
    setCollection(getCollection());
  };

  // Update quantity
  const handleQuantityChange = (id, quantity) => {
    updateCardQuantity(id, quantity);
    setCollection(getCollection());
  };

  // Clear all
  const handleClear = () => {
    clearCollection();
    setCollection([]);
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
    // Map quantities
    parsed.forEach(({ name, quantity }) => {
      const card = results.find(c => c.name.toLowerCase() === name.toLowerCase());
      if (card) {
        for (let i = 0; i < quantity; i++) {
          addCardToCollection(card);
        }
      } else {
        errors.push(`Card not found: ${name}`);
      }
    });
    setCollection(getCollection());
    setImportProgress('');
    setImporting(false);
    setImportError(errors.length > 0 ? errors.join('\n') : '');
    if (errors.length === 0) setImportText('');
  };

  // Handler to open modal with card details
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Handler to close modal
  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="your-cards-container min-h-screen bg-black text-white p-8 pt-24">
      <h1 className="text-3xl font-bold mb-6">Your Card Collection</h1>
      {/* Archidekt Import UI */}
      <div className="mb-8 bg-gray-900 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-2">Import from Archidekt/Moxfield</h2>
        <p className="text-gray-300 mb-2">Paste your decklist below (one card per line, e.g. <code>4 Lightning Bolt</code>):</p>
        <textarea
          className="w-full h-32 p-2 rounded bg-gray-800 text-white border border-gray-700 mb-2"
          value={importText}
          onChange={e => setImportText(e.target.value)}
          placeholder="4 Lightning Bolt\n2 Counterspell\n1 Sol Ring"
          disabled={importing}
        />
        <div className="flex gap-4 items-center">
          <button
            onClick={handleImport}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white shadow"
            disabled={importing || !importText.trim()}
          >
            {importing ? 'Importing...' : 'Import Decklist'}
          </button>
          {importProgress && <span className="text-gray-300">{importProgress}</span>}
        </div>
        {importError && <pre className="text-red-400 mt-2 whitespace-pre-wrap">{importError}</pre>}
      </div>
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => exportToCSV(collection)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white shadow"
          disabled={collection.length === 0}
        >
          Export to CSV
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white shadow"
          disabled={collection.length === 0}
        >
          Clear Collection
        </button>
      </div>
      {collection.length === 0 ? (
        <p className="text-gray-400">You have no cards in your collection yet.</p>
      ) : (
        <>
          {/* Use CardGrid for consistent card display and modal support */}
          <CardGrid cards={collection} onCardClick={handleCardClick} />
        </>
      )}
      {/* Card Modal for details */}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default YourCards;