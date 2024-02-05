import {useController, useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from './form';
import {Input} from './input';

type TextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
};

export const TextInput = ({
  name,
  label,
  placeholder,
  isDisabled,
}: TextInputProps) => {
  const {control} = useFormContext();

  const {fieldState, field} = useController({
    name,
    control,
  });

  const showError =
    (fieldState.isDirty && !!fieldState.error) || fieldState.invalid;

  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl {...fieldState}>
            <Input placeholder={placeholder} {...field} disabled={isDisabled} />
          </FormControl>
          {showError ? <FormMessage className="text-red-600" /> : <></>}
        </FormItem>
      )}
    />
  );
};
