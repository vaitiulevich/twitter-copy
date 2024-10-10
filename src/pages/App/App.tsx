import '@styles/styles.scss';

import { useEffect } from 'react';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { images } from '@constants/images';
import { useTheme } from '@store/ThemeContext';

import './App.css';

const App = () => {
  // const { theme } = useTheme();

  // useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);

  return (
    <div>
      <img src={images.logo} alt="logo" />
      <ThemeToggle />
    </div>
  );
};

export default App;
