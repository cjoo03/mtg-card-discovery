import React, { useState } from 'react';
import { addCardToCollection } from '../utils/localCollection.js';

// Card component displays a single card's info
const Card = ({ card, onClick, size, quantity, onQuantityChange }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addingToCollection, setAddingToCollection] = useState(false);

  // Determine card size classes
  let cardSizeClass = "w-56 p-4"; // default size
  let imageHeight = 224; // default image height (h-56)
  let textSize = "text-sm";
  let setNameSize = "text-xs";
  let priceIconSize = "w-3 h-3";
  if (size === 'small') {
    cardSizeClass = "w-40 p-2";
    imageHeight = 128;
    textSize = "text-xs";
    setNameSize = "text-xs";
    priceIconSize = "w-2 h-2";
  }

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const handleAddToCollection = (e) => {
    e.stopPropagation();
    setAddingToCollection(true);
    addCardToCollection(card);
    setTimeout(() => setAddingToCollection(false), 1000);
  };

  // Quantity controls for collection mode
  const handleIncrement = (e) => {
    e.stopPropagation();
    if (onQuantityChange) onQuantityChange(card.id, (quantity || 1) + 1);
  };
  const handleDecrement = (e) => {
    e.stopPropagation();
    if (onQuantityChange) {
      if (quantity > 1) {
        onQuantityChange(card.id, quantity - 1);
      } else {
        onQuantityChange(card.id, 0); // Remove card if at 1
      }
    }
  };

  return (
    <div
      className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl m-2 flex flex-col items-center border border-gray-700/50 cursor-pointer hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 animate-scale-in ${cardSizeClass}`}
      onClick={() => onClick && onClick(card)}
      title="Click for more details"
    >
      {/* Card Image Container */}
      <div className="relative w-full mb-2 overflow-hidden rounded-lg">
        {!imageLoaded && !imageError && (
          <div className={`w-full bg-gray-700 animate-pulse rounded-lg`} style={{height: imageHeight}}></div>
        )}
        {imageError ? (
          <div className={`w-full bg-gray-700 rounded-lg flex items-center justify-center`} style={{height: imageHeight}}>
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <img 
            src={card.image_uris?.normal} 
            alt={card.name} 
            className={`w-full rounded-lg transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ maxHeight: imageHeight }}
          />
        )}
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
          <div className="absolute bottom-1 left-1 right-1">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1 text-center">
              <span className="text-xs text-blue-300 font-medium">Click to view details</span>
            </div>
          </div>
        </div>
      </div>
      {/* Card Info */}
      <div className="w-full text-center space-y-1">
        <h2 className={`font-bold text-white group-hover:text-blue-300 transition-colors duration-300 line-clamp-2 leading-tight ${textSize}`}>
          {card.name}
        </h2>
        <p className={`${textSize} text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-1`}>
          {card.type_line}
        </p>
        {card.set_name && (
          <p className={`${setNameSize} text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-1`}>
            {card.set_name}
          </p>
        )}
        {/* Price always shown */}
        <div className="flex items-center justify-center space-x-1 mt-1">
          <span className="text-xs text-green-400 font-semibold">
            {card.prices?.usd ? `$${card.prices.usd}` : <span className="text-gray-500">—</span>}
          </span>
          <svg className={`${priceIconSize} text-green-400`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {/* Quantity Controls for Collection */}
      {typeof quantity === 'number' && onQuantityChange ? (
        <div className="flex items-center justify-center mt-3 space-x-2">
          <button
            onClick={handleDecrement}
            className="px-2 py-1 rounded-full bg-gray-700 hover:bg-red-600 text-white font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Decrease quantity"
          >
            –
          </button>
          <span className="text-base font-semibold text-white px-2 select-none">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-2 py-1 rounded-full bg-gray-700 hover:bg-green-600 text-white font-bold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      ) : (
        // Add to Collection Button (for search/discover only)
        <button
          onClick={handleAddToCollection}
          disabled={addingToCollection}
          className="mt-2 w-full px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {addingToCollection ? (
            <div className="flex items-center justify-center space-x-1">
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Added!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add</span>
            </div>
          )}
        </button>
      )}
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default Card;