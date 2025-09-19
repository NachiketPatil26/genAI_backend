
import React, { useRef } from 'react';

const FileUpload = ({ onUploadSuccess, setIsLoading, setError }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // Here you would typically handle the file upload, e.g.,
      // call an API, set loading state, etc.
      // For now, just logging.
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Choose File
      </button>
      <p className="mt-2 text-gray-500">or drag and drop here</p>
    </div>
  );
};

export default FileUpload;
