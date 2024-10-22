import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddImgButton } from '@components/AddImgButton/AddImgButton';
import { Button } from '@components/Button/Button';
import { images } from '@constants/images';
import { addPostRequest } from '@store/actions/postActions';
import { PostState } from '@store/reducers/userReducer';
import { selectPostLoad } from '@store/selectors';
import { RootState } from '@store/types';

import './styles.scss';

export const AddPostPanel = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const loading = useSelector(selectPostLoad);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };
  const handleImgSelect = (files: File[]) => {
    console.log(files);
    setSelectedFiles(files);
  };
  const handleDeleteImg = (fileToRemove: File) => {
    const newFiles = selectedFiles.filter((file) => file !== fileToRemove);
    handleImgSelect(newFiles);
  };

  const handlePostSubmit = () => {
    const postData: PostState = {
      content: postContent,
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
    dispatch(addPostRequest(postData));
    setPostContent('');
    setSelectedFiles([]);
  };

  const renderPosts = () => {
    return selectedFiles.map((file, index) => (
      <div className="selected-image-item" key={index}>
        <img alt={file.name} src={URL.createObjectURL(file)} />
        <button
          onClick={() => handleDeleteImg(file)}
          className="delete-img-button"
        >
          <img src={images.deleteIcon} alt="delete" />
        </button>
      </div>
    ));
  };
  const isDisableBtn =
    !postContent.trim() && selectedFiles.length === 0 && loading;
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
          <AddImgButton
            images={selectedFiles}
            handleImgSelect={handleImgSelect}
          />
          <Button
            text={loading ? 'Loading..' : 'Tweet'}
            className="tweet-add"
            disabled={isDisableBtn}
            onClick={handlePostSubmit}
          />
        </div>
        <div className="selected-images-block">
          {selectedFiles.length > 0 && <h3>Images:</h3>}
          <div className="selected-images">{renderPosts()}</div>
        </div>
      </div>
    </div>
  );
};
