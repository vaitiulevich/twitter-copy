import { useSelector } from 'react-redux';
import { Post } from '@components/Post/Post';
import { selectUserId, selectUserPosts } from '@store/selectors';

import './styles.scss';

export const Feed = () => {
  const userId = useSelector(selectUserId);
  const posts = useSelector(selectUserPosts);
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
