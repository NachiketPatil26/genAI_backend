// frontend/src/components/SentimentAnalysisTab.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

const SentimentAnalysisTab = ({ documentId }) => {
  const [sentimentResults, setSentimentResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSentimentAnalysis = async () => {
      if (!documentId) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/document/${documentId}/sentiment`,
        );
        setSentimentResults(response.data.sentiment);
      } catch (err) {
        console.error('Error fetching sentiment analysis:', err);
        setError(err.response?.data?.error || 'Failed to fetch sentiment analysis.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSentimentAnalysis();
  }, [documentId]);

  const getTrustworthiness = (score) => {
    if (score > 0.5) return 'Very Trustworthy';
    if (score > 0.1) return 'Generally Trustworthy';
    if (score > -0.1) return 'Neutral';
    if (score > -0.5) return 'Potentially Untrustworthy';
    return 'Highly Untrustworthy';
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onClose={() => setError(null)} />;
  }

  if (!sentimentResults) {
    return <p className="text-gray-600">Select a document to view sentiment analysis.</p>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Document Trustworthiness Analysis</h3>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h4 className="text-md font-medium mb-2">Overall Sentiment</h4>
        {sentimentResults ? (
          <p>
            Trustworthiness: <span className="font-bold">{getTrustworthiness(sentimentResults.score)}</span>
            <br />
            Sentiment Score: <span className="font-bold">{sentimentResults.score.toFixed(2)}</span> (Range: -1.0 to 1.0, where 1.0 is positive sentiment)
            <br />
            Magnitude: <span className="font-bold">{sentimentResults.magnitude.toFixed(2)}</span> (Overall emotional force/intensity)
          </p>
        ) : (
          <p>No sentiment data available.</p>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalysisTab;
