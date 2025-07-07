import React, { useState } from 'react'

const SetsTable = ({ sets, onSetSelect, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and sort sets
  const filteredAndSortedSets = sets
    .filter(set => 
      set.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'code':
          aValue = a.code;
          bValue = b.code;
          break;
        case 'date':
          aValue = new Date(a.released_at);
          bValue = new Date(b.released_at);
          break;
        case 'count':
          aValue = a.card_count;
          bValue = b.card_count;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }) => (
    <svg 
      className={`w-4 h-4 ml-1 transition-colors duration-300 ${
        sortBy === field ? 'text-blue-400' : 'text-gray-400'
      }`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
  );

  return (
    <div className="animate-fade-in">
      <div className="glass rounded-xl p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Select a Set</h2>
            <p className="text-gray-400 text-sm">Browse Magic: The Gathering sets</p>
          </div>
          
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-700/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-800/50">
                  <tr>
                    {[
                      { key: 'name', label: 'Set Name' },
                      { key: 'code', label: 'Code' },
                      { key: 'date', label: 'Release Date' },
                      { key: 'count', label: 'Card Count' }
                    ].map(({ key, label }) => (
                      <th 
                        key={key}
                        className="px-6 py-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white transition-colors duration-300"
                        onClick={() => handleSort(key)}
                      >
                        <div className="flex items-center">
                          {label}
                          <SortIcon field={key} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {filteredAndSortedSets.map((set, index) => (
                    <tr
                      key={set.code}
                      className="hover:bg-gray-700/50 cursor-pointer transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => onSetSelect(set.code)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={`https://svgs.scryfall.io/sets/${set.code}.svg`}
                            alt={set.code}
                            className="w-8 h-8 rounded-lg bg-gray-800/60 border border-gray-700/50 p-1 shadow"
                            draggable={false}
                          />
                          <div>
                            <div className="text-sm font-medium text-white">{set.name}</div>
                            <div className="text-xs text-gray-400">{set.set_type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                          {set.code.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(set.released_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-white">{set.card_count}</span>
                          <span className="text-xs text-gray-400">cards</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Showing {filteredAndSortedSets.length} of {sets.length} sets
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetsTable;