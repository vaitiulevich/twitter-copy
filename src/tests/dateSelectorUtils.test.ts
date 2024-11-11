import {
  DEFAULT_COUNT_DAYS_IN_MONTH,
  DEFAULT_DAY,
  DEFAULT_MONTH,
  DEFAULT_YEAR,
  Months,
  YEAR_RANGE,
} from '@constants/constants';
import {
  calculateDaysInMonth,
  createDayOptions,
  createMonthOptions,
  createYearOptions,
} from '@utils/DateSelectorUtils';

describe('Date Utility Functions', () => {
  describe('calculateDaysInMonth', () => {
    it('should return the correct number of days for a valid month and year', () => {
      const daysInFebruary = calculateDaysInMonth('2', '2020');
      expect(daysInFebruary).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29,
      ]);
    });

    it('should return the correct number of days for a non-leap year February', () => {
      const daysInFebruary = calculateDaysInMonth('2', '2021');
      expect(daysInFebruary).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28,
      ]);
    });

    it('should return the default number of days for the default month and year', () => {
      const days = calculateDaysInMonth(DEFAULT_MONTH, DEFAULT_YEAR);
      expect(days).toEqual(
        Array.from(
          { length: DEFAULT_COUNT_DAYS_IN_MONTH },
          (_, index) => index + 1
        )
      );
    });
  });

  describe('createMonthOptions', () => {
    it('should create month options correctly', () => {
      const monthOptions = createMonthOptions();
      expect(monthOptions).toHaveLength(Months.length + 1);
      expect(monthOptions[0]).toEqual({
        label: DEFAULT_MONTH,
        value: DEFAULT_MONTH,
        disabled: true,
      });
      Months.forEach((month, index) => {
        expect(monthOptions[index + 1]).toEqual({
          label: month,
          value: (index + 1).toString(),
        });
      });
    });
  });

  describe('createDayOptions', () => {
    it('should create day options correctly', () => {
      const daysInMonth = [1, 2, 3, 4, 5];
      const dayOptions = createDayOptions(daysInMonth);
      expect(dayOptions).toHaveLength(daysInMonth.length + 1);
      expect(dayOptions[0]).toEqual({
        label: DEFAULT_DAY,
        value: DEFAULT_DAY,
        disabled: true,
      });
      daysInMonth.forEach((day) => {
        expect(dayOptions[day]).toEqual({
          label: day.toString(),
          value: day.toString(),
        });
      });
    });
  });

  describe('createYearOptions', () => {
    it('should create year options correctly', () => {
      const yearOptions = createYearOptions();
      expect(yearOptions).toHaveLength(YEAR_RANGE + 1);
      expect(yearOptions[0]).toEqual({
        label: DEFAULT_YEAR,
        value: DEFAULT_YEAR,
        disabled: true,
      });
      for (let i = 0; i < YEAR_RANGE; i++) {
        const yearValue = new Date().getFullYear() - i;
        expect(yearOptions[i + 1]).toEqual({
          label: yearValue.toString(),
          value: yearValue.toString(),
        });
      }
    });
  });
});
