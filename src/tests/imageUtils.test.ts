import {
  jpgSignature,
  MAX_FILE_SIZE,
  pngSignature,
} from '@constants/constants';
import { isFileSizeValid, isImageFile } from '@utils/checkImageFile';

describe('Image Utility Functions', () => {
  describe('isImageFile', () => {
    it('should return true for a valid PNG signature', () => {
      const pngBytes = new Uint8Array(pngSignature.length);
      pngSignature.forEach((byte, index) => {
        pngBytes[index] = byte;
      });
      expect(isImageFile(pngBytes)).toBe(true);
    });

    it('should return true for a valid JPG signature', () => {
      const jpgBytes = new Uint8Array(jpgSignature.length);
      jpgSignature.forEach((byte, index) => {
        jpgBytes[index] = byte;
      });
      expect(isImageFile(jpgBytes)).toBe(true);
    });

    it('should return false for an invalid signature', () => {
      const invalidBytes = new Uint8Array([0, 1, 2, 3]);
      expect(isImageFile(invalidBytes)).toBe(false);
    });
  });

  describe('isFileSizeValid', () => {
    it('should return true for a valid file size', () => {
      const file = new File(['a'.repeat(MAX_FILE_SIZE)], 'test.png', {
        type: 'image/png',
      });
      expect(isFileSizeValid(file)).toBe(true);
    });

    it('should return false for an oversized file', () => {
      const oversizedFile = new File(
        ['a'.repeat(MAX_FILE_SIZE + 1)],
        'test.png',
        { type: 'image/png' }
      );
      expect(isFileSizeValid(oversizedFile)).toBe(false);
    });
  });
});
