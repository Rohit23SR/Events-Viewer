import type { Event } from './event.types';

export interface ApiResponse {
  _embedded: {
    events: Event[];
  };
  _links?: {
    first?: { href: string };
    self?: { href: string };
    next?: { href: string };
    last?: { href: string };
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface FetchEventsResult {
  data: ApiResponse;
  isFallback: boolean;
}

export interface UseEventsDataState {
  data: ApiResponse | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFallback: boolean;
}