import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppProvider } from './context/AppProvider';
import { EventList } from './components/EventList';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-3xl font-bold text-gray-900">Events Viewer</h1>
              <p className="text-gray-600 mt-1">
                Browse and discover upcoming events
              </p>
            </div>
          </header>
          <EventList />
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;