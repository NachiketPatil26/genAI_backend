import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Legal Document Demystifier</h1>
        </div>
      </header>

      <div className="h-screen">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;