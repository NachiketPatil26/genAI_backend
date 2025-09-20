
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
});

// Centralized error handling can be added here with interceptors if needed

export const uploadDocument = (formData) => {
  return apiClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getJargon = (text) => {
  return apiClient.post('/jargon', { text });
};

export const getRisk = (text) => {
  return apiClient.post('/risk-radar', { text });
};

export const translateText = (text, targetLanguage) => {
  return apiClient.post('/translate', { text, targetLanguage });
};

export const getVisualizationData = (text) => {
  return apiClient.post('/visualize', { text });
};

export const chatWithDocument = (documentContext, question) => {
  return apiClient.post('/chat', { documentContext, question });
};
