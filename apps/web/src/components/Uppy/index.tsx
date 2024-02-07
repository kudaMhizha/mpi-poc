import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import {Dashboard} from '@uppy/react';
import {FormField, FormItem, FormLabel} from '@mpi-app/ui';
import {Dispatch, FC, SetStateAction, useMemo} from 'react';
import {useUploadFileMutation} from 'generated-graphql';

import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/dashboard/dist/style.css';

interface IUppyInstance {
  setFileUploaded: Dispatch<SetStateAction<File | undefined>>;
}

const UppyInstance: FC<IUppyInstance> = ({setFileUploaded}) => {
  const [uploadFile] = useUploadFileMutation();
  const uppy = useMemo(() => {
    return new Uppy({
      id: 'mpi-uppy-instance',
      autoProceed: true,
      debug: true,
      restrictions: {
        maxNumberOfFiles: 1,
      },
    });
  }, []);

  uppy.use(AwsS3, {
    id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(), // secure random number generator,
    async getUploadParameters(file) {
      const variables = {
        userInput: {
          fileName: file.name,
          fileType: 'Config',
          buffer: file.data.toString(),
        },
      };

      try {
        const {data} = await uploadFile({variables});
        return {
          method: 'PUT',
          url: data?.uploadFile?.url || '',
          fields: {},
        };
      } catch (error) {
        console.error('Error fetching upload parameters:', error);
        return await Promise.reject(error);
      }
    },
  });

  uppy.on('upload-success', (file, response) => {
    setFileUploaded(file as File | undefined);
    console.log('File uploaded successfully:', file, response);
  });

  return (
    <div className="mt-8">
      <FormField
        name="file"
        render={() => (
          <FormItem>
            <FormLabel>File upload</FormLabel>
            <Dashboard
              uppy={uppy}
              plugins={['Aws']}
              metaFields={[
                {id: 'name', name: 'Name', placeholder: 'File name'},
              ]}
              proudlyDisplayPoweredByUppy={false}
              height={300}
            />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UppyInstance;
