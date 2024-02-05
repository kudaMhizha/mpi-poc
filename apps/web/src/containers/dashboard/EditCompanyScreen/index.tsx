import {PageHeader} from '@/web/components';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, NumberInput, Switch, TextInput} from '@mpi-app/ui';
import {ArrowLeft, PencilSimple} from '@phosphor-icons/react';
import {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {z} from 'zod';
import {addCompanySchema} from '../AddCompanyScreen/Validation';

const EditCompanyScreen = () => {
  const methods = useForm<z.infer<typeof addCompanySchema>>({
    resolver: zodResolver(addCompanySchema),
    defaultValues: {
      companyName: 'default ',
      address: 'default',
      contactPerson: 'default',
      contactPersonEmail: 'default@gmail.com',
      contactPersonPhone: '1234567890',
      secondaryContactPerson: 'defuault',
      secondaryContactPersonEmail: 'default@gmail.com',
      secondaryContactPersonPhone: '1234567890',
    },
  });

  const navigate = useNavigate();

  const onSubmit = () => {};

  const [isEditable, setIsEditable] = useState(false);

  return (
    <>
      <PageHeader title="Edit company details" />
      <div className="mt-8 flex items-center gap-2">
        Edit fields
        <Switch
          onClick={() => {
            setIsEditable(!isEditable);
          }}
        />
      </div>
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid gap-6 mt-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <TextInput
                name="companyName"
                label="Company Name"
                placeholder="Enter company name"
                isDisabled={!isEditable}
              />
              <TextInput
                name="address"
                label="Address"
                placeholder="Enter address"
                isDisabled={!isEditable}
              />
              <TextInput
                name="contactPerson"
                label="Contact Person"
                placeholder="Enter contact peron"
                isDisabled={!isEditable}
              />
              <TextInput
                name="contactPersonEmail"
                label="Contact Person Email"
                placeholder="Enter Email"
                isDisabled={!isEditable}
              />
            </div>
            <div className="grid gap-4 mt-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <NumberInput
                name="contactPersonPhone"
                label="Contact Person Phone"
                placeholder="Enter phone"
                isPhoneNumber
                isDisabled={!isEditable}
              />
              <TextInput
                name="secondaryContactPerson"
                label=" Secondary Contact Person"
                placeholder="Enter contact person"
                isDisabled={!isEditable}
              />
              <TextInput
                name="secondaryContactPersonEmail"
                label=" Secondary Contact Person Email"
                placeholder="Enter email"
                isDisabled={!isEditable}
              />
              <NumberInput
                name="secondaryContactPersonPhone"
                label=" Secondary Contact Person Phone"
                placeholder="Enter phone"
                isPhoneNumber
                isDisabled={!isEditable}
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
                  Save company details
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

export default EditCompanyScreen;
