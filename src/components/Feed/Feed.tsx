import { useSelector } from 'react-redux';
import { Post } from '@components/Post/Post';
import { RootState } from '@store/types';

import './styles.scss';

export const Feed = () => {
  const { posts, userId } = useSelector((state: RootState) => state.user);
  const renderTweets = () => {
    return posts.map((post) => (
      <Post key={post.timestamp} post={post} userId={userId} />
    ));
  };
  const isHasPosts = posts && posts.length > 0;
  return (
    <div className="feed">
      {isHasPosts ? <>{renderTweets()}</> : <p>No tweets</p>}
    </div>
  );
};
