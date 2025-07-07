import React from 'react'

const ModeSelector = ({ mode, onModeChange }) => {
  const modes = [
    { key: 'sets', label: 'Sets', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { key: 'color', label: 'By Color', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z' },
    { key: 'type', label: 'Card Type', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
  ];

  return (
    <div className="mb-8 animate-fade-in">
      <div className="glass rounded-xl p-2">
        <div className="flex gap-2">
          {modes.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                mode === key
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
              onClick={() => onModeChange(key)}
            >
              <svg 
                className={`w-5 h-5 transition-colors duration-300 ${
                  mode === key ? 'text-white' : 'text-gray-400'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;