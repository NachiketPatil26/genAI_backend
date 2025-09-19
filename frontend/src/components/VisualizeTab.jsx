
import { useState } from 'react';
import { getVisualizationData } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const VisualizeTab = ({ text, results, setAnalysisResults, setError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getVisualizationData(text);
      setAnalysisResults(prev => ({ ...prev, visualization: res.data }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate visualization.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderChart = (data, type) => {
    if (!data || data.length === 0) return <p className="text-center text-gray-500">No data to display.</p>;

    // Intelligent chart selection (simplified)
    if (type === 'categorical' && data.length > 3) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div>
      <button
        onClick={handleAnalyze}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 mb-4"
      >
        {isLoading ? 'Generating...' : 'Generate Visualization'}
      </button>
      {isLoading && <LoadingSpinner />}
      {results && (
        <div className="space-y-8">
          <div>
            <h4 className="text-md font-semibold mb-2 text-center">Clause Categories</h4>
            {renderChart(results.clauseCategories, 'categorical')}
          </div>
          <div>
            <h4 className="text-md font-semibold mb-2 text-center">Risk Distribution</h4>
            {renderChart(results.riskDistribution, 'categorical')}
          </div>
          {results.complexity && (
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <h4 className="text-md font-semibold">Document Complexity</h4>
              <p className="text-2xl font-bold text-blue-600">{results.complexity.score} / 100</p>
              <p className="text-sm text-gray-600">Readability: {results.complexity.readabilityLevel}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VisualizeTab;
