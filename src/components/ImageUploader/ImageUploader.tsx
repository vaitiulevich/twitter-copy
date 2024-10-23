import { ChangeEvent, useEffect, useState } from 'react';
import { MAX_POST_FILES } from '@constants/constants';
import { images, images as imagesIcons } from '@constants/images';
import { ERR_COUNT_FILES, ERR_INVALID_FILE } from '@constants/messages';
import { isImageFile } from '@utils/checkImageFile';

import './styles.scss';

interface ImageUploaderProps {
  name: string;
  setImagesSelected: (files: File[]) => void;
  initialFiles?: File[];
  countFiles?: number;
}

export const ImageUploader = ({
  setImagesSelected,
  name,
  initialFiles = [],
  countFiles = MAX_POST_FILES,
}: ImageUploaderProps) => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setErrors([]);

    if (files.length + selectedFiles.length > countFiles) {
      setErrors((prev) => [...prev, ERR_COUNT_FILES + countFiles]);
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
        }
      };

      fileReader.readAsArrayBuffer(file);
    });

    event.target.value = '';
  };
  useEffect(() => {
    setImagesSelected(files);
  }, [files]);

  const renderErrors = () => {
    return errors.map((error, index) => (
      <p key={index} className="error-messages">
        {error}
      </p>
    ));
  };
  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div>
      <label className="post-add-img" htmlFor={name}>
        <img src={imagesIcons.addImg} alt="add-img" />
      </label>
      <input
        id={name}
        className="img-input"
        accept=".png, .jpg, .jpeg"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <div>{renderErrors()}</div>
      <div className="selected-images-block">
        {files.length > 0 && <h3>Selected Images:</h3>}
        <div className="selected-images">
          {files.map((file, ind) => (
            <div key={file.name} className="selected-image-item">
              <img alt={file.name} src={URL.createObjectURL(file)} />
              <button
                onClick={() => handleRemoveFile(ind)}
                className="delete-img-button"
              >
                <img src={images.deleteIcon} alt="delete" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
