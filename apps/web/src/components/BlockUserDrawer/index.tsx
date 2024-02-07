import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@mpi-app/ui';

type BlockUserDrawerProps = {
  userId?: string;
};

const BlockUserDrawer = ({userId}: BlockUserDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Block User</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex justify-center">
            <DrawerTitle>Are you sure you want to block this user?</DrawerTitle>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex flex-col items-center gap-4">
            <Button className="w-48">Block User</Button>
            <DrawerClose>
              <Button variant="secondary" className="w-48">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default BlockUserDrawer;
