import { memo } from 'react'
import { RefreshCw } from 'lucide-react'

/**
 * Loading indicator component
 */
const LoadingSpinnerComponent = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="animate-fade-in text-center">
      <RefreshCw className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
      <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
    </div>
  </div>
)

export const LoadingSpinner = memo(LoadingSpinnerComponent)
