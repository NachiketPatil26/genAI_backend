
import { useState } from 'react';
import { translateText } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const TranslateTab = ({ text, results, setAnalysisResults, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('Spanish');

  const handleTranslate = async () => {
    if (!targetLanguage) {
      setError('Please specify a target language.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await translateText(text, targetLanguage);
      setAnalysisResults(prev => ({ ...prev, translation: res.data.translatedText }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to translate text.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          placeholder="Enter target language (e.g., Spanish)"
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleTranslate}
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
      {results && (
        <div className="p-3 bg-gray-50 rounded-lg border">
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">{results}</pre>
        </div>
      )}
    </div>
  );
};

export default TranslateTab;
