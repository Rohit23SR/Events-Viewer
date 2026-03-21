import { useState, useEffect, memo } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Venue } from '../types/venue.types'

interface VenueSelectorProps {
  venues: Venue[]
  selectedVenue: Venue | null
  onVenueChange: (venue: Venue | null) => void
}

/**
 * Dropdown selector for filtering events by venue
 */
const VenueSelectorComponent = ({ venues, selectedVenue, onVenueChange }: VenueSelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest('.venue-selector')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div className="venue-selector relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left transition-colors hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500"
      >
        <span className="text-gray-900 dark:text-gray-100">
          {selectedVenue ? selectedVenue.name : 'All Venues'}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform dark:text-gray-500 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 max-h-64 w-full animate-fade-in overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <button
            onClick={() => {
              onVenueChange(null)
              setIsOpen(false)
            }}
            className="w-full border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">All Venues</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Show all events</div>
          </button>
          {venues.map((venue) => (
            <button
              key={venue.id}
              onClick={() => {
                onVenueChange(venue)
                setIsOpen(false)
              }}
              className="w-full border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <div className="font-medium text-gray-900 dark:text-gray-100">{venue.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {venue.city?.name}, {venue.state?.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const VenueSelector = memo(VenueSelectorComponent)
