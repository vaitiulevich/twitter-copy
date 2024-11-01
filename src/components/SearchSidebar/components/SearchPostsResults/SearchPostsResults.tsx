import { Link } from 'react-router-dom';
import { PostHeader } from '@components/PostHeader/PostHeader';
import { PostState } from '@store/reducers/postReducer';

interface PostResultsProps {
  posts: PostState[];
}

export const SearchPostsResults = ({ posts }: PostResultsProps) => {
  return (
    <>
      {posts.map((post) => (
        <div className="search-post-results" key={post.id}>
          <PostHeader post={post} isOriginPost={false} />
          {post.content && (
            <Link to={`/home/posts/${post.id}`}>
              <p>{post.content.join(' ')}</p>
            </Link>
          )}
        </div>
      ))}
    </>
  );
};
