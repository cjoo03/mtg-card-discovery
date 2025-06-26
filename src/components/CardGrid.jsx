import React from 'react'
import Card from './Card.jsx'

const CardGrid = ({ cards, sortOption, onSortChange, cardGridRef }) => {
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <label className="text-white">Sort by:</label>
        <select 
          value={sortOption} 
          onChange={(e) => onSortChange(e.target.value)}
          className="px-2 py-1 bg-gray-700 text-white rounded"
        >
          <option value="name">Name</option>
          <option value="cmc">CMC</option>
          <option value="price">Price</option>
        </select>
      </div>
      
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
    </div>
  )
}

export default CardGrid