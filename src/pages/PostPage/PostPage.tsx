import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Post } from '@components/Post/Post';
import { selectPostById, selectUserId } from '@store/selectors';
import { RootState } from '@store/types';

import './styles.scss';

export const PostPage = () => {
  const { id } = useParams();
  const post = id
    ? useSelector((state: RootState) => selectPostById(state, id))
    : null;
  const userId = useSelector(selectUserId);
  return (
    <section className="posat-page">
      {post ? <Post post={post} userId={userId} /> : <div>no tweets</div>}
    </section>
  );
};
