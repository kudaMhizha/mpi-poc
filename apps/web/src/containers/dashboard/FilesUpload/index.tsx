import {PageHeader, UppyInstance} from '@/web/components';
import {Upload} from '@phosphor-icons/react';
import {inputValidations} from '@/web/constants/validations';
import {zodResolver} from '@hookform/resolvers/zod';
import {TextInput} from '@mpi-app/ui';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import {useState} from 'react';

const FileUploadSchema = z.object({
  filename: z.string().min(1, inputValidations.requiredField),
});

const FileUpload = () => {
  const [fileUploaded, setFileUploaded] = useState<File>();
  const methods = useForm({
    defaultValues: {filename: ''},
    resolver: zodResolver(FileUploadSchema),
  });

  const onSubmit = () => {};

  return (
    <>
      <PageHeader title="File Uploads" icon={<Upload />} />
      <div className="pt-8 w-1/3">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TextInput
              name="filename"
              label="File name"
              placeholder="Enter the file name"
            />
            <UppyInstance setFileUploaded={setFileUploaded} />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default FileUpload;
