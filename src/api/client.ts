import { ApiError, handleApiError } from '../utils/errorHandler';

const API_ENDPOINT = '/api/events/event-data.json';
const REQUEST_TIMEOUT = 10000;

export const apiClient = {
  async get<T>(url: string = API_ENDPOINT): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      throw handleApiError(error);
    }
  }
};