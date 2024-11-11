import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Feed } from '@components/Feed/Feed';
import { NotificationPopUp } from '@components/NotificationPopUp/NotificationPopUp';
import { ProfileHead } from '@components/ProfileHead/ProfileHead';
import { hideErrorPopUp } from '@store/actions/popUpActions';
import { getUserData, getUserDataFailure } from '@store/actions/userActions';
import {
  selectAuthUid,
  selectUserError,
  selectUserSelector,
} from '@store/selectors';
import { userPostsQuery } from '@utils/querys';

import './styles.scss';

export const Profile = () => {
  const user = useSelector(selectUserSelector);
  const error = useSelector(selectUserError);
  const authId = useSelector(selectAuthUid);

  const dispatch = useDispatch();
  const fetchUser = (uid: string) => {
    if (uid) {
      dispatch(getUserData(uid));
    }
  };
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
      <Feed query={() => userPostsQuery(user.userId)} />
      {error && <NotificationPopUp message={error} onClose={handleClose} />}
    </>
  );
};
