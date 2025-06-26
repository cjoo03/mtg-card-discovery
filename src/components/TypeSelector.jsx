import React from 'react'

const TypeSelector = ({onTypeSelect}) => {
    const TYPES = [
        'Artifact', 'Enchantment', 'Creature', 'Land', 'Instant', 'Planeswalker', 'Sorcery'
    ];
  
  
  
    return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-white">Select a Card Type</h2>
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(type => (
          <button
            key={type}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-500 text-white border border-gray-500"
            onClick={() => onTypeSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
    )
}

    export default TypeSelector