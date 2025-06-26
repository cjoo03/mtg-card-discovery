import React from 'react';

const AdvancedFilters = ({ filters, onFiltersChange, sets, isOpen, onToggle }) => {
  return (
    <div className="mb-4">
      <button 
        onClick={onToggle} 
        className="text-white mb-2 flex items-center gap-2 hover:text-gray-300"
      >
        <span>{isOpen ? '▼' : '▶'}</span>
        {isOpen ? 'Hide' : 'Show'} Advanced Filters
      </button>
      
      {isOpen && (
        <div className="bg-gray-800 p-4 rounded border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Rarity Filter */}
            <div>
              <label className="text-white block mb-1 font-medium">Rarity:</label>
              <select 
                value={filters.rarity || ''} 
                onChange={(e) => onFiltersChange({...filters, rarity: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Rarities</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="mythic">Mythic</option>
              </select>
            </div>
            
            {/* CMC Range */}
            <div>
              <label className="text-white block mb-1 font-medium">Mana Cost:</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  min="0"
                  max="20"
                  placeholder="Min"
                  value={filters.cmcMin || ''}
                  onChange={(e) => onFiltersChange({...filters, cmcMin: e.target.value})}
                  className="w-1/2 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <input 
                  type="number" 
                  min="0"
                  max="20"
                  placeholder="Max"
                  value={filters.cmcMax || ''}
                  onChange={(e) => onFiltersChange({...filters, cmcMax: e.target.value})}
                  className="w-1/2 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-white block mb-1 font-medium">Price (USD):</label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) => onFiltersChange({...filters, priceMin: e.target.value})}
                  className="w-1/2 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) => onFiltersChange({...filters, priceMax: e.target.value})}
                  className="w-1/2 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Set Filter */}
            <div>
              <label className="text-white block mb-1 font-medium">Set:</label>
              <select 
                value={filters.set || ''} 
                onChange={(e) => onFiltersChange({...filters, set: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Sets</option>
                {sets.slice(0, 20).map(set => (
                  <option key={set.code} value={set.code}>
                    {set.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Identity */}
            <div>
              <label className="text-white block mb-1 font-medium">Color Identity:</label>
              <div className="flex flex-wrap gap-1">
                {['W', 'U', 'B', 'R', 'G', 'C'].map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      const currentColors = filters.colors || [];
                      const newColors = currentColors.includes(color)
                        ? currentColors.filter(c => c !== color)
                        : [...currentColors, color];
                      onFiltersChange({...filters, colors: newColors});
                    }}
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      (filters.colors || []).includes(color)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    {color === 'C' ? 'Colorless' : color}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
            <button 
              onClick={() => onFiltersChange({})}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Reset All Filters
            </button>
            <button 
              onClick={onToggle}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters; 