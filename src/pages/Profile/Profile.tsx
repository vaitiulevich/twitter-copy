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
import { RootState } from '@store/types';
import { userCursorPostsQuery, userPostsQuery } from '@utils/querys';

import './styles.scss';

export const Profile = () => {
  const user = useSelector(selectUserSelector);
  let countPosts = useSelector(selectCountPosts);
  const posts = useSelector((state: RootState) => state.posts.total);
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
  useEffect(() => {
    // countPosts = posts.total;
    // posts=posts.total
  }, [posts]);
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
