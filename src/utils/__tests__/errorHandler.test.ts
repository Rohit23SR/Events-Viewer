import { ApiError, handleApiError } from '../errorHandler';

describe('errorHandler utils', () => {
  describe('ApiError', () => {
    it('should create ApiError with message', () => {
      const error = new ApiError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('ApiError');
      expect(error.statusCode).toBeUndefined();
    });

    it('should create ApiError with status code', () => {
      const error = new ApiError('Not found', 404);
      expect(error.message).toBe('Not found');
      expect(error.statusCode).toBe(404);
    });

    it('should create ApiError with original error', () => {
      const originalError = new Error('Original');
      const error = new ApiError('Wrapped error', 500, originalError);
      expect(error.originalError).toBe(originalError);
    });
  });

  describe('handleApiError', () => {
    it('should return ApiError as is', () => {
      const apiError = new ApiError('API Error', 500);
      const result = handleApiError(apiError);
      expect(result).toBe(apiError);
    });

    it('should wrap regular Error in ApiError', () => {
      const error = new Error('Regular error');
      const result = handleApiError(error);
      expect(result).toBeInstanceOf(ApiError);
      expect(result.message).toBe('Regular error');
      expect(result.originalError).toBe(error);
    });

    it('should handle unknown error types', () => {
      const result = handleApiError('string error');
      expect(result).toBeInstanceOf(ApiError);
      expect(result.message).toBe('An unknown error occurred');
    });

    it('should handle null/undefined', () => {
      const result = handleApiError(null);
      expect(result).toBeInstanceOf(ApiError);
      expect(result.message).toBe('An unknown error occurred');
    });
  });
});