import {PageHeader} from '@/web/components';
import {inputValidations} from '@/web/constants/validations';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  TextInput,
  TextAreaInput,
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@mpi-app/ui';
import {ArrowLeft, Headset, Plus} from '@phosphor-icons/react';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';

const SupportInput = {
  configType: '',
  message: '',
};

export const SupportRequestSchema = z.object({
  configType: z.string().min(1, inputValidations.requiredField),
  message: z.string().min(1, inputValidations.requiredField),
});

export default function SubmitSupportRequest() {
  const methods = useForm({
    defaultValues: SupportInput,
    resolver: zodResolver(SupportRequestSchema),
  });

  // const onSubmit = () => {
  // payload should include:
  // companyId
  // userId
  // Configuration type
  // message
  // };

  return (
    <>
      <PageHeader title="Support Request" icon={<Headset />} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => null)}>
          <div className="grid gap-6 mt-8 grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* if user is not logged in, show user details e.g. name, email */}
            <TextInput
              name="name"
              label="Full name"
              placeholder="Enter your full name"
              data-testid="supportRequestFullName"
            />
            <TextInput
              name="email"
              label="Email address"
              placeholder="Enter email address"
            />
            <FormField
              control={methods.control}
              name="configType"
              render={({field}) => (
                <FormItem datatest-id="configTypeFormItem">
                  <FormLabel>Configuration type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select configuration type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Config Type 1</SelectItem>
                      <SelectItem value="2">Config type 2</SelectItem>
                      <SelectItem value="3">Config type 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-4">
            <TextAreaInput
              name="message"
              label="Support request"
              placeholder="Enter support request message"
            />
          </div>
          <Button
            variant={'secondary'}
            className="mr-4"
            data-testid="goBackButton"
          >
            <ArrowLeft className="mr-2" />
            Go Back
          </Button>
          <Button data-testid="submitButton">
            <Plus className="mr-2" />
            Submit Support Request
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
