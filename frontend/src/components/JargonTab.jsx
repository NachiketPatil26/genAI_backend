
import { useState } from 'react';
import { getJargon } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const JargonTab = ({ text, results, setAnalysisResults, setError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getJargon(text);
      setAnalysisResults(prev => ({ ...prev, jargon: res.data.jargon }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze jargon.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 mb-4"
      >
        {isLoading ? 'Analyzing...' : 'Analyze for Jargon'}
      </button>
      {isLoading && <LoadingSpinner />}
      {results && (
        <div className="space-y-4">
          {results.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg border">
              <p className="font-semibold text-blue-800">{item.term}</p>
              <p className="text-sm text-gray-600">{item.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JargonTab;
