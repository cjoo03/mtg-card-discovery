import React, { useEffect, useState } from 'react';
import {
  getCollection,
  removeCardFromCollection,
  updateCardQuantity,
  clearCollection
} from '../utils/localCollection.js';
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

const YourCards = () => {
  const [collection, setCollection] = useState([]);

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

  return (
    <div className="your-cards-container min-h-screen bg-black text-white p-8 pt-24">
      <h1 className="text-3xl font-bold mb-6">Your Card Collection</h1>
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
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-base text-gray-200 table-auto bg-gray-900 rounded">
            <thead className="bg-gray-800">
              <tr>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Set</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collection.map(card => (
                <tr key={card.id} className="border-b border-gray-800">
                  <td className="py-2 px-4">
                    <img src={card.image} alt={card.name} className="w-16 rounded" />
                  </td>
                  <td className="py-2 px-4">{card.name}</td>
                  <td className="py-2 px-4">{card.set}</td>
                  <td className="py-2 px-4">{card.type}</td>
                  <td className="py-2 px-4">{card.price ? `$${card.price}` : 'N/A'}</td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      min="1"
                      value={card.quantity}
                      onChange={e => handleQuantityChange(card.id, Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleRemove(card.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default YourCards;