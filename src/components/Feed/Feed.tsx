import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NotificationPopUp } from '@components/NotificationPopUp/NotificationPopUp';
import { Post } from '@components/Post/Post';
import { SkeletonPost } from '@components/SkeletonPost/SkeletonPost';
import { SCELETON_POST_COUNT } from '@constants/constants';
import { PostState } from '@store/reducers/postReducer';
import { selectAuthUid } from '@store/selectors';
import { useFetchPosts } from '@utils/hooks/useFetchPosts';
import { DocumentData, Query } from 'firebase/firestore';

import './styles.scss';

interface FeedProps {
  query: () => Query<DocumentData, DocumentData>;
  isNavigateFeed?: boolean;
}

export const Feed = ({ query, isNavigateFeed = false }: FeedProps) => {
  const userId = useSelector(selectAuthUid);
  const location = useLocation();
  const {
    loadMoreRef,
    loading,
    visiblePosts,
    isMorePosts,
    isHasPosts,
    error,
    handleClose,
  } = useFetchPosts(userId, query, location.pathname);

  const renderTweets = () => {
    return visiblePosts.map((post: PostState) => (
      <Post
        key={post.id}
        post={post}
        userId={userId}
        navigateTo={isNavigateFeed ? `posts/${post.id}` : ''}
      />
    ));
  };

  const renderWithoutPosts = () => {
    return loading ? (
      Array.from({ length: SCELETON_POST_COUNT }).map((_, index) => (
        <SkeletonPost key={index} />
      ))
    ) : (
      <p>no tweets</p>
    );
  };

  return (
    <div className="feed">
      {isHasPosts ? (
        <>
          {renderTweets()}
          {isMorePosts && <div ref={loadMoreRef} />}
          {loading && <SkeletonPost />}
        </>
      ) : (
        renderWithoutPosts()
      )}
      {error && <NotificationPopUp message={error} onClose={handleClose} />}
    </div>
  );
};
