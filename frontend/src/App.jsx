import { useState } from 'react';
import FileUpload from './components/FileUpload';
import DocumentViewer from './components/DocumentViewer';
import AnalysisPanel from './components/AnalysisPanel';
import FloatingChatbot from './components/FloatingChatbot';
import ChatModal from './components/ChatModal';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [documentData, setDocumentData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleUploadSuccess = (data) => {
    console.log('Received data from upload:', data);
    setDocumentData(data);
    console.log('documentData after set:', data); // Log the data directly as state update is async
    setAnalysisResults({}); // Reset previous results
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Legal Document Demystifier</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!documentData ? (
          <div className="p-8 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Upload Your Document</h2>
            <p className="text-gray-600 mb-6">
              Upload a document (PDF or TXT) to get started. The AI will extract the text and prepare it for analysis.
            </p>
            <FileUpload
              onUploadSuccess={handleUploadSuccess}
              setIsLoading={setIsLoading}
              setError={setError}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DocumentViewer
              text={documentData.extractedText}
              jargon={analysisResults.jargon || []}
              risks={analysisResults.risks || []}
            />
            <AnalysisPanel
              documentText={documentData.extractedText}
              setAnalysisResults={setAnalysisResults}
              analysisResults={analysisResults}
              setError={setError}
              documentId={documentData._id} // Pass documentId here
            />
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      </main>

      {documentData && (
        <>
          <FloatingChatbot onClick={() => setIsChatOpen(true)} />
          <ChatModal
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            documentContext={documentData.extractedText}
          />
        </>
      )}
    </div>
  );
}

export default App;