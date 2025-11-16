import { memo } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateFormatter';
import type { Event } from '../types/event.types';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

/**
 * Card component displaying event summary information
 * @param event - The event to display
 * @param onClick - Callback when card is clicked
 */
const EventCardComponent = ({ event, onClick }: EventCardProps) => {
  const venue = event._embedded?.venues?.[0];
  const startDate = event.dates?.start?.dateTime;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 animate-fade-in"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
          {event.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {startDate && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{formatDate(startDate)}</span>
            </div>
          )}

          {startDate && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>{formatTime(startDate)}</span>
            </div>
          )}

          {venue && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="line-clamp-1">
                {venue.name}
                {venue.city?.name && `, ${venue.city.name}`}
              </span>
            </div>
          )}
        </div>

        {event.info && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{event.info}</p>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">View Details →</span>
      </div>
    </div>
  );
};

export const EventCard = memo(EventCardComponent);