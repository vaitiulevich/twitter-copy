import { calculateMinBirthDate } from '@utils/calculateMinBirthDate';

describe('calculateMinBirthDate', () => {
  it('should return the correct minimum birth date for maxAgeYears = 1', () => {
    const result = calculateMinBirthDate(1);
    const expectedDate = new Date();
    expectedDate.setFullYear(expectedDate.getFullYear() - 1);
    expect(result).toBe(expectedDate.toISOString().split('T')[0]);
  });

  it('should return the correct minimum birth date for maxAgeYears = 18', () => {
    const result = calculateMinBirthDate(18);
    const expectedDate = new Date();
    expectedDate.setFullYear(expectedDate.getFullYear() - 18);
    expect(result).toBe(expectedDate.toISOString().split('T')[0]);
  });

  it('should return the correct minimum birth date for maxAgeYears = 100', () => {
    const result = calculateMinBirthDate(100);
    const expectedDate = new Date();
    expectedDate.setFullYear(expectedDate.getFullYear() - 100);
    expect(result).toBe(expectedDate.toISOString().split('T')[0]);
  });
});
