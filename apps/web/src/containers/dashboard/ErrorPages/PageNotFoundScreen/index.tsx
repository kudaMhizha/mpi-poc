import {Button} from '@mpi-app/ui';
import {ArrowLeft, XCircle} from '@phosphor-icons/react';
import {useNavigate} from 'react-router-dom';

const PageNotFoundScreen = () => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col items-center justify-center w-full h-96`}>
      <div className="m-8">
        <XCircle width={120} height={120} />
      </div>
      <h1 className="text-4xl font-bold">404</h1>
      <h1 className="text-4xl font-bold ">Page Not Found</h1>

      <Button
        className=" flex gap-2 ronded-lg mt-8 rounded-full"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft />
        <h1>Go Back</h1>
      </Button>
    </div>
  );
};

export default PageNotFoundScreen;
