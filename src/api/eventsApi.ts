import { apiClient } from './client';
import { FALLBACK_DATA } from '../constants/fallbackData';
import type { ApiResponse, FetchEventsResult } from '../types/api.types';

export const fetchEvents = async (): Promise<FetchEventsResult> => {
  try {
    const rawData = await apiClient.get<any>();
    
    console.log('Raw API Response:', rawData);
    
    if (!rawData?.events || !Array.isArray(rawData.events)) {
      throw new Error('Invalid data format');
    }

    // Transform API data to match our expected format
    const transformedEvents = rawData.events.map((event: any) => {
      // Find the venue for this event
      const venue = rawData.venues?.find((v: any) => v.id === event.venueId);
      
      return {
        id: event.id?.toString() || '',
        name: event.name || '',
        dates: {
          start: {
            dateTime: event.startDate || ''
          },
          timezone: venue?.timezone || undefined
        },
        info: event.description || undefined,
        type: event.type || undefined,
        _embedded: venue ? {
          venues: [{
            id: venue.id?.toString() || '',
            name: venue.name || '',
            city: venue.city ? { name: venue.city } : undefined,
            state: venue.state ? { name: venue.state } : undefined,
            address: {
              line1: venue.address || undefined
            },
            postalCode: venue.postcode || undefined,
            timezone: venue.timezone || undefined
          }]
        } : undefined
      };
    });
    
    const transformedData: ApiResponse = {
      _embedded: {
        events: transformedEvents
      }
    };
    
    console.log('Successfully loaded', transformedEvents.length, 'events');
    return { data: transformedData, isFallback: false };
    
  } catch (error) {
    console.error('API fetch failed:', error);
    console.warn('Using fallback data');
    return { data: FALLBACK_DATA, isFallback: true };
  }
};