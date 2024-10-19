import { Link } from 'react-router-dom';
import ThemeToggle from '@components/ThemeToggle/ThemeToggle';
import { FooterLinks } from '@constants/constants';

import './styles.scss';

export const EntryFooter = () => {
  const renderFooterLinks = () => (
    <ul className="entry-footer-nav">
      {FooterLinks.map((link) => (
        <li key={link.title}>
          <Link className="nav-link" to={link.link}>
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="entry-footer">
      <ThemeToggle />
      {renderFooterLinks()}
      <span>© 2021 Twitter, Inc.</span>
    </footer>
  );
};
