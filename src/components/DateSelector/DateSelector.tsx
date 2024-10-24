import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DEFAULT_COUNT_DAYS_IN_MONTH,
  DEFAULT_DAY,
  DEFAULT_MONTH,
  DEFAULT_YEAR,
  Months,
  YEAR_RANGE,
} from '@constants/constants';
import { ERR_REQUIRED } from '@constants/messages';
import { resetError } from '@store/actions/authActions';

import './styles.scss';

interface DateSelectorProps {
  onDateChange: (month: string, day: string, year: string) => void;
  isRequired: boolean;
}

export const DateSelector = memo(
  ({ onDateChange, isRequired }: DateSelectorProps) => {
    const [date, setDate] = useState({
      month: DEFAULT_MONTH,
      day: DEFAULT_DAY,
      year: DEFAULT_YEAR,
    });

    const { month, day, year } = date;
    const [isSetDate, setIsSetDate] = useState(true);
    const [error, setError] = useState('');

    const daysInMonth = useMemo(() => {
      const totalDays =
        month !== DEFAULT_MONTH && year !== DEFAULT_YEAR
          ? new Date(+year, +month, 0).getDate()
          : DEFAULT_COUNT_DAYS_IN_MONTH;

      return Array.from({ length: totalDays }, (_, index) => index + 1);
    }, [month, year]);

    const checkValidation = () => {
      const validDay = +day <= daysInMonth.length && +day > 0;
      const validMonth = month !== DEFAULT_MONTH;
      const validYear = year !== DEFAULT_YEAR;

      if (!validDay) {
        setError(ERR_REQUIRED);
        setIsSetDate(false);
      } else {
        setError('');
        setIsSetDate(true);
      }
      if (validDay && validMonth && validYear) {
        onDateChange(month, day, year);
      }
    };

    const dispatch = useDispatch();
    const handleChange =
      (key: 'month' | 'day' | 'year') =>
      (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(resetError());
        const value = event.target.value;
        setDate((prev) => ({ ...prev, [key]: value }));
        setIsSetDate(true);
        setError('');

        if (key === 'month' || key == 'year') {
          const newDaysInMonth = new Date(+year, +value, 0).getDate();
          if (+day > newDaysInMonth) {
            setDate((prev) => ({ ...prev, day: '1' }));
          }
        }
        checkValidation();
      };

    const renderSelect = (
      key: 'month' | 'day' | 'year',
      value: string,
      options: Array<{ label: string; value: string }>
    ) => (
      <select
        className="date-select"
        value={value}
        onChange={handleChange(key)}
      >
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
      <div className="select-date">
        <div className="date-panel">
          {renderSelect('month', month, monthOptions)}
          {renderSelect('day', day, dayOptions)}
          {renderSelect('year', year, yearOptions)}
        </div>
        {isRequired && !isSetDate && error && (
          <p className="inp-err-message">{error}</p>
        )}
      </div>
    );
  }
);
