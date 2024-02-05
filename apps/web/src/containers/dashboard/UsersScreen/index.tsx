import {PageHeader} from '@/web/components';
import {DataTable} from '@/web/components/DataTable';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@mpi-app/ui';
import {Download, Pencil} from '@phosphor-icons/react';
import {User} from '@phosphor-icons/react/dist/ssr';
import {useNavigate} from 'react-router-dom';

const dummyData = [
  {
    name: 'John',
    surname: 'Smith',
    email: 'johnsmith@gmail.com',
    status: 'Active',
    jobDescription: 'Some description',
    phoneNumber: '0212345678',
    lastConnected: '01/01/24',
  },
  {
    name: 'Garry',
    surname: 'Lee',
    email: 'johnsmith@gmail.com',
    status: 'Active',
    jobDescription: 'Some description',
    phoneNumber: '0212345678',
    lastConnected: '01/01/24',
  },
  {
    name: 'Jane',
    surname: 'Doe',
    email: 'johnsmith@gmail.com',
    status: 'Active',
    jobDescription: 'Some description',
    phoneNumber: '0212345678',
    lastConnected: '01/01/24',
  },
];

const UsersScreen = () => {
  const navigate = useNavigate();

  const columns = [
    {accessorKey: 'name', header: 'Name'},
    {accessorKey: 'surname', header: 'Surname'},
    {accessorKey: 'email', header: 'Email'},
    {accessorKey: 'status', header: 'Status'},
    {accessorKey: 'jobDescription', header: 'Description'},
    {accessorKey: 'phoneNumber', header: 'Phone Number'},
    {accessorKey: 'lastConnected', header: 'Last Connected'},
    {
      accessorKey: '',
      header: 'Download user logs',
      cell: ({row}: any) => {
        return <Download className="cursor-pointer" />;
      },
    },
    {
      accessorKey: '',
      header: 'Action',
      cell: ({row}: any) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Pencil />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() => navigate('/auth/edit-user/')}
              >
                Edit user
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader title="Users" icon={<User />} />
      <div className="mt-8">
        <DataTable data={dummyData} columns={columns} filterBy="name" />
      </div>
    </>
  );
};

export default UsersScreen;
