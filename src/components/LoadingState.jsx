import React from 'react'

const LoadingState = ({ loading, error, message }) => {
  if (!loading && !error) return null;

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 animate-fade-in">
        <div className="glass rounded-2xl p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Error</h3>
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <p className="text-gray-500 text-xs">
            Please try again or check your connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 animate-fade-in">
      <div className="glass rounded-2xl p-8 max-w-md mx-auto text-center">
        {/* Loading Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <h3 className="text-lg font-semibold text-white mb-2">
          {message || 'Loading...'}
        </h3>
        
        {/* Animated Dots */}
        <div className="flex items-center justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;