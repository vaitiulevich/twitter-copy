import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Post } from '@components/Post/Post';
import { SkeletonPost } from '@components/SkeletonPost/SkeletonPost';
import { POSTS_PER_PAGE, SCELETON_POST_COUNT } from '@constants/constants';
import { fetchPostsSuccess } from '@store/actions/postActions';
import {
  selectIsMorePost,
  selectPostLoad,
  selectUserId,
} from '@store/selectors';
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
  const { id } = useParams();
  const userId = id ?? useSelector(selectUserId);
  const { posts } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const loading = useSelector(selectPostLoad);
  const isMorePosts = useSelector(selectIsMorePost);
  const location = useLocation();
  const isHasPosts = posts && posts.length;

  const { loadMoreRef } = useFetchPosts(userId, query, firstQuery);

  useEffect(() => {
    if (location && posts.length > POSTS_PER_PAGE) {
      dispatch(fetchPostsSuccess([]));
    }
  }, [location.pathname]);

  const renderTweets = () => {
    return posts.map((post) => (
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
        </>
      ) : (
        renderWithoutPosts()
      )}
    </div>
  );
};
