import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form';
import { Input } from '@components/Input/Input';

interface ControlledInputProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  placeholder?: string;
  error?: string;
  type?: string;
  defaultValue?: PathValue<T, Path<T>>;
}

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = 'text',
  defaultValue,
}: ControlledInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue ?? undefined,
  });
  return (
    <Input
      placeholder={placeholder}
      error={error}
      type={type}
      {...field}
      name={name}
    />
  );
};
