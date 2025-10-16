import { createContext, useContext } from 'react';
import type { Venue } from '../types/venue.types';
import type { Event } from '../types/event.types';

interface AppContextType {
  selectedVenue: Venue | null;
  selectedEvent: Event | null;
  setSelectedVenue: (venue: Venue | null) => void;
  setSelectedEvent: (event: Event | null) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};