
import React from 'react';

const ChatModal = ({ isOpen, onClose, documentContext }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg h-3/4 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Chat with Document</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          <p className="text-gray-500">Chat interface will be implemented here.</p>
        </div>
        <div className="p-4 border-t">
          <input
            type="text"
            placeholder="Ask a question..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
