import {
  ImageUploader,
  ImageUploaderProps,
} from '@components/ImageUploader/ImageUploader';

import './styles.scss';

interface ImageUploadSectionProps extends ImageUploaderProps {
  label: string;
  previewImg: string;
}
export const ImageUploaderSection = ({
  label,
  name,
  setImagesSelected,
  initialFiles,
  previewImg,
}: ImageUploadSectionProps) => (
  <div className="edit-profile-set-img">
    <span className="edit-profile-imgs-label">{label}</span>
    <div className="edit-profile-imgs">
      <ImageUploader
        name={name}
        setImagesSelected={setImagesSelected}
        initialFiles={initialFiles}
      />
      {initialFiles && initialFiles.length < 1 && (
        <div className="image-from-profile">
          <img src={previewImg} alt={label} />
        </div>
      )}
    </div>
  </div>
);
