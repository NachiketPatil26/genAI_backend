
import { useState } from 'react';
import { getRisk } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const RiskRadarTab = ({ text, results, setAnalysisResults, setError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getRisk(text);
      setAnalysisResults(prev => ({ ...prev, risks: res.data.risks }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze risks.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level.toUpperCase()) {
      case 'HIGH': return 'border-red-500 bg-red-50';
      case 'MEDIUM': return 'border-yellow-500 bg-yellow-50';
      case 'LOW': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div>
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 mb-4"
      >
        {isLoading ? 'Analyzing...' : 'Analyze for Risks'}
      </button>
      {isLoading && <LoadingSpinner />}
      {results && (
        <div className="space-y-4">
          {results.map((item, index) => (
            <div key={index} className={`p-3 rounded-lg border-l-4 ${getRiskColor(item.riskLevel)}`}>
              <p className="font-semibold text-gray-800">{item.clause}</p>
              <p className="text-sm text-gray-600 mt-1"><span className="font-bold">Reason:</span> {item.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiskRadarTab;
