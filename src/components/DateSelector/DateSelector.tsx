import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DEFAULT_DAY, DEFAULT_MONTH, DEFAULT_YEAR } from '@constants/constants';
import { ERR_REQUIRED } from '@constants/messages';
import { resetError } from '@store/actions/authActions';
import {
  calculateDaysInMonth,
  createDayOptions,
  createMonthOptions,
  createYearOptions,
} from '@utils/DateSelectorUtils';

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

    const isEmptyDate =
      month === DEFAULT_MONTH && year === DEFAULT_YEAR && day === DEFAULT_DAY;

    const daysInMonth = useMemo(
      () => calculateDaysInMonth(month, year),
      [month, year]
    );

    const checkValidation = () => {
      const validDay = +day <= daysInMonth.length && +day > 0;
      const validMonth = month !== DEFAULT_MONTH;
      const validYear = year !== DEFAULT_YEAR;

      if (!validDay || !validMonth || !validYear) {
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

    useEffect(() => {
      if (!isEmptyDate) {
        checkValidation();
      }
    }, [day, month, year]);

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
      value: number | string,
      options: Array<{ label: string; value: number | string }>
    ) => (
      <select
        className="date-select"
        value={value}
        onChange={handleChange(key)}
        aria-label={key}
      >
        {options.map(({ label, value }) => (
          <option className="date-option" key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
    const monthOptions = createMonthOptions();
    const dayOptions = createDayOptions(daysInMonth);
    const yearOptions = createYearOptions();

    const isErrorDate = isRequired && !isSetDate && error;
    return (
      <div className="select-date">
        <div className="date-panel">
          {renderSelect('month', month, monthOptions)}
          {renderSelect('day', day, dayOptions)}
          {renderSelect('year', year, yearOptions)}
        </div>
        {isErrorDate && <p className="inp-err-message">{error}</p>}
      </div>
    );
  }
);
