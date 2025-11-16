import { ErrorBoundary } from './components/ErrorBoundary';
import { AppProvider } from './context/AppProvider';
import { ThemeProvider } from './context/ThemeContext';
import { EventList } from './components/EventList';
import { ThemeToggle } from './components/ThemeToggle';

/**
 * Root application component
 * Provides error boundary, theme context, and app state management
 */
const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      Events Viewer
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Browse and discover upcoming events
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <EventList />
          </div>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;