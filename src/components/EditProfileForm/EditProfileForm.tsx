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
import { phoneValidation, stringRequired } from '@utils/validationSchemas';
import * as yup from 'yup';

import './styles.scss';

interface FormData {
  name: string;
  phone: string;
  description?: yup.Maybe<string | undefined>;
  dateBirth: string;
}

const validationSchema = yup.object().shape({
  name: stringRequired(2, 10),
  phone: phoneValidation,
  dateBirth: stringRequired(10, 10),
  description: yup
    .string()
    .min(1, ERR_INCORRECT_FILL)
    .max(300, ERR_INCORRECT_FILL)
    .notRequired(),
});

export const EditProfileForm = () => {
  const { control, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
  });
  const { name, description, dateBirth, phone, userId } =
    useSelector(selectUserSelector);
  const onSubmit = (data: FormData) => {
    console.log(data);
    updateUserData(userId, {
      ...data,
      avatarFile: selectedAvatar[0] ?? null,
      bannerFile: selectedBanner[0] ?? null,
    });
  };
  const dispatch = useDispatch();
  const [selectedBanner, setSelectedBanner] = useState<File[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<File[]>([]);

  async function updateUserData(
    userId: string,
    newData: FormData & { avatarFile?: File; bannerFile?: File }
  ) {
    dispatch(updateUserDataRequest(userId, newData));
  }
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
            countFiles={1}
          />
        </div>
        <div className="edit-profile-set-img">
          <span>Set profile image</span>
          <ImageUploader
            name="profile-avatar"
            setImagesSelected={setSelectedAvatar}
            initialFiles={selectedAvatar}
            countFiles={1}
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
