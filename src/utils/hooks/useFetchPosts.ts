import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsRequest, setLastVisible } from '@store/actions/postActions';
import { selectIsMorePost, selectPostLoad } from '@store/selectors';
import { DocumentData, Query } from 'firebase/firestore';

export const useFetchPosts = (
  userId: string,
  query: () => Query<DocumentData, DocumentData>,
  firstQuery: () => void
) => {
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
      const isNeedsPosts = entry.isIntersecting && !loading && isMorePosts;
      if (isNeedsPosts) {
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

  return { loadMoreRef };
};
