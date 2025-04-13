import React from 'react';

type SnackbarType = 'success' | 'error' | 'warning' | 'info';

interface SnackbarProps {
  message: string;
  type: SnackbarType;
  onClose: () => void;
  duration?: number; // Optional duration prop
}

const Snackbar: React.FC<SnackbarProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 3000 
}) => {
  // Auto-close after duration if specified
  React.useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Determine background color based on type
  const bgColor = {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#eab308',
    info: '#3b82f6',
  }[type];

  return (
    <div className={`text-white p-4 rounded-md fixed bottom-20 right-4 flex justify-between items-center shadow-lg`} style={{
      backgroundColor:bgColor,
      zIndex:"9999999999999"
    }}>
      {message}
      <button 
        className="text-white ml-4 focus:outline-none"
        onClick={onClose}
        aria-label="Close snackbar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Snackbar;