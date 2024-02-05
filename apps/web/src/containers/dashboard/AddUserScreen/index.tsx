import {PageHeader} from '@/web/components';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  NumberInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextInput,
} from '@mpi-app/ui';
import {ArrowLeft, Plus} from '@phosphor-icons/react';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {addUserDefaultValues, addUserSchema} from './Validation';

const AddUserScreen = () => {
  const methods = useForm({
    defaultValues: addUserDefaultValues,
    resolver: zodResolver(addUserSchema),
  });

  const navigate = useNavigate();

  const onSubmit = () => {};
  return (
    <>
      <PageHeader title="Add a new user" />
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid gap-6 mt-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              <TextInput name="name" label="Name" placeholder="Enter name" />
              <TextInput
                name="surname"
                label="Surname"
                placeholder="Enter surname"
              />
              <TextInput name="email" label="Email" placeholder="Enter email" />
            </div>
            <div className="grid gap-6 mt-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                name="jobDescription"
                label="Job Description"
                placeholder="Enter job description"
              />
              <NumberInput
                name="phone"
                label="Phone"
                placeholder="Enter phone number"
              />
              <FormField
                control={methods.control}
                name="accessLevel"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Access Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an access level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between mt-8">
              <Button onClick={() => navigate(-1)} variant={'secondary'}>
                <ArrowLeft className="mr-2" />
                Go Back
              </Button>
              <Button onClick={() => onSubmit}>
                <Plus className="mr-2" />
                Add user
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddUserScreen;
