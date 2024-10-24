import {
  Control,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Input } from '@components/Input/Input';
import { PHONE_MASK_LENGTH } from '@constants/constants';
import { resetError } from '@store/actions/authActions';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';

interface ControlledInputProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  placeholder?: string;
  error?: FieldError;
  type?: string;
  max?: string;
  defaultValue?: PathValue<T, Path<T>>;
}

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = 'text',
  defaultValue,
  ...props
}: ControlledInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue ?? undefined,
  });
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isFormatPhone = type === 'phone';
    dispatch(resetError());

    if (isFormatPhone && value.length > PHONE_MASK_LENGTH) {
      return;
    }
    field.onChange(isFormatPhone ? formatPhoneNumber(value) : value);
  };
  return (
    <Input
      placeholder={placeholder}
      error={error}
      type={type}
      {...field}
      {...props}
      onChange={handleChange}
      name={name}
    />
  );
};
