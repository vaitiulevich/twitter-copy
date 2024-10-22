import { ChangeEvent, useState } from 'react';
import { images } from '@constants/images';

import './styles.scss';
export const AddImgButton = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFiles = Array.from(event.target.files || []);
  //   setErrors([]);
  //   if (files.length + selectedFiles.length > 5) {
  //     setErrors((prev) => [...prev, 'Максимум 5 изображений можно загрузить.']);
  //     return;
  //   }

  //   const validFormats = ['image/png', 'image/jpeg'];
  //   const maxSize = 5 * 1024 * 1024; // 5 МБ
  //   const newFiles: File[] = [];

  //   for (const file of selectedFiles) {
  //     if (!validFormats.includes(file.type)) {
  //       setErrors((prev) => [
  //         ...prev,
  //         `Файл ${file.name} имеет недопустимый формат.`,
  //       ]);
  //     } else if (file.size > maxSize) {
  //       setErrors((prev) => [
  //         ...prev,
  //         `Файл ${file.name} превышает максимальный размер 5 МБ.`,
  //       ]);
  //     } else if (
  //       !files.some((existingFile) => existingFile.name === file.name)
  //     ) {
  //       newFiles.push(file);
  //     } else {
  //       setErrors((prev) => [...prev, `Файл ${file.name} уже был загружен.`]);
  //     }
  //   }

  //   setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  // };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div>
      <label className="post-add-img" htmlFor="img-input">
        <img src={images.addImg} alt="add-img" />
      </label>
      <input
        id="img-input"
        style={{ display: 'none' }}
        accept=".png, .jpg, .jpeg"
        multiple
        type={'file'}
        onChange={handleFileChange}
      />
      <div className="error-messages">
        {errors.map((error, index) => (
          <p key={index} className="error">
            {error}
          </p>
        ))}
      </div>
      <div className="file-list">
        {files.length > 0 && <h2>Выбранные файлы:</h2>}
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
