import React, { useState, useEffect } from 'react';
import { addCardToCollection, getCollection } from '../utils/localCollection.js';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const CardModal = ({ card, onClose }) => {
  if (!card) return null;

  // State to track if card is already in collection
  const [added, setAdded] = useState(() => {
    const collection = getCollection();
    return collection.some(c => c.id === card.id);
  });

  // Handler to add card to collection
  const handleAdd = () => {
    addCardToCollection(card);
    setAdded(true);
  };

  // State for price history
  const [priceHistory, setPriceHistory] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState('');

  // Fetch price history when modal opens
  useEffect(() => {
    const fetchPriceHistory = async () => {
      setPriceLoading(true);
      setPriceError('');
      setPriceHistory(null);
      try {
        // Scryfall's API for price history (if available)
        const res = await fetch(`https://api.scryfall.com/cards/${card.id}`);
        const data = await res.json();
        if (data.prices && data.prices.usd) {
          // Scryfall does not provide full price history, but you can use the 'usd_foil' and 'usd_etched' for more info
          // For demo, just show current price as a single point
          setPriceHistory({
            labels: ['Current'],
            datasets: [
              {
                label: 'USD Price',
                data: [parseFloat(data.prices.usd)],
                borderColor: '#22d3ee',
                backgroundColor: 'rgba(34,211,238,0.2)',
                tension: 0.3,
              },
            ],
          });
        } else {
          setPriceError('No price data available.');
        }
      } catch (err) {
        setPriceError('Failed to fetch price data.');
      }
      setPriceLoading(false);
    };
    fetchPriceHistory();
  }, [card.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      {/* Modal content */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Card image and info */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={card.image_uris?.normal}
            alt={card.name}
            className="rounded w-48 mb-4 md:mb-0"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-white">{card.name}</h2>
            <p className="text-md text-gray-300 mb-1">{card.type_line}</p>
            <p className="text-md text-gray-400 mb-1">Set: {card.set_name}</p>
            {card.prices?.usd && (
              <p className="text-lg text-green-300 font-semibold mb-1">${card.prices.usd}</p>
            )}
            {card.oracle_text && (
              <p className="text-md text-gray-200 italic mb-2">{card.oracle_text}</p>
            )}
            {card.flavor_text && (
              <p className="text-sm text-yellow-200 italic mb-2">"{card.flavor_text}"</p>
            )}
            {/* Add to Collection button */}
            <button
              onClick={handleAdd}
              disabled={added}
              className={`mt-4 px-4 py-2 rounded shadow ${added ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {added ? 'Added to Collection' : 'Add to Collection'}
            </button>
          </div>
        </div>
        {/* Price tracking chart */}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-white mb-2">Price Tracking</h3>
          {priceLoading && <p className="text-gray-300">Loading price data...</p>}
          {priceError && <p className="text-red-400">{priceError}</p>}
          {priceHistory && (
            <Line data={priceHistory} options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } },
            }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardModal; 