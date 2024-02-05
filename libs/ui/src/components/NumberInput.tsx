import {useController, useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from './form';
import {Input} from './input';

type numberInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  isPhoneNumber?: boolean;
  isDisabled?: boolean;
};

export const NumberInput = ({
  name,
  label,
  placeholder,
  isPhoneNumber,
  isDisabled,
}: numberInputProps) => {
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
            <div className="flex items-center gap-2">
              {isPhoneNumber ? <h1>+27</h1> : <></>}
              <Input
                placeholder={placeholder}
                {...field}
                type="number"
                disabled={isDisabled}
              />
            </div>
          </FormControl>
          {showError ? <FormMessage className="text-red-600" /> : <></>}
        </FormItem>
      )}
    />
  );
};
