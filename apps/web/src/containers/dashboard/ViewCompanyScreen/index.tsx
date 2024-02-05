import {PageHeader} from '@/web/components';
import {DataTable} from '@/web/components/DataTable';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@mpi-app/ui';
import Text from '@mpi-app/ui/components/text';
import {Download, Pencil} from '@phosphor-icons/react';
import {useNavigate} from 'react-router-dom';

const dummyData = [
  {
    userName: 'Some username',
    accessLevel: 1,
    status: 'pending',
    lastConnected: '01/01/24',
    comments: 'Some comments',
  },
  {
    userName: 'Some username',
    accessLevel: 1,
    status: 'pending',
    lastConnected: '01/01/24',
    comments: 'Some comments',
  },
  {
    userName: 'Some username',
    accessLevel: 1,
    status: 'pending',
    lastConnected: '01/01/24',
    comments: 'Some comments',
  },
];

const ViewCompanyScreen = () => {
  const navigate = useNavigate();

  const columns = [
    {accessorKey: 'userName', header: 'User Name'},
    {accessorKey: 'accessLevel', header: 'Access Level'},
    {accessorKey: 'status', header: 'Status'},
    {accessorKey: 'lastConnected', header: 'Last Connected'},
    {accessorKey: 'comments', header: 'Comments'},
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
      <PageHeader
        title="Company name"
        button="+ Add user"
        onClick={() => navigate('/auth/add-user')}
      />
      <div className="pt-8 flex flex-wrap gap-2 justify-between">
        <div className="flex gap-1">
          <h1 className="text-xl font-bold">Company: </h1>
          <Text>Company Name</Text>
        </div>
        <div>
          <div className="flex gap-1">
            <h1 className="text-xl font-bold">Contact Person: </h1>
            <Text>John Doe</Text>
          </div>
          <h1 className="text-slate-600">John.Doe@gmail.com</h1>
          <h1 className="text-slate-600">+27 23 456 7890</h1>
        </div>
        <div className="flex gap-1">
          <h1 className="text-xl font-bold">Created: </h1>
          <Text>01/01/23</Text>
        </div>
      </div>
      <div className="pt-8">
        <DataTable columns={columns} data={dummyData} />
      </div>
    </>
  );
};

export default ViewCompanyScreen;
