import React from 'react'
import Card from './Card.jsx'

const CardGrid = ({ cards, filters, sortField, sortOrder, cardGridRef, onCardClick }) => {
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
    <div className="space-y-6">
      {/* Results Header */}
      <div className="glass rounded-xl p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-white font-medium">
                Showing {sortedCards.length} of {cards.length} cards
              </span>
            </div>
            
            {Object.keys(filters).length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-400 text-sm font-medium">Filtered</span>
              </div>
            )}
          </div>

          {/* Sort Indicator */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            <span>Sorted by {sortField}</span>
          </div>
        </div>
      </div>
      
      {/* Cards Grid */}
      <div
        ref={cardGridRef}
        className="
          h-[calc(100vh-12rem)] w-full overflow-y-auto
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6
          p-4 rounded-xl
        "
        style={{ minHeight: 0, maxWidth: '100vw' }}
      >
        {sortedCards.map((card, index) => (
          <div 
            key={card.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Card card={card} onClick={onCardClick} />
          </div>
        ))}
      </div>

      {/* No results message */}
      {sortedCards.length === 0 && cards.length > 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="glass rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No cards found</h3>
            <p className="text-gray-400 text-sm mb-4">
              No cards match your current filters.
            </p>
            <p className="text-gray-500 text-xs">
              Try adjusting your filter criteria to see more results.
            </p>
          </div>
        </div>
      )}

      {/* Empty state when no cards */}
      {cards.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="glass rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Start exploring</h3>
            <p className="text-gray-400 text-sm">
              Select a set, color, or type to begin discovering cards.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardGrid