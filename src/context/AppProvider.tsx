import React, { useState, ReactNode } from 'react';
import { AppContext } from './AppContext';
import type { Venue } from '../types/venue.types';
import type { Event } from '../types/event.types';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const contextValue = {
    selectedVenue,
    selectedEvent,
    setSelectedVenue,
    setSelectedEvent,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};