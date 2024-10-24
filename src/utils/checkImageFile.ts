import { jpgSignature, pngSignature } from '@constants/constants';

export const isImageFile = (byteArray: Uint8Array) => {
  if (
    byteArray.length >= 8 &&
    byteArray.slice(0, 8).every((byte, index) => byte === pngSignature[index])
  ) {
    return true;
  }

  if (
    byteArray.length >= 2 &&
    byteArray[0] === jpgSignature[0] &&
    byteArray[1] === jpgSignature[1]
  ) {
    return true;
  }

  return false;
};
