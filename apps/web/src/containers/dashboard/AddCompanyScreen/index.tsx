import {PageHeader} from '@/web/components';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, NumberInput, TextInput} from '@mpi-app/ui';
import {ArrowLeft} from '@phosphor-icons/react';
import {Plus} from '@phosphor-icons/react/dist/ssr';
import {FormProvider, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {addCompanyDefaultValues, addCompanySchema} from './Validation';

const AddCompanyScreen = () => {
  const methods = useForm({
    defaultValues: addCompanyDefaultValues,
    resolver: zodResolver(addCompanySchema),
  });

  const onSubmit = () => {};

  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Add new company" />
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid gap-6 mt-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <TextInput
                name="companyName"
                label="Company Name"
                placeholder="Enter company name"
              />
              <TextInput
                name="address"
                label="Address"
                placeholder="Enter address"
              />
              <TextInput
                name="contactPerson"
                label="Contact Person"
                placeholder="Enter contact peron"
              />
              <TextInput
                name="contactPersonEmail"
                label="Contact Person Email"
                placeholder="Enter Email"
              />
            </div>
            <div className="grid gap-4 mt-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              <NumberInput
                name="contactPersonPhone"
                label="Contact Person Phone"
                placeholder="Enter phone"
                isPhoneNumber
              />
              <TextInput
                name="secondaryContactPerson"
                label=" Secondary Contact Person"
                placeholder="Enter contact person"
              />
              <TextInput
                name="secondaryContactPersonEmail"
                label=" Secondary Contact Person Email"
                placeholder="Enter email"
              />
              <NumberInput
                name="secondaryContactPersonPhone"
                label=" Secondary Contact Person Phone"
                placeholder="Enter phone"
                isPhoneNumber
              />
            </div>
            <div className="flex justify-between mt-8">
              <Button onClick={() => navigate(-1)} variant={'secondary'}>
                <ArrowLeft className="mr-2" />
                Go Back
              </Button>
              <Button onClick={onSubmit}>
                <Plus className="mr-2" />
                Add company
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddCompanyScreen;
