import { ApiError, handleApiError } from '../utils/errorHandler';
import { logger } from '../utils/logger';

const REQUEST_TIMEOUT = 10000;

/**
 * HTTP client for API requests with timeout handling
 */
export const apiClient = {
  /**
   * Performs a GET request with automatic timeout and error handling
   * @param url - The URL to fetch
   * @returns Promise resolving to the parsed JSON response
   * @throws ApiError on HTTP errors or network failures
   */
  async get<T>(url: string): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      logger.debug('Fetching URL:', url);

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