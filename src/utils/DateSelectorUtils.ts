import {
  DEFAULT_COUNT_DAYS_IN_MONTH,
  DEFAULT_DAY,
  DEFAULT_MONTH,
  DEFAULT_YEAR,
  Months,
  YEAR_RANGE,
} from '@constants/constants';

export const calculateDaysInMonth = (month: string, year: string): number[] => {
  const totalDays =
    month !== DEFAULT_MONTH && year !== DEFAULT_YEAR
      ? new Date(+year, +month, 0).getDate()
      : DEFAULT_COUNT_DAYS_IN_MONTH;

  return Array.from({ length: totalDays }, (_, index) => index + 1);
};

export const createMonthOptions = () => [
  { label: DEFAULT_MONTH, value: DEFAULT_MONTH, disabled: true },
  ...Months.map((month, ind) => ({
    label: month,
    value: (ind + 1).toString(),
  })),
];

export const createDayOptions = (daysInMonth: number[]) => [
  { label: DEFAULT_DAY, value: DEFAULT_DAY, disabled: true },
  ...daysInMonth.map((day) => ({
    label: day.toString(),
    value: day.toString(),
  })),
];

export const createYearOptions = () => [
  { label: DEFAULT_YEAR, value: DEFAULT_YEAR, disabled: true },
  ...Array.from({ length: YEAR_RANGE }, (_, index) => {
    const yearValue = new Date().getFullYear() - index;
    return { label: yearValue.toString(), value: yearValue.toString() };
  }),
];
