import { ChangeEvent, useState } from 'react';
import { images } from '@constants/images';
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';

import './styles.scss';
export const AddImgButton = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };
  const uploadImage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const fileRef = storageRef(storage, `images/${file.name}`);

    await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };
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
