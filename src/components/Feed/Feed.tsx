import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@components/Button/Button';
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
  const getPosts = () => {
    dispatch(fetchPostsRequest(userId, query, firstQuery));
  };
  useEffect(() => {
    dispatch(setLastVisible(null));
    getPosts();
  }, [dispatch, userId]);

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
          {isMorePosts && (
            <Button
              text="Load More"
              onClick={getPosts}
              disabled={loading}
              loading={loading}
            />
          )}
        </>
      ) : (
        <p>No tweets</p>
      )}
    </div>
  );
};
