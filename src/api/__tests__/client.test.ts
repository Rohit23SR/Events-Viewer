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

import { apiClient } from '../client';

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('get', () => {
    it('should fetch data successfully', async () => {
      const mockData = { message: 'Success' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await apiClient.get('/test');
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.any(Object)
      );
    });

    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(apiClient.get('/test')).rejects.toThrow('HTTP error! status: 404');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(apiClient.get('/test')).rejects.toThrow('Network error');
    });

    it('should handle timeout', async () => {
      jest.useFakeTimers();
      
      // Create an AbortController to simulate timeout
      const abortError = new DOMException('The operation was aborted', 'AbortError');
      
      // Mock fetch to create a promise that will be aborted
      mockFetch.mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => {
            reject(abortError);
          }, 5000);
        });
      });

      // Start the request
      const fetchPromise = apiClient.get('/test');
      
      jest.advanceTimersByTime(5000);
      
      await expect(fetchPromise).rejects.toThrow('The operation was aborted');
      
      jest.useRealTimers();
    }, 10000);

    it('should accept custom URL', async () => {
      const mockData = { message: 'Success' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      await apiClient.get('https://custom.api.com/test');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://custom.api.com/test',
        expect.any(Object)
      );
    });
  });
});