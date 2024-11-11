import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { images } from '@constants/images';
import { selectTheme } from '@store/selectors';

import './styles.scss';
export const HomeHeader = () => {
  const location = useLocation();
  const { theme } = useSelector(selectTheme);

  const isHomeChildPage =
    location.pathname.includes('/posts/') ||
    location.pathname.includes('/user/');
  const isDarkTheme = theme === 'dark';
  const leftArrow = isDarkTheme ? images.leftArrowDark : images.leftArrow;
  return (
    <header className="home-header">
      <div className="home-header-navigate">
        {isHomeChildPage && (
          <Link to="/home" className="back-button">
            <img src={leftArrow} alt="back arrow" />
          </Link>
        )}
        <h3>Home</h3>
      </div>
      <ThemeToggle />
    </header>
  );
};
