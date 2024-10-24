import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostRequest } from '@store/actions/postActions';
import { PostState } from '@store/reducers/userReducer';
import { selectUserId } from '@store/selectors';

import './styles.scss';
export const PostOptionsMenu = ({
  post,
  isOpen,
  togglePostMenu,
}: {
  isOpen: boolean;
  post: PostState;
  togglePostMenu: () => void;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

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
    dispatch(
      deletePostRequest(
        post.id || post.userId,
        post.userId,
        userId,
        post.images
      )
    );
  };
  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="post-menu">
      <div onClick={handleDelete} className="post-menu-item">
        Delete
      </div>
    </div>
  );
};
