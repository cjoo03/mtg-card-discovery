import React from 'react'

const ModeSelector = ({ mode, onModeChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded ${mode === 'sets' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        onClick={() => onModeChange('sets')}
      >
        Sets
      </button>
      <button
        className={`px-4 py-2 rounded ${mode === 'color' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        onClick={() => onModeChange('color')}
      >
        By Color
      </button>
      <button
        className={`px-4 py-2 rounded ${mode === 'type' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        onClick={() => onModeChange('type')}
      >
        Card Type
      </button>
    </div>
  );
};

export default ModeSelector;