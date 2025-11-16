import { useState, useEffect, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Venue } from '../types/venue.types';

interface VenueSelectorProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onVenueChange: (venue: Venue | null) => void;
}

/**
 * Dropdown selector for filtering events by venue
 */
const VenueSelectorComponent = ({
  venues,
  selectedVenue,
  onVenueChange,
}: VenueSelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.venue-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative venue-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-left flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-500 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <span className="text-gray-900 dark:text-gray-100">
          {selectedVenue ? selectedVenue.name : 'All Venues'}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-y-auto animate-fade-in">
          <button
            onClick={() => {
              onVenueChange(null);
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700"
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">All Venues</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Show all events</div>
          </button>
          {venues.map((venue) => (
            <button
              key={venue.id}
              onClick={() => {
                onVenueChange(venue);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
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
  );
};

export const VenueSelector = memo(VenueSelectorComponent);