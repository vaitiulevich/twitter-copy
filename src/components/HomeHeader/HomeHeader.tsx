import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { images } from '@constants/images';
import { selectThemeType } from '@store/selectors';

import './styles.scss';
export const HomeHeader = () => {
  const location = useLocation();
  const theme = useSelector(selectThemeType);
  return (
    <header className="home-header">
      <div className="home-header-navigate">
        {location.pathname.includes('/posts/') && (
          <Link to="/home" className="back-button">
            <img
              src={theme === 'dark' ? images.leftArrowDark : images.leftArrow}
              alt="back arrow"
            />
          </Link>
        )}
        <h3>Home</h3>
      </div>
      <ThemeToggle />
    </header>
  );
};
