import { useState } from 'react';
import JargonTab from './JargonTab';
import RiskRadarTab from './RiskRadarTab';
import TranslateTab from './TranslateTab';
import VisualizeTab from './VisualizeTab';

const TABS = ['Jargon', 'Risk Radar', 'Translate', 'Visualize'];

const AnalysisPanel = ({ documentText, setAnalysisResults, analysisResults, setError }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Jargon':
        return <JargonTab text={documentText} results={analysisResults.jargon} setAnalysisResults={setAnalysisResults} setError={setError} />;
      case 'Risk Radar':
        return <RiskRadarTab text={documentText} results={analysisResults.risks} setAnalysisResults={setAnalysisResults} setError={setError} />;
      case 'Translate':
        return <TranslateTab text={documentText} results={analysisResults.translation} setAnalysisResults={setAnalysisResults} setError={setError} />;
      case 'Visualize':
        return <VisualizeTab text={documentText} results={analysisResults.visualization} setAnalysisResults={setAnalysisResults} setError={setError} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow h-[70vh] flex flex-col">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6 overflow-y-auto flex-grow">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AnalysisPanel;