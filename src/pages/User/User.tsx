import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Feed } from '@components/Feed/Feed';
import { ProfileHead } from '@components/ProfileHead/ProfileHead';
import { fetchOtherUserDataRequest } from '@store/actions/otherUserActions';
import {
  selectOtherUser,
  selectUserId,
  selectUserPosts,
} from '@store/selectors';
import { userPostsQuery } from '@utils/querys';

import './styles.scss';

export const User = () => {
  const { id } = useParams();
  const originId = useSelector(selectUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id === originId) {
      navigate('/profile');
    }
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(fetchOtherUserDataRequest(id));
    }
  }, [id]);

  const otherUser = useSelector(selectOtherUser);
  const posts = useSelector(selectUserPosts);

  return (
    <section className="user">
      {otherUser && (
        <>
          <ProfileHead
            user={otherUser}
            countPosts={posts.length}
            isOriginUser={false}
          />
          <Feed query={() => userPostsQuery(id as string)} />
        </>
      )}
    </section>
  );
};
