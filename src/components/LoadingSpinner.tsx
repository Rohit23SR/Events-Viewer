import { memo } from 'react';
import { RefreshCw } from 'lucide-react';

/**
 * Loading indicator component
 */
const LoadingSpinnerComponent = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center animate-fade-in">
      <RefreshCw className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
    </div>
  </div>
);

export const LoadingSpinner = memo(LoadingSpinnerComponent);