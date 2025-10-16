import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Venue } from '../types/venue.types';

interface VenueSelectorProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onVenueChange: (venue: Venue | null) => void;
}

export const VenueSelector: React.FC<VenueSelectorProps> = ({
  venues,
  selectedVenue,
  onVenueChange,
}) => {
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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Venue
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
      >
        <span className="text-gray-900">
          {selectedVenue ? selectedVenue.name : 'All Venues'}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          <button
            onClick={() => {
              onVenueChange(null);
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="font-medium text-gray-900">All Venues</div>
            <div className="text-sm text-gray-500">Show all events</div>
          </button>
          {venues.map((venue) => (
            <button
              key={venue.id}
              onClick={() => {
                onVenueChange(venue);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{venue.name}</div>
              <div className="text-sm text-gray-500">
                {venue.city?.name}, {venue.state?.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};