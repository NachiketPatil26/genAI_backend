
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center z-50">
      <AlertTriangle className="mr-2" />
      <span className="block sm:inline">{message}</span>
      <button onClick={onClose} className="ml-4 text-red-500 hover:text-red-800">&times;</button>
    </div>
  );
};

export default ErrorMessage;
