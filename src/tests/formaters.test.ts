import {
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@constants/constants';
import { formatDate } from '@utils/formatDate';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';
import { formatTimestamp } from '@utils/formatTimestamp';

describe('formatDate', () => {
  it('should format a valid date correctly', () => {
    const date = new Date('2023-11-10');
    expect(formatDate(date)).toBe('2023-11-10');
  });

  it('should handle single-digit month and day correctly', () => {
    const date = new Date('2023-01-05');
    expect(formatDate(date)).toBe('2023-01-05');
  });

  it('should return an empty string for invalid date input', () => {
    expect(formatDate(<any>{})).toBe('');
  });
});

describe('formatPhoneNumber', () => {
  it('should format a valid phone number correctly', () => {
    expect(formatPhoneNumber('1234567890')).toBe('(123) 456-78-90');
  });

  it('should handle phone numbers with non-digit characters', () => {
    expect(formatPhoneNumber('(123) 456-7890')).toBe('(123) 456-78-90');
    expect(formatPhoneNumber('123-456-7890')).toBe('(123) 456-78-90');
    expect(formatPhoneNumber('123.456.7890')).toBe('(123) 456-78-90');
  });

  it('should return an empty string for an empty input', () => {
    expect(formatPhoneNumber('')).toBe('');
  });

  it('should return an empty string for invalid phone number input', () => {
    expect(formatPhoneNumber('abc')).toBe('');
    expect(formatPhoneNumber('123')).toBe('(123');
    expect(formatPhoneNumber('12')).toBe('(12');
    expect(formatPhoneNumber('1')).toBe('(1');
  });

  it('should handle longer phone numbers correctly', () => {
    expect(formatPhoneNumber('1234567890123')).toBe('(123) 456-78-90');
  });
});

describe('formatTimestamp', () => {
  const now = Date.now();

  it('should return "Just now" for timestamps within the last minute', () => {
    const timestamp = now - 30 * 1000; // 30 seconds ago
    expect(formatTimestamp(timestamp)).toBe('Just now');
  });

  it('should return the correct minute format for timestamps between 1 and 59 minutes ago', () => {
    const timestamp = now - 2 * SECONDS_IN_MINUTE * 1000; // 2 minutes ago
    expect(formatTimestamp(timestamp)).toBe('2 min');

    const timestamp3 = now - 45 * SECONDS_IN_MINUTE * 1000; // 45 minutes ago
    expect(formatTimestamp(timestamp3)).toBe('45 min');
  });

  it('should return the correct hour format for timestamps between 1 and 23 hours ago', () => {
    const timestamp = now - 1 * SECONDS_IN_HOUR * 1000; // 1 hour ago
    expect(formatTimestamp(timestamp)).toBe('1 h');

    const timestamp5 = now - 5 * SECONDS_IN_HOUR * 1000; // 5 hours ago
    expect(formatTimestamp(timestamp5)).toBe('5 h');
  });

  it('should return the date format for timestamps older than 24 hours', () => {
    const timestamp = now - 2 * SECONDS_IN_DAY * 1000; // 2 days ago
    const expectedDate = new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    expect(formatTimestamp(timestamp)).toBe(expectedDate);
  });
});
