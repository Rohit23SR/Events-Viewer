import { apiClient } from './client';
import { FALLBACK_DATA } from '../constants/fallbackData';
import { getApiUrl } from '../config/env';
import { logger } from '../utils/logger';
import type { ApiResponse, FetchEventsResult } from '../types/api.types';
import type { Event, Venue } from '../types/event.types';

/**
 * Fetches events from the API with automatic fallback to sample data
 * @returns Promise containing event data and fallback status
 */
export const fetchEvents = async (): Promise<FetchEventsResult> => {
  try {
    const API_URL = getApiUrl();

    logger.debug('Attempting to fetch from:', API_URL);

    const rawData = await apiClient.get<unknown>(API_URL);

    logger.debug('API call successful! Raw data:', rawData);

    if (!rawData) {
      logger.error('No data returned from API');
      throw new Error('No data returned');
    }

    const { events, venues } = parseApiResponse(rawData);

    if (!events || !Array.isArray(events)) {
      logger.error('No valid events array found');
      throw new Error('No valid events array');
    }

    logger.debug(`Found ${events.length} events to transform`);

    const transformedEvents = transformEvents(events, venues);

    const transformedData: ApiResponse = {
      _embedded: {
        events: transformedEvents
      }
    };

    logger.info('Successfully transformed', transformedEvents.length, 'events from API');

    return { data: transformedData, isFallback: false };

  } catch (error) {
    logger.error('API fetch or transform failed:', error);
    logger.warn('Using fallback data instead');
    return { data: FALLBACK_DATA, isFallback: true };
  }
};

/**
 * Parses the API response to extract events and venues
 * Supports multiple data formats for compatibility
 */
const parseApiResponse = (rawData: unknown): { events: unknown[] | null; venues: unknown[] | null } => {
  let events: unknown[] | null = null;
  let venues: unknown[] | null = null;

  if (Array.isArray(rawData)) {
    logger.debug('Data is directly an array of events');
    events = rawData;
  } else if (typeof rawData === 'object' && rawData !== null) {
    const data = rawData as Record<string, unknown>;

    if (data.events && Array.isArray(data.events)) {
      logger.debug('Data has events property');
      events = data.events;
      venues = Array.isArray(data.venues) ? data.venues : null;
    } else if (data._embedded && typeof data._embedded === 'object' && data._embedded !== null) {
      const embedded = data._embedded as Record<string, unknown>;
      if (Array.isArray(embedded.events)) {
        logger.debug('Data is in _embedded format');
        events = embedded.events;
      }
    } else {
      logger.error('Unknown data structure:', Object.keys(data));
      throw new Error('Unknown data structure');
    }
  } else {
    throw new Error('Invalid data format');
  }

  return { events, venues };
};

/**
 * Transforms raw event data into the application's Event format
 */
const transformEvents = (events: unknown[], venues: unknown[] | null): Event[] => {
  return events.map((event: unknown, index: number) => {
    try {
      const eventData = event as Record<string, unknown>;
      const venueData = findVenueForEvent(eventData, venues);

      const eventDate = getEventDate(eventData);

      const transformedEvent: Event = {
        id: eventData.id?.toString() || `event-${index}`,
        name: (eventData.name as string) || (eventData.title as string) || 'Unnamed Event',
        dates: {
          start: {
            dateTime: eventDate
          },
          timezone: (venueData?.timezone as string) || (eventData.timezone as string) || undefined
        },
        info: (eventData.description as string) || (eventData.info as string) || undefined,
        type: (eventData.type as string) || undefined,
        _embedded: venueData ? {
          venues: [formatVenue(venueData)]
        } : undefined
      };

      return transformedEvent;
    } catch (err) {
      logger.error(`Error transforming event ${index}:`, err);
      throw err;
    }
  });
};

/**
 * Finds the venue associated with an event
 */
const findVenueForEvent = (event: Record<string, unknown>, venues: unknown[] | null): Record<string, unknown> | null => {
  if (!venues || !event.venueId) return null;
  return venues.find((v: unknown) => {
    const venue = v as Record<string, unknown>;
    return venue.id === event.venueId;
  }) as Record<string, unknown> | null;
};

/**
 * Extracts the event date from various possible formats
 */
const getEventDate = (event: Record<string, unknown>): string => {
  if (typeof event.startDate === 'string') return event.startDate;

  const dates = event.dates as Record<string, unknown> | undefined;
  if (dates?.start && typeof dates.start === 'object' && dates.start !== null) {
    const start = dates.start as Record<string, unknown>;
    if (typeof start.dateTime === 'string') return start.dateTime;
  }

  if (typeof event.dateTime === 'string') return event.dateTime;

  return '';
};

/**
 * Formats venue data into the standard venue structure
 */
const formatVenue = (venue: Record<string, unknown>): Venue => ({
  id: venue.id?.toString() || '',
  name: (venue.name as string) || '',
  city: venue.city ? { name: venue.city as string } : undefined,
  state: venue.state ? { name: venue.state as string } : undefined,
  address: {
    line1: (venue.address as string) || undefined
  },
  postalCode: (venue.postcode as string) || (venue.postalCode as string) || undefined,
  timezone: (venue.timezone as string) || undefined
});