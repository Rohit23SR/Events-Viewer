import { useEffect } from 'react';
import { Calendar, Clock, MapPin, X, Globe, Info } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateFormatter';
import type { Event } from '../types/event.types';

interface EventDetailProps {
  event: Event;
  onClose: () => void;
}

export const EventDetail = ({ event, onClose }: EventDetailProps) => {
  console.log('Event Detail Data:', event); // Debug log
  
  const venue = event._embedded?.venues?.[0];
  const startDate = event.dates?.start?.dateTime;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Event Name */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {event.name || '-'}
            </h3>
          </div>

          {/* Information Grid */}
          <div className="space-y-4">
            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  Date
                </div>
                <div className="text-gray-900 pl-6">
                  {startDate ? formatDate(startDate) : '-'}
                </div>
              </div>

              <div>
                <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  Time
                </div>
                <div className="text-gray-900 pl-6">
                  {startDate ? formatTime(startDate) : '-'}
                </div>
              </div>
            </div>

            {/* Venue Name */}
            <div>
              <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                Venue
              </div>
              <div className="text-gray-900 pl-6">
                {venue?.name || '-'}
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                Location
              </div>
              <div className="text-gray-900 pl-6">
                {venue?.address?.line1 ? (
                  <>
                    <div>{venue.address.line1}</div>
                    {venue.address?.line2 && <div>{venue.address.line2}</div>}
                    <div>
                      {venue.city?.name || '-'}, {venue.state?.name || '-'}
                      {venue.postalCode && ` ${venue.postalCode}`}
                    </div>
                  </>
                ) : (
                  '-'
                )}
              </div>
            </div>

            {/* Timezone */}
            <div>
              <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 mr-2 text-purple-600" />
                Timezone
              </div>
              <div className="text-gray-900 pl-6">
                {event.dates?.timezone || '-'}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Info className="w-4 h-4 mr-2 text-orange-600" />
                Description
              </div>
              <div className="text-gray-900 pl-6 whitespace-pre-wrap">
                {event.info || '-'}
              </div>
            </div>

            {/* Event Type - Only show if exists */}
            {event.type && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2 pl-6">
                  Event Type
                </div>
                <div className="text-gray-900 pl-6">
                  {event.type}
                </div>
              </div>
            )}

            {/* Status - Only show if exists */}
            {event.dates?.status?.code && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2 pl-6">
                  Status
                </div>
                <div className="pl-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    event.dates.status.code === 'onsale' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.dates.status.code}
                  </span>
                </div>
              </div>
            )}

            {/* Please Note - Only show if exists */}
            {event.pleaseNote && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2 pl-6">
                  Please Note
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 ml-6">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {event.pleaseNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};