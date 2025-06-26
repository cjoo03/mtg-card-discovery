import React from 'react';

const PaginationControls = ({ 
  nextPage, 
  loading, 
  onLoadMore, 
  onBackToTop, 
  hasCards 
}) => {
  return (
    <div>
      {/* Load More button */}
      {nextPage && (
        <div className="mt-4 flex justify-center">
          <button
            className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 border border-gray-500"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
      
      {/* Back to Top button */}
      {hasCards && (
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500 border border-gray-500"
            onClick={onBackToTop}
          >
            Back to Top
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationControls;
