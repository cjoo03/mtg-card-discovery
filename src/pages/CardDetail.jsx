import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCardToCollection } from '../utils/localCollection.js';

const CardDetail = () => {
  const { cardName } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCollection, setAddingToCollection] = useState(false);
  const [printings, setPrintings] = useState([]);
  const [printingsLoading, setPrintingsLoading] = useState(false);
  const [addingIds, setAddingIds] = useState([]); // Track which printings are being added

  useEffect(() => {
    if (!cardName) {
      setError('No card name provided');
      setLoading(false);
      return;
    }
    fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`)
      .then(res => {
        if (!res.ok) throw new Error('Card not found');
        return res.json();
      })
      .then(data => {
        setCard(data);
        setLoading(false);
        // Fetch all printings/versions
        if (data.prints_search_uri) {
          setPrintingsLoading(true);
          fetch(data.prints_search_uri)
            .then(res => res.json())
            .then(printData => {
              setPrintings(printData.data || []);
              setPrintingsLoading(false);
            })
            .catch(() => setPrintingsLoading(false));
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [cardName]);

  const handleAddToCollection = (cardObj) => {
    if (!cardObj) return;
    setAddingIds((prev) => [...prev, cardObj.id]);
    addCardToCollection(cardObj);
    setTimeout(() => {
      setAddingIds((prev) => prev.filter((id) => id !== cardObj.id));
    }, 1000);
  };

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-400 ml-4">Loading card details...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="w-16 h-16 mb-4 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Card Not Found</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Go Back
        </button>
      </div>
    );
  }
  if (!card) return null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-2 py-10">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 self-start md:self-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>
      {/* Card Image and Details */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-16">
        {/* Card Image */}
        <div className="flex flex-col items-center">
          <div className="rounded-2xl shadow-2xl border-2 border-gray-800 bg-black/30 backdrop-blur-md p-2 mb-4">
            <img
              src={card.image_uris?.large || card.image_uris?.normal}
              alt={card.name}
              className="w-[320px] h-[448px] object-cover rounded-xl shadow-lg"
              draggable={false}
            />
          </div>
          <button
            onClick={() => handleAddToCollection(card)}
            className={`mt-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg ${addingToCollection ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={addingToCollection}
          >
            {addingToCollection ? 'Added!' : 'Add to Collection'}
          </button>
        </div>
        {/* Card Details Panel */}
        <div className="glass rounded-2xl shadow-2xl border border-white/10 p-8 w-full max-w-xl animate-fade-in bg-black/60 backdrop-blur-md">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-center md:text-left drop-shadow-lg">{card.name}</h1>
          <p className="text-gray-300 text-lg mb-4 text-center md:text-left">{card.type_line}</p>
          {/* Mana Cost */}
          {card.mana_cost && (
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-gray-400">Mana Cost:</span>
              <div className="flex items-center space-x-1">
                {card.mana_cost.split('').map((symbol, index) => {
                  if (symbol === '{') {
                    const endIndex = card.mana_cost.indexOf('}', index);
                    const manaSymbol = card.mana_cost.substring(index + 1, endIndex);
                    return (
                      <span key={index} className="text-blue-400 font-bold">
                        {manaSymbol}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
          {/* Oracle Text */}
          {card.oracle_text && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Oracle Text</h3>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{card.oracle_text}</p>
              </div>
            </div>
          )}
          {/* Flavor Text */}
          {card.flavor_text && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Flavor Text</h3>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-300 italic">{card.flavor_text}</p>
              </div>
            </div>
          )}
          {/* Card Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {card.set_name && (
              <div>
                <span className="text-gray-400">Set:</span>
                <p className="text-white font-medium">{card.set_name}</p>
              </div>
            )}
            {card.rarity && (
              <div>
                <span className="text-gray-400">Rarity:</span>
                <p className="text-white font-medium capitalize">{card.rarity}</p>
              </div>
            )}
            {card.collector_number && (
              <div>
                <span className="text-gray-400">Collector Number:</span>
                <p className="text-white font-medium">{card.collector_number}</p>
              </div>
            )}
            {card.power && card.toughness && (
              <div>
                <span className="text-gray-400">Power/Toughness:</span>
                <p className="text-white font-medium">{card.power}/{card.toughness}</p>
              </div>
            )}
          </div>
          {/* Price Information */}
          {card.prices && (
            <div className="bg-gray-800/50 rounded-lg p-4 mb-2">
              <h3 className="text-lg font-semibold text-white mb-3">Price Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">USD:</span>
                  <p className="text-green-400 font-bold">{card.prices.usd ? `$${card.prices.usd}` : '-'}</p>
                </div>
                <div>
                  <span className="text-gray-400">Foil USD:</span>
                  <p className="text-green-300 font-bold">{card.prices.usd_foil ? `$${card.prices.usd_foil}` : '-'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Printings/Versions Table */}
      <div className="w-full max-w-5xl mt-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4">All Versions & Printings</h2>
        <div className="glass rounded-2xl shadow-2xl border border-white/10 bg-black/60 backdrop-blur-md overflow-x-auto">
          {printingsLoading ? (
            <div className="p-8 text-center text-gray-400">Loading versions...</div>
          ) : printings.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No other versions found.</div>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-gray-300 text-base border-b border-white/10">
                  <th className="py-3 px-4 font-semibold">Image</th>
                  <th className="py-3 px-4 font-semibold">Set</th>
                  <th className="py-3 px-4 font-semibold">Collector #</th>
                  <th className="py-3 px-4 font-semibold">Rarity</th>
                  <th className="py-3 px-4 font-semibold">Lang</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {printings.map((printing) => (
                  <tr
                    key={printing.id}
                    className="hover:bg-blue-800/30 transition-colors duration-150 border-b border-white/5"
                  >
                    <td className="py-2 px-4 cursor-pointer" onClick={() => navigate(`/card/${encodeURIComponent(printing.name)}`)}>
                      <img
                        src={printing.image_uris?.small || printing.image_uris?.normal}
                        alt={printing.name}
                        className="w-16 h-22 object-cover rounded shadow"
                        draggable={false}
                      />
                    </td>
                    <td className="py-2 px-4 flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/card/${encodeURIComponent(printing.name)}`)}>
                      {printing.set_name}
                      {printing.set && (
                        <img
                          src={`https://svgs.scryfall.io/sets/${printing.set}.svg`}
                          alt={printing.set}
                          className="w-6 h-6 inline-block ml-1 opacity-80"
                          draggable={false}
                        />
                      )}
                    </td>
                    <td className="py-2 px-4">{printing.collector_number}</td>
                    <td className="py-2 px-4 capitalize">{printing.rarity}</td>
                    <td className="py-2 px-4 uppercase">{printing.lang}</td>
                    <td className="py-2 px-4">
                      <span className="text-green-400 font-semibold">
                        {printing.prices?.usd ? `$${printing.prices.usd}` : '—'}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCollection(printing);
                        }}
                        className={`px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold rounded-full shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base ${addingIds.includes(printing.id) ? 'opacity-60 cursor-not-allowed' : ''}`}
                        disabled={addingIds.includes(printing.id)}
                      >
                        {addingIds.includes(printing.id) ? 'Added!' : 'Add'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;