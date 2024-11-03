import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@components/Button/Button';
import { ImageUploader } from '@components/ImageUploader/ImageUploader';
import { NotificationPopUp } from '@components/NotificationPopUp/NotificationPopUp';
import { MAX_CHARS_IN_POST, MAX_POST_FILES } from '@constants/constants';
import { images } from '@constants/images';
import { hideErrorPopUp } from '@store/actions/popUpActions';
import { addPostFailure, addPostRequest } from '@store/actions/postActions';
import { PostState } from '@store/reducers/postReducer';
import { selectPostLoad } from '@store/selectors';
import { RootState } from '@store/types';

import './styles.scss';

export const AddPostPanel = ({
  location = 'post-images',
  onCloseModal,
}: {
  location?: string;
  onCloseModal?: () => void;
}) => {
  const [postContent, setPostContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const { error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const loading = useSelector(selectPostLoad);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= MAX_CHARS_IN_POST) {
      setPostContent(value);
    }
  };

  const handlePostSubmit = () => {
    const postData: PostState = {
      content: postContent.split(' '),
      images: [],
      files: selectedFiles ?? [],
      likes: [],
      userId: user.userId,
      userSlug: user.userSlug,
      userName: user.name,
      userAvatar: null,
      timestamp: new Date().getTime(),
      postId: '',
    };
    dispatch(addPostRequest(postData, onCloseModal ?? undefined));
    setPostContent('');
    setSelectedFiles([]);
  };

  const handleClose = () => {
    dispatch(hideErrorPopUp());
    dispatch(addPostFailure(null));
  };
  const currentLength = postContent.length;
  const isDisableBtn =
    (!postContent.trim() && selectedFiles.length === 0) || loading;
  return (
    <div className="add-post-panel">
      <div className="add-post-avatar">
        <img src={user.avatar ?? images.avatar} alt="avatar" />
      </div>
      <div className="add-posts-block">
        <div>
          <div className="post-char-count">
            <span>
              {currentLength}/{MAX_CHARS_IN_POST}
            </span>
          </div>
          <textarea
            value={postContent}
            className="post-input"
            onChange={handleTextareaChange}
            placeholder="What’s happening"
          />
        </div>

        <div className="post-add-btns">
          <ImageUploader
            name={location}
            setImagesSelected={setSelectedFiles}
            initialFiles={selectedFiles}
            countFiles={MAX_POST_FILES}
          />
          <Button
            text="Tweet"
            loading={loading}
            className="tweet-add"
            disabled={isDisableBtn}
            onClick={handlePostSubmit}
          />
        </div>
      </div>
      {error && <NotificationPopUp message={error} onClose={handleClose} />}
    </div>
  );
};
