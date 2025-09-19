
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
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
