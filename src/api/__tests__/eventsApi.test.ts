// Mock modules that use import.meta.env
jest.mock('../../utils/logger', () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    group: jest.fn(),
    groupEnd: jest.fn(),
  },
}));

jest.mock('../../config/env', () => ({
  env: {
    apiUrl: 'https://test-api.com/events.json',
    corsProxyUrl: 'https://corsproxy.io/?',
    isDevelopment: false,
    isProduction: true,
    features: {
      darkMode: true,
      search: true,
      sorting: true,
    },
  },
  getApiUrl: jest.fn(() => 'https://test-api.com/events.json'),
}));

import { fetchEvents } from '../eventsApi';
import { apiClient } from '../client';
import { FALLBACK_DATA } from '../../constants/fallbackData';
import { logger } from '../../utils/logger';

jest.mock('../client');

describe('eventsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchEvents', () => {
    it('should transform API data correctly', async () => {
      const mockApiData = {
        events: [
          {
            id: 1,
            name: 'Test Event',
            startDate: '2025-11-15T19:00:00Z',
            venueId: 100,
          },
        ],
        venues: [
          {
            id: 100,
            name: 'Test Venue',
            city: 'Sydney',
            state: 'NSW',
          },
        ],
      };

      (apiClient.get as jest.Mock).mockResolvedValueOnce(mockApiData);

      const result = await fetchEvents();

      expect(result.isFallback).toBe(false);
      expect(result.data._embedded.events).toHaveLength(1);
      expect(result.data._embedded.events[0].name).toBe('Test Event');
      expect(result.data._embedded.events[0]._embedded?.venues?.[0].name).toBe(
        'Test Venue'
      );
    });

    it('should match venues with events by venueId', async () => {
      const mockApiData = {
        events: [
          { id: 1, name: 'Event 1', venueId: 101, startDate: '2025-11-15T19:00:00Z' },
          { id: 2, name: 'Event 2', venueId: 102, startDate: '2025-11-16T19:00:00Z' },
        ],
        venues: [
          { id: 101, name: 'Venue A', city: 'Melbourne' },
          { id: 102, name: 'Venue B', city: 'Brisbane' },
        ],
      };

      (apiClient.get as jest.Mock).mockResolvedValueOnce(mockApiData);

      const result = await fetchEvents();

      expect(result.data._embedded.events[0]._embedded?.venues?.[0].name).toBe(
        'Venue A'
      );
      expect(result.data._embedded.events[1]._embedded?.venues?.[0].name).toBe(
        'Venue B'
      );
    });

    it('should return fallback data on API failure', async () => {
      (apiClient.get as jest.Mock).mockRejectedValueOnce(
        new Error('API Error')
      );

      const result = await fetchEvents();

      expect(result.isFallback).toBe(true);
      expect(result.data).toEqual(FALLBACK_DATA);
      expect(logger.warn).toHaveBeenCalled();
    });

    it('should handle invalid data format', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({
        invalid: 'data',
      });

      const result = await fetchEvents();

      expect(result.isFallback).toBe(true);
      expect(result.data).toEqual(FALLBACK_DATA);
    });

    it('should handle missing venues array', async () => {
      const mockApiData = {
        events: [
          {
            id: 1,
            name: 'Test Event',
            startDate: '2025-11-15T19:00:00Z',
            venueId: 100,
          },
        ],
        venues: undefined,
      };

      (apiClient.get as jest.Mock).mockResolvedValueOnce(mockApiData);

      const result = await fetchEvents();

      expect(result.isFallback).toBe(false);
      expect(result.data._embedded.events[0]._embedded).toBeUndefined();
    });
  });
});