import React from 'react'

const ColorSelector = ({ onColorSelect }) => {
  const COLORS = [
    { name: 'White', code: 'W' },
    { name: 'Blue', code: 'U' },
    { name: 'Black', code: 'B' },
    { name: 'Red', code: 'R' },
    { name: 'Green', code: 'G' },
    { name: 'Multicolor', code: 'M' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-white">Select a Color</h2>
      <div className="flex gap-2 flex-wrap">
        {COLORS.map(color => (
          <button
            key={color.code}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-500 text-white border border-gray-500"
            onClick={() => onColorSelect(color.code)}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector