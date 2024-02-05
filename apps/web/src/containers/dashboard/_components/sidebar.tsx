import {Button, Separator} from '@mpi-app/ui';
import {cn} from '@mpi-app/utils';
import {File, SignOut, Upload} from '@phosphor-icons/react';
import {Briefcase, Gear, User} from '@phosphor-icons/react/dist/ssr';
import {motion} from 'framer-motion';
import {Link, useLocation} from 'react-router-dom';

type Props = {
  className?: string;
};

const ActiveIndicator = ({className}: Props) => (
  <motion.div
    initial={{opacity: 0, x: -20}}
    animate={{opacity: 1, x: 0}}
    className={cn(
      'h-1.5 w-1.5 animate-pulse rounded-full bg-info shadow-[0_0_12px] shadow-info',
      className
    )}
  />
);

interface SidebarItem {
  path: string;
  name: string;
  icon: React.ReactNode;
}

type SidebarItemProps = SidebarItem & {
  onClick?: () => void;
};

const SidebarItem = ({path, name, icon, onClick}: SidebarItemProps) => {
  const isActive = useLocation().pathname === path;

  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      onClick={onClick}
      className={cn(
        'h-auto justify-start px-4 py-3 mr-4 rounded-lg',
        isActive && 'pointer-events-none bg-primary text-secondary-foreground'
      )}
    >
      <Link to={path}>
        <div className="mr-3">{icon}</div>
        <span>{name}</span>
        {isActive && <ActiveIndicator className="ml-auto" />}
      </Link>
    </Button>
  );
};

type SidebarProps = {
  setOpen?: (open: boolean) => void;
};
const sidebarItems: SidebarItem[] = [
  {
    path: '/auth/companies',
    name: 'Companies',
    icon: <Briefcase />,
  },
  {
    path: '/auth/users',
    name: 'Users',
    icon: <User />,
  },
  {
    path: '/auth/reports',
    name: 'Reports',
    icon: <File />,
  },
  {
    path: '/auth/files-upload',
    name: 'Files Upload',
    icon: <Upload />,
  },
];

const sidebarFooterItems = [
  {
    path: '/auth/settings',
    name: 'Settings',
    icon: <Gear />,
  },
  {
    path: '/',
    name: 'Log out',
    icon: <SignOut />,
  },
];

function Sidebar({setOpen}: Readonly<SidebarProps>) {
  return (
    <div className="flex h-full flex-col gap-y-4 border-r">
      <div className="grid gap-y-2 mt-2">
        {sidebarItems.map(item => (
          <SidebarItem
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}
      </div>

      <div className="flex-1" />

      <Separator className="opacity-50" />
      <div className="grid gap-y-2">
        {sidebarFooterItems.map(item => (
          <SidebarItem
            {...item}
            key={item.path}
            onClick={() => setOpen?.(false)}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
