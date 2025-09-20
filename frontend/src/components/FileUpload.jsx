
import React, { useRef } from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess, setIsLoading, setError }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null); // Clear previous errors

    const formData = new FormData();
    formData.append('document', file); // 'document' must match the field name in backend's fileUpload middleware

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUploadSuccess(response.data);
    } catch (err) {
      console.error('File upload error:', err);
      setError(err.response?.data?.error || 'Failed to upload file.');
    } finally {
      setIsLoading(false);
      // Clear the file input value to allow re-uploading the same file
      event.target.value = null;
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
