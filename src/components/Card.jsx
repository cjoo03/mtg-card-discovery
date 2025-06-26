import React from 'react';

// Card component displays a single card's info
const Card = ({ card }) => (
  <div className="bg-gray-800 bg-opacity-90 rounded p-2 m-2 w-48 flex flex-col items-center border border-gray-700">
    <img src={card.image_uris?.normal} alt={card.name} className="rounded w-full mb-2" />
    <h2 className="text-base font-bold text-white text-center mb-1">{card.name}</h2>
    <p className="text-xs text-gray-300 text-center mb-1">{card.type_line}</p>
    {card.set_name && <p className="text-xs text-gray-400 text-center mb-1">Set: {card.set_name}</p>}
    {card.prices?.usd && <p className="text-xs text-gray-400 text-center mb-1">${card.prices.usd}</p>}
  </div>
);

export default Card;