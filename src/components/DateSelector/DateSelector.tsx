import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import { Months } from '@constants/constants';

import './styles.scss';

const DEFAULT_MONTH = 'Month';
const DEFAULT_DAY = 'Day';
const DEFAULT_YEAR = 'Year';
const YEAR_RANGE = 100;

interface DateSelectorProps {
  onDateChange: (month: string, day: string, year: string) => void;
}

export const DateSelector = memo(({ onDateChange }: DateSelectorProps) => {
  const [date, setDate] = useState({
    month: DEFAULT_MONTH,
    day: DEFAULT_DAY,
    year: DEFAULT_YEAR,
  });

  const { month, day, year } = date;

  const daysInMonth = useMemo(() => {
    if (month !== DEFAULT_MONTH && year !== DEFAULT_YEAR) {
      const totalDays = new Date(+year, +month, 0).getDate();
      return Array.from({ length: totalDays }, (_, index) => index + 1);
    }
    return [];
  }, [month, year]);

  useEffect(() => {
    if (
      month !== DEFAULT_MONTH &&
      year !== DEFAULT_YEAR &&
      +day > daysInMonth.length
    ) {
      setDate((prev) => ({ ...prev, day: DEFAULT_DAY }));
    }
  }, [daysInMonth, day, month, year]);

  const handleChange =
    (key: 'month' | 'day' | 'year') =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setDate((prev) => ({ ...prev, [key]: value }));

      const isLastSelect =
        key === 'day' && month !== DEFAULT_MONTH && year !== DEFAULT_YEAR;
      if (isLastSelect) {
        onDateChange(month, value, year);
      }
    };

  const renderSelect = (
    key: 'month' | 'day' | 'year',
    value: string,
    options: Array<{ label: string; value: string }>
  ) => (
    <select className="date-select" value={value} onChange={handleChange(key)}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );

  const monthOptions = [
    { label: DEFAULT_MONTH, value: DEFAULT_MONTH, disabled: true },
    ...Months.map((month, ind) => ({
      label: month,
      value: (ind + 1).toString(),
    })),
  ];

  const dayOptions = [
    { label: DEFAULT_DAY, value: DEFAULT_DAY, disabled: true },
    ...daysInMonth.map((day) => ({
      label: day.toString(),
      value: day.toString(),
    })),
  ];

  const yearOptions = [
    { label: DEFAULT_YEAR, value: DEFAULT_YEAR, disabled: true },
    ...Array.from({ length: YEAR_RANGE }, (_, index) => {
      const yearValue = new Date().getFullYear() - index;
      return { label: yearValue.toString(), value: yearValue.toString() };
    }),
  ];

  return (
    <div className="date-panel">
      {renderSelect('month', month, monthOptions)}
      {renderSelect('day', day, dayOptions)}
      {renderSelect('year', year, yearOptions)}
    </div>
  );
});
