import { Link } from 'react-router-dom';
import { images } from '@constants/images';
import { PostState } from '@store/reducers/postReducer';

import './styles.scss';

interface PostResultsProps {
  posts: PostState[];
}

export const SearchPostsResults = ({ posts }: PostResultsProps) => {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="search-post-results">
          <Link to={`/home/posts/${post.id}`}>
            <div className="search-post-header">
              <div className="search-post-avatar">
                <img src={post.userAvatar ?? images.avatar} />
              </div>
              <h3 className="search-post-name">{post.userName}</h3>
            </div>
            {post.content && (
              <p className="search-post-content">{post.content.join(' ')}</p>
            )}
          </Link>
        </div>
      ))}
    </>
  );
};
