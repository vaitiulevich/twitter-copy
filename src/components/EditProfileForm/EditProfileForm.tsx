import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@components/Button/Button';
import { ControlledInput } from '@components/ControlledInput/ControlledInput';
import { ImageUploader } from '@components/ImageUploader/ImageUploader';
import { ERR_INCORRECT_FILL, ERR_REQUIRED } from '@constants/messages';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserDataRequest } from '@store/actions/userActions';
import { selectUserSelector } from '@store/selectors';
import {
  editProfileValidationSchema,
  phoneValidation,
  stringRequired,
} from '@utils/validationSchemas';
import * as yup from 'yup';

import './styles.scss';

interface FormData {
  name: string;
  phone: string;
  description?: yup.Maybe<string | undefined>;
  dateBirth: string;
}

export const EditProfileForm = () => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(editProfileValidationSchema),
  });
  const { name, description, dateBirth, phone, userId } =
    useSelector(selectUserSelector);
  const onSubmit = (data: FormData) => {
    const newData = {
      ...data,
      avatarFile: selectedAvatar[0] ?? null,
      bannerFile: selectedBanner[0] ?? null,
    };
    dispatch(updateUserDataRequest(userId, newData));
  };
  const dispatch = useDispatch();
  const [selectedBanner, setSelectedBanner] = useState<File[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<File[]>([]);

  const today = new Date().toISOString().split('T')[0];
  return (
    <div>
      <div>
        <div className="edit-profile-set-img">
          <span>Set banner image</span>

          <ImageUploader
            name="profile-banner"
            setImagesSelected={setSelectedBanner}
            initialFiles={selectedBanner}
          />
        </div>
        <div className="edit-profile-set-img">
          <span>Set profile image</span>
          <ImageUploader
            name="profile-avatar"
            setImagesSelected={setSelectedAvatar}
            initialFiles={selectedAvatar}
          />
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
        <Button type="submit" text="Update" />
      </form>
    </div>
  );
};
