import { useDispatch, useSelector } from 'react-redux';
import { toggleThemeRequest } from '@store/actions/themeActions';
import { selectTheme } from '@store/selectors';

import './styles.scss';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(selectTheme);

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
