import { useEffect, memo } from 'react'
import { Calendar, Clock, MapPin, X, Globe, Info } from 'lucide-react'
import { formatDate, formatTime } from '../utils/dateFormatter'
import type { Event } from '../types/event.types'

interface EventDetailProps {
  event: Event
  onClose: () => void
}

/**
 * Modal component displaying detailed event information
 * @param event - The event to display
 * @param onClose - Callback to close the modal
 */
const EventDetailComponent = ({ event, onClose }: EventDetailProps) => {
  const venue = event._embedded?.venues?.[0]
  const startDate = event.dates?.start?.dateTime

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black bg-opacity-50 p-4 dark:bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl animate-slide-up overflow-y-auto rounded-lg bg-white shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Event Name */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {event.name || '-'}
            </h3>
          </div>

          {/* Information Grid */}
          <div className="space-y-4">
            {/* Date & Time */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Calendar className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Date
                </div>
                <div className="pl-6 text-gray-900 dark:text-gray-100">
                  {startDate ? formatDate(startDate) : '-'}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Clock className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Time
                </div>
                <div className="pl-6 text-gray-900 dark:text-gray-100">
                  {startDate ? formatTime(startDate) : '-'}
                </div>
              </div>
            </div>

            {/* Venue Name */}
            <div>
              <div className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                Venue
              </div>
              <div className="pl-6 text-gray-900 dark:text-gray-100">{venue?.name || '-'}</div>
            </div>

            {/* Location */}
            <div>
              <div className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                Location
              </div>
              <div className="pl-6 text-gray-900 dark:text-gray-100">
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
              <div className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Globe className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                Timezone
              </div>
              <div className="pl-6 text-gray-900 dark:text-gray-100">
                {event.dates?.timezone || '-'}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Info className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                Description
              </div>
              <div className="whitespace-pre-wrap pl-6 text-gray-900 dark:text-gray-100">
                {event.info || '-'}
              </div>
            </div>

            {/* Event Type - Only show if exists */}
            {event.type && (
              <div>
                <div className="mb-2 pl-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Type
                </div>
                <div className="pl-6 text-gray-900 dark:text-gray-100">{event.type}</div>
              </div>
            )}

            {/* Status - Only show if exists */}
            {event.dates?.status?.code && (
              <div>
                <div className="mb-2 pl-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </div>
                <div className="pl-6">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm ${
                      event.dates.status.code === 'onsale'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {event.dates.status.code}
                  </span>
                </div>
              </div>
            )}

            {/* Please Note - Only show if exists */}
            {event.pleaseNote && (
              <div>
                <div className="mb-2 pl-6 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Please Note
                </div>
                <div className="ml-6 border-l-4 border-yellow-400 bg-yellow-50 p-3 dark:border-yellow-500 dark:bg-yellow-900/20">
                  <p className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100">
                    {event.pleaseNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-600 dark:bg-gray-700">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export const EventDetail = memo(EventDetailComponent)
