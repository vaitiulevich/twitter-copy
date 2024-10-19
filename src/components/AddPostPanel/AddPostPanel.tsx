import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddImgButton } from '@components/AddImgButton/AddImgButton';
import { Button } from '@components/Button/Button';
import { images } from '@constants/images';
import { addPostRequest } from '@store/actions/postActions';
import { PostState } from '@store/reducers/userReducer';
import { RootState } from '@store/types';

import './styles.scss';

export const AddPostPanel = () => {
  const [postContent, setPostContent] = useState('');
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    const postData: PostState = {
      content: postContent,
      images: [],
      likes: [],
      userId: user.userId,
      userSlug: user.userSlug,
      userName: user.name,
      userAvatar: null,
      timestamp: new Date().getTime(),
      postId: '',
    };

    dispatch(addPostRequest(postData));
    setPostContent('');
  };
  return (
    <div className="add-post-panel">
      <div className="add-post-avatar">
        <img src={user.avatar ?? images.avatar} alt="avatar" />
      </div>
      <div className="add-posts-block">
        <textarea
          value={postContent}
          className="post-input"
          onChange={handleTextareaChange}
          placeholder="What’s happening"
        />
        <div className="post-add-btns">
          <AddImgButton />
          <Button
            text="Tweet"
            className="tweet-add"
            disabled={!postContent.trim()}
            onClick={handlePostSubmit}
          />
        </div>
      </div>
    </div>
  );
};
