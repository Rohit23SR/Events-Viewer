import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateFormatter';
import type { Event } from '../types/event.types';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const venue = event._embedded?.venues?.[0];
  const startDate = event.dates?.start?.dateTime;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-200 hover:border-blue-400"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          {startDate && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
              <span>{formatDate(startDate)}</span>
            </div>
          )}

          {startDate && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
              <span>{formatTime(startDate)}</span>
            </div>
          )}

          {venue && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
              <span className="line-clamp-1">
                {venue.name}
                {venue.city?.name && `, ${venue.city.name}`}
              </span>
            </div>
          )}
        </div>

        {event.info && (
          <p className="mt-4 text-sm text-gray-500 line-clamp-2">{event.info}</p>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <span className="text-sm text-blue-600 font-medium">View Details →</span>
      </div>
    </div>
  );
};