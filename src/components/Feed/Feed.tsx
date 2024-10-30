import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Post } from '@components/Post/Post';
import { fetchPostsRequest, setLastVisible } from '@store/actions/postActions';
import {
  selectIsMorePost,
  selectPostLoad,
  selectUserId,
  selectUserPosts,
} from '@store/selectors';
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
  const posts = useSelector(selectUserPosts);
  const dispatch = useDispatch();
  const loading = useSelector(selectPostLoad);
  const isMorePosts = useSelector(selectIsMorePost);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const getPosts = () => {
    dispatch(fetchPostsRequest(userId, query, firstQuery));
  };

  useEffect(() => {
    dispatch(setLastVisible(null));
    getPosts();
  }, [userId]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading && isMorePosts) {
        getPosts();
      }
    });

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observerRef.current?.unobserve(currentLoadMoreRef);
      }
    };
  }, [loading, isMorePosts]);

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

  const isHasPosts = posts && posts.length > 0;

  return (
    <div className="feed">
      {isHasPosts ? (
        <>
          {renderTweets()}
          {isMorePosts && <div ref={loadMoreRef} />}
        </>
      ) : (
        <p>No tweets</p>
      )}
    </div>
  );
};
