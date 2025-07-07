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
        const res = await fetch(`https://api.scryfall.com/cards/${card.id}`);
        const data = await res.json();
        if (data.prices && data.prices.usd) {
          setPriceHistory({
            labels: ['Current'],
            datasets: [
              {
                label: 'USD Price',
                data: [parseFloat(data.prices.usd)],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Modal Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative glass-dark rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 glass rounded-t-2xl p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold gradient-text">{card.name}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Card Image and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card Image */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  src={card.image_uris?.normal}
                  alt={card.name}
                  className="rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
              
              {/* Add to Collection Button */}
              <button
                onClick={handleAdd}
                disabled={added}
                className={`mt-4 w-full px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  added 
                    ? 'bg-green-600/20 text-green-400 border border-green-500/30 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 hover:shadow-lg'
                }`}
              >
                {added ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Added to Collection</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add to Collection</span>
                  </div>
                )}
              </button>
            </div>

            {/* Card Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Card Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{card.type_line}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Set:</span>
                      <span className="text-white">{card.set_name}</span>
                    </div>
                    {card.rarity && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rarity:</span>
                        <span className="text-white capitalize">{card.rarity}</span>
                      </div>
                    )}
                    {card.cmc !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">CMC:</span>
                        <span className="text-white">{card.cmc}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Info */}
                {card.prices?.usd && (
                  <div className="glass rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Pricing</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Current Price:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-400">${card.prices.usd}</span>
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Oracle Text */}
                {card.oracle_text && (
                  <div className="glass rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Oracle Text</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{card.oracle_text}</p>
                  </div>
                )}

                {/* Flavor Text */}
                {card.flavor_text && (
                  <div className="glass rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">Flavor Text</h3>
                    <p className="text-yellow-300 text-sm italic leading-relaxed">"{card.flavor_text}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Price Tracking Chart */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Price Tracking</h3>
            {priceLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            {priceError && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-400 text-sm">{priceError}</p>
              </div>
            )}
            {priceHistory && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <Line 
                  data={priceHistory} 
                  options={{
                    responsive: true,
                    plugins: { 
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#3b82f6',
                        borderWidth: 1,
                      }
                    },
                    scales: { 
                      y: { 
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#9ca3af',
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)',
                        },
                        ticks: {
                          color: '#9ca3af',
                        }
                      }
                    },
                  }} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal; 