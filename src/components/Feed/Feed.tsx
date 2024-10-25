import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '@components/Post/Post';
import { fetchPostsRequest } from '@store/actions/postActions';
import { selectUserId, selectUserPosts } from '@store/selectors';
import { DocumentData, Query } from 'firebase/firestore';

import './styles.scss';

interface FeedProps {
  query: () => Query<DocumentData, DocumentData>;
}

export const Feed = ({ query }: FeedProps) => {
  const userId = useSelector(selectUserId);
  const posts = useSelector(selectUserPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsRequest(userId, query));
  }, [dispatch, userId]);
  const renderTweets = () => {
    return posts.map((post) => (
      <Post key={post.id} post={post} userId={userId} />
    ));
  };
  const isHasPosts = posts && posts.length > 0;
  return (
    <div className="feed">
      {isHasPosts ? <>{renderTweets()}</> : <p>No tweets</p>}
    </div>
  );
};
