import {
  jpgSignature,
  MAX_FILE_SIZE,
  MAX_HEIGHT,
  MAX_WIDTH,
  pngSignature,
} from '@constants/constants';

const isPngSignature = (byteArray: Uint8Array) =>
  byteArray.length >= 8 &&
  byteArray.slice(0, 8).every((byte, index) => byte === pngSignature[index]);

const isJpgSignature = (byteArray: Uint8Array) =>
  byteArray.length >= 2 &&
  byteArray[0] === jpgSignature[0] &&
  byteArray[1] === jpgSignature[1];

export const isImageFile = (byteArray: Uint8Array) =>
  isPngSignature(byteArray) || isJpgSignature(byteArray);

export const isFileSizeValid = (file: File) => {
  return file.size <= MAX_FILE_SIZE;
};
export const isImageDimensionsValid = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      resolve(img.width <= MAX_WIDTH && img.height <= MAX_HEIGHT);
    };
    img.onerror = () => {
      resolve(false);
    };
  });
};
