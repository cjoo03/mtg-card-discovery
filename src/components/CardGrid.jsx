import React from 'react'
import Card from './Card.jsx'

const CardGrid = ({ cards, filters, sortField, sortOrder, cardGridRef }) => {
  // Filter cards based on applied filters
  const filterCards = (cards) => {
    return cards.filter(card => {
      // Rarity filter
      if (filters.rarity && card.rarity !== filters.rarity) {
        return false;
      }

      // CMC filter
      if (filters.cmcMin && card.cmc < parseFloat(filters.cmcMin)) {
        return false;
      }
      if (filters.cmcMax && card.cmc > parseFloat(filters.cmcMax)) {
        return false;
      }

      // Price filter
      const cardPrice = parseFloat(card.prices?.usd || 0);
      if (filters.priceMin && cardPrice < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && cardPrice > parseFloat(filters.priceMax)) {
        return false;
      }

      // Set filter
      if (filters.set && card.set !== filters.set) {
        return false;
      }

      // Color identity filter
      if (filters.colors && filters.colors.length > 0) {
        const cardColors = card.color_identity || [];
        const hasMatchingColor = filters.colors.some(color => 
          cardColors.includes(color)
        );
        if (!hasMatchingColor) {
          return false;
        }
      }

      return true;
    });
  };

  // Sort cards based on field and order
  const sortCards = (cards) => {
    return cards.sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'cmc':
          aValue = a.cmc || 0;
          bValue = b.cmc || 0;
          break;
        case 'price':
          aValue = parseFloat(a.prices?.usd || 0);
          bValue = parseFloat(b.prices?.usd || 0);
          break;
        case 'rarity':
          aValue = a.rarity;
          bValue = b.rarity;
          break;
        case 'set':
          aValue = a.set_name;
          bValue = b.set_name;
          break;
        case 'type':
          aValue = a.type_line;
          bValue = b.type_line;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === 'asc' ? comparison : -comparison;
      }

      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortOrder === 'asc' ? comparison : -comparison;
      }

      return 0;
    });
  };

  const filteredCards = filterCards(cards);
  const sortedCards = sortCards(filteredCards);

  return (
    <div>
      {/* Results count */}
      <div className="mb-4 text-gray-300">
        Showing {sortedCards.length} of {cards.length} cards
        {Object.keys(filters).length > 0 && (
          <span className="text-blue-400"> (filtered)</span>
        )}
      </div>
      
      <div className="h-[70vh] w-full overflow-y-auto bg-black rounded">
        <div
          ref={cardGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full"
        >
          {sortedCards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* No results message */}
      {sortedCards.length === 0 && cards.length > 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>No cards match your current filters.</p>
          <p className="text-sm mt-2">Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  )
}

export default CardGrid