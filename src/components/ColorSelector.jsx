import React from 'react'

const ColorSelector = ({ onColorSelect }) => {
  const COLORS = [
    { name: 'White', code: 'W', color: '#f3f4f6', textColor: '#1f2937', borderColor: '#d1d5db' },
    { name: 'Blue', code: 'U', color: '#3b82f6', textColor: '#ffffff', borderColor: '#1d4ed8' },
    { name: 'Black', code: 'B', color: '#1f2937', textColor: '#ffffff', borderColor: '#111827' },
    { name: 'Red', code: 'R', color: '#ef4444', textColor: '#ffffff', borderColor: '#dc2626' },
    { name: 'Green', code: 'G', color: '#10b981', textColor: '#ffffff', borderColor: '#059669' },
    { name: 'Multicolor', code: 'M', color: 'linear-gradient(135deg, #f59e0b, #ef4444, #3b82f6, #10b981)', textColor: '#ffffff', borderColor: '#f59e0b' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="glass rounded-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Select a Color</h2>
          <p className="text-gray-400 text-sm">Choose a color to discover cards</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {COLORS.map(color => (
            <button
              key={color.code}
              className="group relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: color.color,
                borderColor: color.borderColor,
                color: color.textColor
              }}
              onClick={() => onColorSelect(color.code)}
            >
              {/* Gradient overlay for multicolor */}
              {color.code === 'M' && (
                <div 
                  className="absolute inset-0 rounded-xl opacity-80"
                  style={{ background: color.color }}
                ></div>
              )}
              
              <div className="relative z-10 text-center">
                <div className="text-lg font-bold mb-1">{color.name}</div>
                <div className="text-xs opacity-80">Click to explore</div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
        
        {/* Color Legend */}
        <div className="mt-6 pt-6 border-t border-gray-700/50">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <span>White - Healing & Protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Blue - Control & Knowledge</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              <span>Black - Death & Power</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Red - Chaos & Destruction</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Green - Nature & Growth</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-500"></div>
              <span>Multicolor - Complex Strategies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;