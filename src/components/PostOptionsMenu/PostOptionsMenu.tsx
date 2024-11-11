import { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostRequest } from '@store/actions/postActions';
import { PostState } from '@store/reducers/postReducer';
import { selectUserId } from '@store/selectors';

import './styles.scss';
interface PostOptionsMenuProps {
  isOpen: boolean;
  post: PostState;
  togglePostMenu: () => void;
}
export const PostOptionsMenu = memo(
  ({ post, isOpen, togglePostMenu }: PostOptionsMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const originId = useSelector(selectUserId);
    const { id, userId, images } = post;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        togglePostMenu();
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleDelete = () => {
      dispatch(deletePostRequest(id || userId, userId, originId, images));
    };
    if (!isOpen) return null;

    return (
      <div ref={menuRef} className="post-menu">
        <div onClick={handleDelete} className="post-menu-item">
          Delete
        </div>
      </div>
    );
  }
);
