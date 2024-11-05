import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Post } from '@components/Post/Post';
import { SkeletonPost } from '@components/SkeletonPost/SkeletonPost';
import { getPostRequest } from '@store/actions/postActions';
import { RootState } from '@store/types';

import './styles.scss';

export const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.posts.selectPost);
  const loading = useSelector((state: RootState) => state.posts.loading);
  const userId = useSelector((state: RootState) => state.user.userId);
  useEffect(() => {
    if (id) {
      dispatch(getPostRequest(id));
    }
  }, [id]);
  if (loading) {
    return <SkeletonPost />;
  }

  return (
    <section className="posat-page">
      {post ? <Post post={post} userId={userId} /> : <div>no tweet</div>}
    </section>
  );
};
