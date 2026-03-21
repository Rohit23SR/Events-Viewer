import { memo } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { formatDate, formatTime } from '../utils/dateFormatter'
import type { Event } from '../types/event.types'

interface EventCardProps {
  event: Event
  onClick: () => void
}

/**
 * Card component displaying event summary information
 * @param event - The event to display
 * @param onClick - Callback when card is clicked
 */
const EventCardComponent = ({ event, onClick }: EventCardProps) => {
  const venue = event._embedded?.venues?.[0]
  const startDate = event.dates?.start?.dateTime

  return (
    <div
      onClick={onClick}
      className="animate-fade-in cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:border-blue-400 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
    >
      <div className="p-6">
        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 dark:text-gray-100">
          {event.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {startDate && (
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <span>{formatDate(startDate)}</span>
            </div>
          )}

          {startDate && (
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <span>{formatTime(startDate)}</span>
            </div>
          )}

          {venue && (
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <span className="line-clamp-1">
                {venue.name}
                {venue.city?.name && `, ${venue.city.name}`}
              </span>
            </div>
          )}
        </div>

        {event.info && (
          <p className="mt-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{event.info}</p>
        )}
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-600 dark:bg-gray-700">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">View Details →</span>
      </div>
    </div>
  )
}

export const EventCard = memo(EventCardComponent)
