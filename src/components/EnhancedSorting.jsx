import React from 'react';

const EnhancedSorting = ({ sortField, sortOrder, onSortChange }) => {
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'cmc', label: 'Mana Cost' },
    { value: 'price', label: 'Price' },
    { value: 'rarity', label: 'Rarity' },
    { value: 'set', label: 'Set' },
    { value: 'type', label: 'Type' }
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

  return (
    <div className="flex items-center gap-4 mb-4 p-3 bg-gray-800 rounded border border-gray-700">
      <div className="flex items-center gap-2">
        <label className="text-white font-medium">Sort by:</label>
        <select 
          value={sortField} 
          onChange={(e) => handleSortFieldChange(e.target.value)}
          className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-white font-medium">Order:</label>
        <div className="flex border border-gray-600 rounded overflow-hidden">
          <button
            onClick={() => handleSortOrderChange('asc')}
            className={`px-3 py-1 text-sm font-medium transition-colors ${
              sortOrder === 'asc'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            A-Z
          </button>
          <button
            onClick={() => handleSortOrderChange('desc')}
            className={`px-3 py-1 text-sm font-medium transition-colors ${
              sortOrder === 'desc'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Z-A
          </button>
        </div>
      </div>

      <button
        onClick={toggleSortOrder}
        className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 hover:bg-gray-600 transition-colors"
        title="Toggle sort order"
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>

      <div className="text-gray-400 text-sm">
        Currently sorting by <span className="text-white font-medium">{sortOptions.find(opt => opt.value === sortField)?.label}</span> 
        in <span className="text-white font-medium">{sortOrder === 'asc' ? 'ascending' : 'descending'}</span> order
      </div>
    </div>
  );
};

export default EnhancedSorting; 