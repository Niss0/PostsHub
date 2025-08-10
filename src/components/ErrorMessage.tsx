import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="flex items-center justify-center mb-3">
        <svg
          className="h-8 w-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary bg-red-600 hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
