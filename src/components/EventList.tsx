import React, { useMemo } from 'react';
import { Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { EventCard } from './EventCard';
import { LoadingSpinner } from './LoadingSpinner';
import { VenueSelector } from './VenueSelector';
import { EventDetail } from './EventDetail';
import { useAppContext } from '../context/AppContext';
import { useEventsData } from '../hooks/useEventsData';
import type { Event, Venue } from '../types/event.types';

export const EventList: React.FC = () => {
  const { selectedVenue, selectedEvent, setSelectedVenue, setSelectedEvent } = useAppContext();
  const { data, isLoading, isError, error, refetch, isFallback } = useEventsData();

  const venues = useMemo<Venue[]>(() => {
    if (!data?._embedded?.events) return [];

    const venueMap = new Map<string, Venue>();
    data._embedded.events.forEach((event: Event) => {
      const eventVenues = event._embedded?.venues || [];
      eventVenues.forEach((venue: Venue) => {
        if (venue.id && !venueMap.has(venue.id)) {
          venueMap.set(venue.id, venue);
        }
      });
    });

    return Array.from(venueMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  const filteredEvents = useMemo<Event[]>(() => {
    if (!data?._embedded?.events) return [];

    if (!selectedVenue) return data._embedded.events;

    return data._embedded.events.filter((event: Event) => {
      const eventVenues = event._embedded?.venues || [];
      return eventVenues.some((venue: Venue) => venue.id === selectedVenue.id);
    });
  }, [data, selectedVenue]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Error Loading Events
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {error?.message || 'Unable to load events. Please try again.'}
          </p>
          <button
            onClick={() => refetch()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isFallback && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-1">Using Fallback Data</h3>
            <p className="text-sm text-yellow-700">
              Unable to connect to the live event source. Displaying sample events to demonstrate functionality.
            </p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <VenueSelector
          venues={venues}
          selectedVenue={selectedVenue}
          onVenueChange={setSelectedVenue}
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {selectedVenue ? `Events at ${selectedVenue.name}` : 'All Events'}
        </h2>
        <span className="text-sm text-gray-600">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">
            {selectedVenue
              ? 'No events available at this venue.'
              : 'No events available at the moment.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </main>
  );
};