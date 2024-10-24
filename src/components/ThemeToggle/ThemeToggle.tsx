import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeRequest } from '@store/actions/themeActions';
import { selectThemeType } from '@store/selectors';

import './styles.scss';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectThemeType);

  const toggleTheme = () => {
    dispatch(toggleThemeRequest());
  };
  return (
    <>
      <label className="toggle-container">
        <input
          className={`toggle-input ${theme}`}
          type="checkbox"
          onChange={toggleTheme}
        />
        <span className="toggle-slider" />
      </label>
    </>
  );
};

export default ThemeToggle;
