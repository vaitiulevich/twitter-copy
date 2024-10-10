import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeState } from '@store/types';

import './styles.scss';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(
    (state: { theme: ThemeState }) => state.theme.theme
  );

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME_REQUEST' });
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <label className={`toggle-container ${theme}`}>
        <input
          className={`toggle-input ${theme}`}
          type="checkbox"
          onChange={toggleTheme}
        />
        <span className={`toggle-slider ${theme}`} />
      </label>
    </>
  );
};

export default ThemeToggle;
