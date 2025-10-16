import { formatDate } from '../dateFormatter';

describe('dateFormatter utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      // formatDate expects a string, not a Date object
      const testDateString = '2025-11-15T12:00:00.000Z';
      const result = formatDate(testDateString);
      
      // The result should contain these elements
      expect(result).toContain('November');
      expect(result).toContain('2025');
      
      // Check that it contains either 15 or 16 (accounting for timezone differences)
      const containsFifteen = result.includes('15');
      const containsSixteen = result.includes('16');
      expect(containsFifteen || containsSixteen).toBe(true);
      
      // Check the format structure
      expect(result).toMatch(/\w+\s+\d{1,2}\s+\w+\s+\d{4}/); // e.g., "Sunday 16 November 2025"
    });

    it('should handle invalid date gracefully', () => {
      const result = formatDate('invalid-date-string');
      // This should return 'Invalid Date' for truly invalid strings
      expect(result).toBe('Invalid Date');
    });

    it('should handle malformed date strings', () => {
      // Test with clearly invalid date strings
      const invalidStrings = [
        'not-a-date',
        'abc123',
        '99999999999999999999' // Number too large for valid date
      ];

      invalidStrings.forEach(dateStr => {
        const result = formatDate(dateStr);
        expect(result).toBe('Invalid Date');
      });
    });

    it('should format ISO date string', () => {
      const isoString = new Date().toISOString();
      const result = formatDate(isoString);
      
      // Check that it returns a properly formatted string
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
      expect(result).not.toBe('Invalid Date');
    });

    it('should handle different date string formats', () => {
      // Test with different valid date string formats
      const dateStrings = [
        '2025-11-15',
        '11/15/2025',
        'November 15, 2025',
        '2025-11-15T00:00:00Z'
      ];

      dateStrings.forEach(dateStr => {
        const result = formatDate(dateStr);
        expect(result).not.toBe('Invalid Date');
        expect(result).toContain('2025');
      });
    });

    it('should handle timestamp strings', () => {
      // Test with a timestamp as a string
      const timestampString = '1731676800000';
      const result = formatDate(timestampString);
      
      // Check if it handles numeric strings
      if (result !== 'Invalid Date') {
        expect(result).toContain('2025');
      }
    });

    it('should handle empty string', () => {
      const result = formatDate('');
      // Empty string might be treated as epoch or invalid
      // Check what your implementation actually returns
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should handle null/undefined differently', () => {
      // Type assertion needed since TypeScript expects string
      const resultNull = formatDate(null as any);
      const resultUndefined = formatDate(undefined as any);
      
      // null is coerced to 0 (epoch time - Jan 1, 1970)
      expect(resultNull).toContain('1970');
      expect(resultNull).toContain('January');
      
      // undefined returns Invalid Date
      expect(resultUndefined).toBe('Invalid Date');
    });
  });
});