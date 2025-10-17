import { apiClient } from './client';
import { FALLBACK_DATA } from '../constants/fallbackData';
import type { ApiResponse, FetchEventsResult } from '../types/api.types';

export const fetchEvents = async (): Promise<FetchEventsResult> => {
  try {
    // Use CORS proxy to bypass CORS restrictions
    let API_URL: string;
    
    if (process.env.NODE_ENV === 'development') {
      // In development, use proxy path
      API_URL = '/api/events/event-data.json';
    } else {
      // In production, use CORS proxy
      const TEG_URL = 'https://teg-coding-challenge.s3.ap-southeast-2.amazonaws.com/events/event-data.json';
      API_URL = `https://corsproxy.io/?${encodeURIComponent(TEG_URL)}`;
    }
    
    console.log('Attempting to fetch from:', API_URL);
    
    const rawData = await apiClient.get<any>(API_URL);
    
    console.log('✅ API call successful! Raw data:', rawData);
    
    // Check what structure the data actually has
    if (!rawData) {
      console.error('❌ No data returned from API');
      throw new Error('No data returned');
    }
    
    // The API might return data in a different structure
    // Let's check for different possible structures
    let events = null;
    let venues = null;
    
    // Check if data is directly an array (just events)
    if (Array.isArray(rawData)) {
      console.log('Data is directly an array of events');
      events = rawData;
    }
    // Check if data has events property
    else if (rawData.events && Array.isArray(rawData.events)) {
      console.log('Data has events property');
      events = rawData.events;
      venues = rawData.venues;
    }
    // Check if data is wrapped in _embedded (Ticketmaster format)
    else if (rawData._embedded?.events) {
      console.log('Data is in _embedded format');
      events = rawData._embedded.events;
    }
    // Check if data has a different structure
    else {
      console.error('❌ Unknown data structure:', Object.keys(rawData));
      console.error('Full data:', rawData);
      throw new Error('Unknown data structure');
    }

    if (!events || !Array.isArray(events)) {
      console.error('❌ No valid events array found');
      throw new Error('No valid events array');
    }

    console.log(`Found ${events.length} events to transform`);

    // Transform API data to match our expected format
    const transformedEvents = events.map((event: any, index: number) => {
      try {
        // Find the venue for this event (if venues exist)
        const venue = venues?.find((v: any) => v.id === event.venueId);
        
        // Handle different date formats
        const eventDate = event.startDate || event.dates?.start?.dateTime || event.dateTime || '';
        
        const transformed = {
          id: event.id?.toString() || `event-${index}`,
          name: event.name || event.title || 'Unnamed Event',
          dates: {
            start: {
              dateTime: eventDate
            },
            timezone: venue?.timezone || event.timezone || undefined
          },
          info: event.description || event.info || undefined,
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
              postalCode: venue.postcode || venue.postalCode || undefined,
              timezone: venue.timezone || undefined
            }]
          } : undefined
        };
        
        return transformed;
      } catch (err) {
        console.error(`Error transforming event ${index}:`, err, event);
        throw err;
      }
    });
    
    const transformedData: ApiResponse = {
      _embedded: {
        events: transformedEvents
      }
    };
    
    console.log('✅ Successfully transformed', transformedEvents.length, 'events from API');
    console.log('First transformed event:', transformedEvents[0]);
    console.log('Returning with isFallback: false');
    
    return { data: transformedData, isFallback: false };
    
  } catch (error) {
    // If API fails, use fallback data
    console.error('❌ API fetch or transform failed:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    console.warn('Using fallback data instead');
    return { data: FALLBACK_DATA, isFallback: true };
  }
};