import {BlockUserDrawer, PageHeader, PermissionsBox} from '@/web/components';
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
  Switch,
  TextInput,
} from '@mpi-app/ui';
import {ArrowLeft, PencilSimple} from '@phosphor-icons/react';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {addUserDefaultValues, addUserSchema} from '../AddUserScreen/Validation';

const firmwareOptions: any = [
  {title: '1V24', isAvailable: true},
  {title: '1V25', isAvailable: false},
  {title: '1V26', isAvailable: true},
  {title: '1V27', isAvailable: false},
];

const toolsOptions: any = [
  {title: 'VDU config', isAvailable: true},
  {title: 'PPS config', isAvailable: false},
  {title: 'Application loader', isAvailable: true},
  {title: 'Log downloader', isAvailable: true},
];

const configFilesOptions: any = [
  {title: 'VDU configs', isAvailable: true},
  {title: 'CAT 77G', isAvailable: true},
  {title: 'LDV', isAvailable: false},
  {title: 'Dozer', isAvailable: false},
];

const EditUserScreen = () => {
  const methods = useForm({
    defaultValues: addUserDefaultValues,
    resolver: zodResolver(addUserSchema),
  });

  const [isEditable, setIsEditable] = useState(false);

  const navigate = useNavigate();

  const onSubmit = () => {};
  return (
    <>
      <PageHeader title="Edit user" />
      <div className="mt-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          Edit fields
          <Switch
            onClick={() => {
              setIsEditable(!isEditable);
            }}
          />
        </div>
        <BlockUserDrawer />
      </div>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid gap-6 mt-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                name="name"
                label="Name"
                placeholder="Enter name"
                isDisabled={!isEditable}
              />
              <TextInput
                name="surname"
                label="Surname"
                placeholder="Enter surname"
                isDisabled={!isEditable}
              />
              <TextInput
                name="email"
                label="Email"
                placeholder="Enter email"
                isDisabled={!isEditable}
              />
            </div>
            <div className="grid gap-6 mt-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                name="jobDescription"
                label="Job Description"
                placeholder="Enter job description"
                isDisabled={!isEditable}
              />
              <NumberInput
                name="phone"
                label="Phone"
                placeholder="Enter phone number"
                isDisabled={!isEditable}
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
                      disabled={!isEditable}
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
            <div className="flex justify-around mt-8">
              <PermissionsBox permissions={firmwareOptions} title="Firmware" />
              <PermissionsBox permissions={toolsOptions} title="Tools" />
              <PermissionsBox
                permissions={configFilesOptions}
                title="Config files"
              />
            </div>
            <div className="flex justify-between mt-8">
              <Button onClick={() => navigate(-1)} variant={'secondary'}>
                <ArrowLeft className="mr-2" />
                Go Back
              </Button>
              {isEditable ? (
                <Button onClick={() => onSubmit}>
                  <PencilSimple className="mr-2" />
                  Save user details
                </Button>
              ) : (
                <></>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default EditUserScreen;
