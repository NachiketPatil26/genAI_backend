
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { uploadDocument } from '../services/api';

const FileUpload = ({ onUploadSuccess, setIsLoading, setError }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      setError('File type not accepted. Please upload a PDF or TXT file.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await uploadDocument(formData);
      onUploadSuccess(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'An unknown error occurred during upload.';
      setError(errorMsg);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [onUploadSuccess, setIsLoading, setError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
      `}
    >
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      {isDragActive ? (
        <p className="text-lg font-medium text-blue-600">Drop the file here ...</p>
      ) : (
        <>
          <p className="text-lg font-medium">Drag & drop a document here, or click to select</p>
          <p className="text-sm text-gray-500 mt-1">Supports: PDF, TXT (Max 10MB)</p>
        </>
      )}
    </div>
  );
};

export default FileUpload;
