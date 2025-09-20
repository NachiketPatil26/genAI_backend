import React, { useState } from "react";
import FileUpload from "./FileUpload.jsx";

export default function LegalEaseDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [analysisResults, setAnalysisResults] = useState({});

  const [recentDocs, setRecentDocs] = useState([
    { title: "Employment Agreement", time: "Processed 2 hours ago", status: "Complete" },
    { title: "Service Agreement", time: "Processed 5 hours ago", status: "Complete" },
    { title: "Lease Agreement", time: "Processing...", status: "In Progress" },
  ]);

  const stats = [
    { title: "Documents Processed", value: "247", change: "+12%" },
    { title: "Avg. Processing Time", value: "1.2h", change: "-23%" },
    { title: "Clarity Score", value: "94%", change: "+5%" },
    { title: "User Insights", value: "35 Redactions, 12 Translations", change: "" },
  ];

  const handleUploadSuccess = (data) => {
    console.log('Received data from upload:', data);
    setDocumentData(data);
    setAnalysisResults({}); // Reset previous results
    setError(null);
    setRecentDocs(prevDocs => [
        { title: data.filename || "New Document", time: "Just now", status: "Processing..." }, 
        ...prevDocs
    ]);
    setActiveTab("Dashboard");
  };

  return (
   <div className={darkMode ? "bg-gray-900 text-white h-screen flex" : "bg-gray-50 text-gray-900 h-screen flex"}>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600">LegalEase</h1>
        <nav className="space-y-2 mt-8 flex-1">
          {["Dashboard", "Upload", "Documents", "Chat Assistant", "Bookmarks", "Policy", "Settings"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  activeTab === tab 
                  ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900/50 dark:text-white" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
        <div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"
          >
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">

        {/* Show Dashboard View */}
        {activeTab === "Dashboard" && (
            <>
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow flex flex-col space-y-2"
                    >
                        <span className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</span>
                        <span className="text-xl font-semibold">{stat.value}</span>
                        <span className="text-green-600 text-sm">{stat.change}</span>
                    </div>
                    ))}
                </div>

                {/* Recent Documents */}
                <section className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Recent Documents</h2>
                    <button className="text-blue-600">View All</button>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow divide-y dark:divide-gray-700">
                    {recentDocs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4">
                        <div>
                            <p className="font-medium">{doc.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{doc.time}</p>
                        </div>
                        <span
                            className={`px-3 py-1 text-sm rounded-full ${
                            doc.status === "Complete"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                            }`}
                        >
                            {doc.status}
                        </span>
                        </div>
                    ))}
                    </div>
                </section>
            </>
        )}
        
        {/* Show Upload View */}
        {activeTab === 'Upload' && (
          <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Upload Your Document</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Upload a document (PDF or TXT) to get started. The AI will extract the text and prepare it for analysis.</p>
            {/* Show loading/error messages */}
            {isLoading && <div className="mb-4 text-blue-600">Uploading...</div>}
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <FileUpload 
              onUploadSuccess={handleUploadSuccess} 
              setIsLoading={setIsLoading}
              setError={setError}
            />
          </section>
        )}

        {/* Show Chat Assistant View */}
        {activeTab === "Chat Assistant" && (
          <section className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow flex flex-col space-y-4 h-[calc(100%-2rem)]">
            <div className="flex-1 overflow-y-auto border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <p className="text-gray-500">Chat messages appear here...</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask something..."
                className="flex-1 border dark:border-gray-700 rounded-lg px-4 py-2 bg-transparent"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Send</button>
              <button className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">🎤</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
