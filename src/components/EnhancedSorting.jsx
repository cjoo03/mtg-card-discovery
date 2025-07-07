import React from 'react';

const EnhancedSorting = ({ sortField, sortOrder, onSortChange }) => {
  const sortOptions = [
    { value: 'name', label: 'Name', icon: 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' },
    { value: 'cmc', label: 'Mana Cost', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { value: 'price', label: 'Price', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
    { value: 'rarity', label: 'Rarity', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { value: 'set', label: 'Set', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { value: 'type', label: 'Type', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  const handleSortFieldChange = (newField) => {
    onSortChange({ field: newField, order: sortOrder });
  };

  const handleSortOrderChange = (newOrder) => {
    onSortChange({ field: sortField, order: newOrder });
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange({ field: sortField, order: newOrder });
  };

  const currentSortOption = sortOptions.find(opt => opt.value === sortField);

  return (
    <div className="mb-6 animate-fade-in">
      <div className="glass rounded-xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Sort Field Selector */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <span className="text-white font-medium">Sort by:</span>
            </div>
            <select 
              value={sortField} 
              onChange={(e) => handleSortFieldChange(e.target.value)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order Controls */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium">Order:</span>
              <div className="flex border border-gray-600/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleSortOrderChange('asc')}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    sortOrder === 'asc'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <span>A-Z</span>
                  </div>
                </button>
                <button
                  onClick={() => handleSortOrderChange('desc')}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    sortOrder === 'desc'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>Z-A</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={toggleSortOrder}
              className="p-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-105"
              title="Toggle sort order"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* Current Sort Status */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={currentSortOption?.icon} />
              </svg>
              <span>
                Currently sorting by <span className="text-white font-medium">{currentSortOption?.label}</span> 
                in <span className="text-white font-medium">{sortOrder === 'asc' ? 'ascending' : 'descending'}</span> order
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSorting; 