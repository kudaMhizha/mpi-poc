import {Button, Separator} from '@mpi-app/ui';
import HeaderText from '@mpi-app/ui/components/headerText';

type PageHeaderProps = {
  title: string;
  button?: string;
  onClick?: () => void;
  icon?: JSX.Element;
};

const PageHeader = ({title, button, onClick, icon}: PageHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center gap-4 py-8">
        <div className="flex items-center flex-wrap gap-4 text-4xl">
          {icon ? icon : <></>}
          <HeaderText>{title}</HeaderText>
        </div>

        {button ? (
          <Button onClick={onClick} className="rounded-lg">
            {button}
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Separator />
    </>
  );
};

export default PageHeader;
