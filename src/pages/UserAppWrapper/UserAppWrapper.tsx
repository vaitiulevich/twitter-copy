import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { MenuSidebar } from '@components/MenuSidebar/MenuSidebar';
import { SearchSidebar } from '@components/SearchSidebar/SearchSidebar';
import { getUserData } from '@store/actions/userActions';
import { selectAuthUid } from '@store/selectors';

import './styles.scss';

export const UserAppWrapper = () => {
  const dispatch = useDispatch();
  const fetchUser = (uid: string) => {
    if (uid) {
      dispatch(getUserData(uid));
    }
  };
  const user = useSelector(selectAuthUid);
  useEffect(() => {
    if (user) {
      fetchUser(user);
    }
  }, [user]);

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
