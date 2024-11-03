import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Feed } from '@components/Feed/Feed';
import { NotificationPopUp } from '@components/NotificationPopUp/NotificationPopUp';
import { ProfileHead } from '@components/ProfileHead/ProfileHead';
import { hideErrorPopUp } from '@store/actions/popUpActions';
import { getUserData, getUserDataFailure } from '@store/actions/userActions';
import { selectAuthUid, selectUserSelector } from '@store/selectors';
import { RootState } from '@store/types';
import { userCursorPostsQuery, userPostsQuery } from '@utils/querys';

import './styles.scss';

export const Profile = () => {
  const user = useSelector(selectUserSelector);
  const { error } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const fetchUser = (uid: string) => {
    if (uid) {
      dispatch(getUserData(uid));
    }
  };
  const authId = useSelector(selectAuthUid);
  useEffect(() => {
    if (authId) {
      fetchUser(authId);
    }
  }, [authId]);
  const handleClose = useCallback(() => {
    dispatch(hideErrorPopUp());
    dispatch(getUserDataFailure(null));
  }, []);

  return (
    <>
      <ProfileHead user={user} isOriginUser={true} />
      <AddPostPanel />
      <h2 className="headline-tweets">Tweets</h2>
      <Feed
        query={() => userPostsQuery(user.userId)}
        firstQuery={() => userCursorPostsQuery}
      />
      {error && <NotificationPopUp message={error} onClose={handleClose} />}
    </>
  );
};
