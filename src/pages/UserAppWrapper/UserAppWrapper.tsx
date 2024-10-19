import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { MenuSidebar } from '@components/MenuSidebar/MenuSidebar';
import { SearchSidebar } from '@components/SearchSidebar/SearchSidebar';
import { fetchPostsRequest, getUserData } from '@store/actions/userActions';
import { getAuth, User } from 'firebase/auth';

import './styles.scss';

export const UserAppWrapper = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const dispatch = useDispatch();
  const fetchUser = (uid: string) => {
    if (uid) {
      dispatch(getUserData(uid));
      dispatch(fetchPostsRequest(uid));
    }
  };
  useEffect(() => {
    if (user) {
      fetchUser(user.uid);
    }
  }, [user]);

  return (
    <div className="user-app-wrapper">
      <MenuSidebar />
      <section className="main-section">
        <Outlet />
      </section>
      <SearchSidebar />
    </div>
  );
};
