import type { ApiResponse } from '../types/api.types';

export const FALLBACK_DATA: ApiResponse = {
  _embedded: {
    events: [
      {
        id: 'fallback-1',
        name: 'Sample Concert Event',
        dates: {
          start: { dateTime: '2025-11-15T19:00:00Z' },
          timezone: 'Australia/Sydney'
        },
        _embedded: {
          venues: [{
            id: 'venue-1',
            name: 'Sample Arena',
            city: { name: 'Sydney' },
            state: { name: 'NSW' },
            address: { line1: '123 Sample Street' },
            postalCode: '2000'
          }]
        },
        info: 'This is fallback data displayed because the API is currently unavailable. The application remains functional with sample events.'
      },
      {
        id: 'fallback-2',
        name: 'Sample Sports Event',
        dates: {
          start: { dateTime: '2025-11-20T18:30:00Z' },
          timezone: 'Australia/Melbourne'
        },
        _embedded: {
          venues: [{
            id: 'venue-2',
            name: 'Sample Stadium',
            city: { name: 'Melbourne' },
            state: { name: 'VIC' },
            address: { line1: '456 Example Avenue' },
            postalCode: '3000'
          }]
        },
        info: 'Another sample event from fallback data to demonstrate the app functionality.'
      },
      {
        id: 'fallback-3',
        name: 'Sample Theater Performance',
        dates: {
          start: { dateTime: '2025-11-25T20:00:00Z' },
          timezone: 'Australia/Brisbane'
        },
        _embedded: {
          venues: [{
            id: 'venue-1',
            name: 'Sample Arena',
            city: { name: 'Brisbane' },
            state: { name: 'QLD' },
            address: { line1: '789 Demo Road' },
            postalCode: '4000'
          }]
        },
        info: 'Experience world-class entertainment in this fallback example.'
      },
      {
        id: 'fallback-4',
        name: 'Sample Music Festival',
        dates: {
          start: { dateTime: '2025-12-01T14:00:00Z' },
          timezone: 'Australia/Perth'
        },
        _embedded: {
          venues: [{
            id: 'venue-3',
            name: 'Sample Park',
            city: { name: 'Perth' },
            state: { name: 'WA' },
            address: { line1: '321 Test Boulevard' },
            postalCode: '6000'
          }]
        },
        info: 'Join us for an amazing outdoor music festival with multiple stages and artists.'
      }
    ]
  }
};