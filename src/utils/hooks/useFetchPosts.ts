import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POSTS_PER_PAGE } from '@constants/constants';
import { hideErrorPopUp } from '@store/actions/popUpActions';
import {
  fetchPostsRequest,
  fetchPostsSuccess,
  loadMorePosts,
  setIsMorePosts,
  updatePostLikesFailure,
} from '@store/actions/postActions';
import { selectPosts, selectUserId } from '@store/selectors';
import { DocumentData, Query } from 'firebase/firestore';

export const useFetchPosts = (
  userId: string,
  query: () => Query<DocumentData, DocumentData>,
  location: string
) => {
  const dispatch = useDispatch();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { isMorePosts, loading, posts, visiblePostsCount, error } =
    useSelector(selectPosts);

  const visiblePosts = posts.slice(0, visiblePostsCount);
  const isHasPosts = visiblePosts.length > 0;
  const originId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchPostsRequest(userId, query));
    dispatch(setIsMorePosts(true));
    dispatch(loadMorePosts(POSTS_PER_PAGE));
    return () => {
      dispatch(fetchPostsSuccess([]));
    };
  }, [location, originId]);

  useEffect(() => {
    if (!isMorePosts || !loadMoreRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && isMorePosts) {
        dispatch(loadMorePosts(visiblePostsCount + POSTS_PER_PAGE));
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isMorePosts, visiblePostsCount, posts]);

  const handleClose = () => {
    dispatch(hideErrorPopUp());
    dispatch(updatePostLikesFailure(null));
  };

  return {
    loadMoreRef,
    loading,
    visiblePosts,
    isMorePosts,
    isHasPosts,
    error,
    handleClose,
  };
};
