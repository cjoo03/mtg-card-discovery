import React from 'react';

const PaginationControls = ({ 
  nextPage, 
  loading, 
  onLoadMore, 
  onBackToTop, 
  hasCards 
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Load More button */}
      {nextPage && (
        <div className="flex justify-center">
          <button
            className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading more cards...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span>Load More Cards</span>
              </div>
            )}
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
          </button>
        </div>
      )}
      
      {/* Back to Top button */}
      {hasCards && (
        <div className="flex justify-center">
          <button
            className="group glass rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-700/50"
            onClick={onBackToTop}
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>Back to Top</span>
            </div>
          </button>
        </div>
      )}

      {/* Progress indicator */}
      {nextPage && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>More cards available</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationControls;
