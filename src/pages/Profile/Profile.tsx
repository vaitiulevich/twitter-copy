import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Feed } from '@components/Feed/Feed';
import { ProfileHead } from '@components/ProfileHead/ProfileHead';
import { getUserData } from '@store/actions/userActions';
import {
  selectAuthUid,
  selectCountPosts,
  selectUserSelector,
} from '@store/selectors';
import { userCursorPostsQuery, userPostsQuery } from '@utils/querys';

import './styles.scss';

export const Profile = () => {
  const user = useSelector(selectUserSelector);
  const countPosts = useSelector(selectCountPosts);
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
  return (
    <>
      <ProfileHead user={user} countPosts={countPosts} isOriginUser={true} />
      <AddPostPanel />
      <h2 className="headline-tweets">Tweets</h2>
      <Feed
        query={() => userPostsQuery(user.userId)}
        firstQuery={() => userCursorPostsQuery}
      />
    </>
  );
};
