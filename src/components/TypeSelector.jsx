import React from 'react'

const TypeSelector = ({ onTypeSelect }) => {
  const TYPES = [
    { 
      name: 'Artifact', 
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      description: 'Permanent artifacts with powerful abilities'
    },
    { 
      name: 'Enchantment', 
      icon: 'M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m4 0V2a1 1 0 011-1h4a1 1 0 011 1v2M7 4v16a1 1 0 001 1h10a1 1 0 001-1V4M7 4h10',
      description: 'Magical auras and global effects'
    },
    { 
      name: 'Creature', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      description: 'Living beings that fight for you'
    },
    { 
      name: 'Land', 
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      description: 'Mana sources and special locations'
    },
    { 
      name: 'Instant', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      description: 'Quick spells you can cast anytime'
    },
    { 
      name: 'Planeswalker', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
      description: 'Powerful allies with unique abilities'
    },
    { 
      name: 'Sorcery', 
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      description: 'Powerful spells cast during your turn'
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="glass rounded-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Select a Card Type</h2>
          <p className="text-gray-400 text-sm">Choose a card type to explore</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TYPES.map(type => (
            <button
              key={type.name}
              className="group glass rounded-xl p-4 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-700/50"
              onClick={() => onTypeSelect(type.name)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 text-blue-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type.icon} />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {type.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {type.description}
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <svg 
                    className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Type Legend */}
        <div className="mt-6 pt-6 border-t border-gray-700/50">
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Card Type Overview</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400">
              <div>
                <div className="font-medium text-white">Permanents</div>
                <div>Artifact, Enchantment, Creature, Land, Planeswalker</div>
              </div>
              <div>
                <div className="font-medium text-white">Spells</div>
                <div>Instant, Sorcery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeSelector;