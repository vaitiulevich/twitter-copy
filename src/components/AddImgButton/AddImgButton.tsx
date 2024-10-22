import { ChangeEvent, useState } from 'react';
import { MAX_POST_FILES } from '@constants/constants';
import { images as imagesIcons } from '@constants/images';
import { ERR_COUNT_POST_FILES, ERR_INVALID_FILE } from '@constants/messages';
import { isImageFile } from '@utils/checkImageFile';

import './styles.scss';
interface AddImgButtonProps {
  handleImgSelect: (files: File[]) => void;
  images: File[];
}
export const AddImgButton = ({
  handleImgSelect,
  images,
}: AddImgButtonProps) => {
  const [files, setFiles] = useState<File[]>(images);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setErrors([]);
    if (files.length + selectedFiles.length > MAX_POST_FILES) {
      setErrors((prev) => [...prev, ERR_COUNT_POST_FILES]);
      return;
    }

    const newFiles: File[] = [];

    selectedFiles.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);

        if (isImageFile(byteArray)) {
          newFiles.push(file);
        } else {
          setErrors((prev) => [...prev, ERR_INVALID_FILE]);
        }

        if (newFiles.length + errors.length === selectedFiles.length) {
          const updatedFiles = [...files, ...newFiles];
          setFiles(updatedFiles);
          handleImgSelect(updatedFiles);
        }
      };

      fileReader.readAsArrayBuffer(file);
    });
    event.target.value = '';
  };

  const renderErrors = () => {
    return errors.map((error, index) => (
      <p key={index} className="error-messages">
        {error}
      </p>
    ));
  };

  return (
    <div>
      <label className="post-add-img" htmlFor="img-input">
        <img src={imagesIcons.addImg} alt="add-img" />
      </label>
      <input
        id="img-input"
        accept=".png, .jpg, .jpeg"
        multiple
        type={'file'}
        onChange={handleFileChange}
      />
      <div>{renderErrors()}</div>
    </div>
  );
};
