import { ErrorBoundary } from './components/ErrorBoundary'
import { AppProvider } from './context/AppProvider'
import { ThemeProvider } from './context/ThemeContext'
import { EventList } from './components/EventList'
import { ThemeToggle } from './components/ThemeToggle'

/**
 * Root application component
 * Provides error boundary, theme context, and app state management
 */
const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppProvider>
          <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      Events Viewer
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
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
  )
}

export default App
