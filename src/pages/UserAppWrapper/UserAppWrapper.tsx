import { Outlet } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { MenuSidebar } from '@components/MenuSidebar/MenuSidebar';
import { SearchSidebar } from '@components/SearchSidebar/SearchSidebar';

import './styles.scss';

export const UserAppWrapper = () => {
  return (
    <div className="user-app-wrapper">
      <MenuSidebar />
      <section className="main-section">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </section>
      <SearchSidebar />
    </div>
  );
};
