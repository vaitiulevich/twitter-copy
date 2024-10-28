import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@components/Button/Button';
import { ControlledInput } from '@components/ControlledInput/ControlledInput';
import { ImageUploader } from '@components/ImageUploader/ImageUploader';
import { images } from '@constants/images';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserDataRequest } from '@store/actions/userActions';
import { selectUserLoad, selectUserSelector } from '@store/selectors';
import { formatDate } from '@utils/formatDate';
import { editProfileValidationSchema } from '@utils/validationSchemas';
import * as yup from 'yup';

import './styles.scss';

interface FormData {
  name: string;
  phone: string;
  description?: yup.Maybe<string | undefined>;
  dateBirth: Date;
}

export const EditProfileForm = ({
  onCloseModal,
}: {
  onCloseModal?: () => void;
}) => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(editProfileValidationSchema),
  });
  const { name, description, dateBirth, phone, userId, avatar, profileImg } =
    useSelector(selectUserSelector);
  const onSubmit = (data: FormData) => {
    const { dateBirth } = data;
    const dateString = formatDate(dateBirth);
    const newData = {
      ...data,
      dateBirth: dateString,
      avatarFile: selectedAvatar[0] ?? null,
      bannerFile: selectedBanner[0] ?? null,
    };
    if (onCloseModal) {
      dispatch(updateUserDataRequest(userId, newData, onCloseModal));
    } else {
      dispatch(updateUserDataRequest(userId, newData));
    }
  };
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoad);
  const [selectedBanner, setSelectedBanner] = useState<File[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<File[]>([]);

  const today = new Date().toISOString().split('T')[0];
  return (
    <div>
      <div>
        <div className="edit-profile-set-img">
          <span className="edit-profile-imgs-label">Set banner image</span>
          <div className="edit-profile-imgs">
            <ImageUploader
              name="profile-banner"
              setImagesSelected={setSelectedBanner}
              initialFiles={selectedBanner}
            />
            {selectedBanner.length < 1 && (
              <div className="image-from-profile">
                <img src={profileImg ?? images.banner} />
              </div>
            )}
          </div>
        </div>
        <div className="edit-profile-set-img">
          <span className="edit-profile-imgs-label">Set profile image</span>
          <div className="edit-profile-imgs">
            <ImageUploader
              name="profile-avatar"
              setImagesSelected={setSelectedAvatar}
              initialFiles={selectedAvatar}
            />
            {selectedAvatar.length < 1 && (
              <div className="image-from-profile">
                <img src={avatar ?? images.avatar} />
              </div>
            )}
          </div>
        </div>
      </div>
      <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          defaultValue={name}
          name="name"
          control={control}
          placeholder="Name"
        />
        <ControlledInput
          defaultValue={phone}
          name="phone"
          control={control}
          placeholder="Phone"
        />
        <ControlledInput
          name="description"
          defaultValue={description}
          control={control}
          placeholder="description"
        />
        <ControlledInput
          name="dateBirth"
          type="date"
          max={today}
          defaultValue={dateBirth}
          control={control}
          placeholder="dateBirth"
        />
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
          text="Update"
        />
      </form>
    </div>
  );
};
