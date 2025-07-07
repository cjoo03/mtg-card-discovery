import React from 'react';

const AdvancedFilters = ({ filters, onFiltersChange, sets, isOpen, onToggle }) => {
  const colorOptions = [
    { code: 'W', name: 'White', color: '#f3f4f6' },
    { code: 'U', name: 'Blue', color: '#3b82f6' },
    { code: 'B', name: 'Black', color: '#1f2937' },
    { code: 'R', name: 'Red', color: '#ef4444' },
    { code: 'G', name: 'Green', color: '#10b981' },
    { code: 'C', name: 'Colorless', color: '#6b7280' }
  ];

  return (
    <div className="mb-6 animate-fade-in mt-4">
      <button 
        onClick={onToggle} 
        className="group flex items-center space-x-2 text-white mb-4 hover:text-blue-300 transition-colors duration-300"
      >
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="font-medium">{isOpen ? 'Hide' : 'Show'} Advanced Filters</span>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      </button>
      
      {isOpen && (
        <div className="glass rounded-xl p-6 animate-scale-in relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Rarity Filter */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Rarity</span>
              </label>
              <select 
                value={filters.rarity || ''} 
                onChange={(e) => onFiltersChange({...filters, rarity: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              >
                <option value="">All Rarities</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="mythic">Mythic</option>
              </select>
            </div>
            
            {/* CMC Range */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span>Mana Cost</span>
              </label>
              <div className="flex gap-3">
                <input 
                  type="number" 
                  min="0"
                  max="20"
                  placeholder="Min"
                  value={filters.cmcMin || ''}
                  onChange={(e) => onFiltersChange({...filters, cmcMin: e.target.value})}
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
                <input 
                  type="number" 
                  min="0"
                  max="20"
                  placeholder="Max"
                  value={filters.cmcMax || ''}
                  onChange={(e) => onFiltersChange({...filters, cmcMax: e.target.value})}
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center space-x-2">
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Price (USD)</span>
              </label>
              <div className="flex gap-3">
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) => onFiltersChange({...filters, priceMin: e.target.value})}
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) => onFiltersChange({...filters, priceMax: e.target.value})}
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Set Filter */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center space-x-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Set</span>
              </label>
              <select 
                value={filters.set || ''} 
                onChange={(e) => onFiltersChange({...filters, set: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
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
            <div className="space-y-2">
              <label className="text-white text-sm font-medium flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                <span>Color Identity</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color.code}
                    onClick={() => {
                      const currentColors = filters.colors || [];
                      const newColors = currentColors.includes(color.code)
                        ? currentColors.filter(c => c !== color.code)
                        : [...currentColors, color.code];
                      onFiltersChange({...filters, colors: newColors});
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      (filters.colors || []).includes(color.code)
                        ? 'text-white shadow-lg'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: (filters.colors || []).includes(color.code) ? color.color : 'rgba(55, 65, 81, 0.5)',
                      border: `2px solid ${(filters.colors || []).includes(color.code) ? color.color : 'rgba(75, 85, 99, 0.5)'}`
                    }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-700/50">
            <button 
              onClick={() => onFiltersChange({})}
              className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reset All Filters</span>
              </div>
            </button>
            <button 
              onClick={onToggle}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Apply Filters</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters; 