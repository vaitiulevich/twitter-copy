import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NotificationPopUp } from '@components/NotificationPopUp/NotificationPopUp';
import { Post } from '@components/Post/Post';
import { SkeletonPost } from '@components/SkeletonPost/SkeletonPost';
import { SCELETON_POST_COUNT } from '@constants/constants';
import { RootState } from '@store/types';
import { useFetchPosts } from '@utils/hooks/useFetchPosts';
import { DocumentData, Query } from 'firebase/firestore';

import './styles.scss';

interface FeedProps {
  query: () => Query<DocumentData, DocumentData>;
  isNavigateFeed?: boolean;
  firstQuery: () => void;
}

export const Feed = ({
  query,
  firstQuery,
  isNavigateFeed = false,
}: FeedProps) => {
  const userId = useSelector((state: RootState) => state.auth.uid);
  const location = useLocation();
  const {
    loadMoreRef,
    loading,
    visiblePosts,
    isMorePosts,
    isHasPosts,
    error,
    handleClose,
  } = useFetchPosts(userId, query, firstQuery, location.pathname);

  const renderTweets = () => {
    return visiblePosts.map((post) => (
      <Post
        key={post.id}
        post={post}
        userId={userId}
        navigateTo={isNavigateFeed ? `posts/${post.id}` : undefined}
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
