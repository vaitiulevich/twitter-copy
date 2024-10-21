import { ChangeEvent, useState } from 'react';
import { images } from '@constants/images';

import './styles.scss';
export const AddImgButton = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div>
      <label className="post-add-img" htmlFor="img-input">
        <img src={images.addImg} alt="add-img" />
      </label>
      <input
        id="img-input"
        style={{ display: 'none' }}
        type={'file'}
        onChange={handleImageChange}
      />
    </div>
  );
};
