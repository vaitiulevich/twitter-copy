import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { DEFAULT_POST_FILES } from '@constants/constants';
import { images, images as imagesIcons } from '@constants/images';
import {
  ERR_COUNT_FILES,
  ERR_INVALID_DIMENSIONS,
  ERR_INVALID_FILE,
  ERR_INVALID_SIZE,
} from '@constants/messages';
import {
  isFileSizeValid,
  isImageDimensionsValid,
  isImageFile,
} from '@utils/checkImageFile';

import './styles.scss';

export interface ImageUploaderProps {
  name: string;
  setImagesSelected: (files: File[]) => void;
  initialFiles?: File[];
  countFiles?: number;
}

export const ImageUploader = ({
  setImagesSelected,
  name,
  initialFiles = [],
  countFiles = DEFAULT_POST_FILES,
}: ImageUploaderProps) => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [errors, setErrors] = useState<string[]>([]);

  const checkValidateImg = async (file: File) => {
    if (!isFileSizeValid(file)) {
      setErrors((prev) => [...prev, ERR_INVALID_SIZE]);
      return false;
    }
    const dimensionsValid = await isImageDimensionsValid(file);
    if (!dimensionsValid) {
      setErrors((prev) => [...prev, ERR_INVALID_DIMENSIONS]);
      return false;
    }
    return true;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setErrors([]);

    if (files.length + selectedFiles.length > countFiles) {
      setErrors((prev) => [...prev, ERR_COUNT_FILES + countFiles]);
      event.target.value = '';
      return;
    }

    const newFiles: File[] = [];

    selectedFiles.forEach((file) => {
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);

        if (isImageFile(byteArray)) {
          const isValidateImg = checkValidateImg(file);
          if (!isValidateImg) {
            return;
          }

          newFiles.push(file);
        } else {
          setErrors((prev) => [...prev, ERR_INVALID_FILE]);
        }

        if (newFiles.length + errors.length >= selectedFiles.length) {
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

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

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

  const renderFiles = () => {
    return files.map((file, index) => (
      <div key={index} className="selected-image-item">
        <img alt={file.name} src={URL.createObjectURL(file)} />
        <button
          onClick={() => handleRemoveFile(index)}
          className="delete-img-button"
        >
          <img src={images.deleteIcon} alt="delete" />
        </button>
      </div>
    ));
  };

  return (
    <div>
      <div className="add-img-button">
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
      </div>

      <div className="selected-images-block">
        <div className="selected-images">{renderFiles()}</div>
      </div>
    </div>
  );
};
