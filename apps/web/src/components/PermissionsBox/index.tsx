import {Checkbox} from '@mpi-app/ui';
import Text from '@mpi-app/ui/components/text';

type PermissionsBoxProps = {
  permissions: Array<Permission>;
  title: string;
};

export type Permission = {
  title: string;
  isAvailable: boolean;
};

const PermissionsBox = ({permissions, title}: PermissionsBoxProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Text>{title}</Text>
      <div className="flex flex-col">
        {permissions.map((item: Permission) => {
          return (
            <div className="flex items-center space-x-2 mt-2" key={item.title}>
              <Checkbox id={item.title} disabled checked={item.isAvailable} />
              <label
                htmlFor={item.title}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.title}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionsBox;
