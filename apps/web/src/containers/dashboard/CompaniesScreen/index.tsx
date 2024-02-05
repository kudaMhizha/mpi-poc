import {PageHeader} from '@/web/components';
import {DataTable} from '@/web/components/DataTable';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@mpi-app/ui';
import {DotsThreeVertical} from '@phosphor-icons/react';
import {Briefcase} from '@phosphor-icons/react/dist/ssr';
import {useNavigate} from 'react-router-dom';

const mockData = [
  {
    companyName: 'Real company',
    details: 'some details',
    address: '1 Address Road, Address city',
    tellNumber: '123456789',
    email: 'email@gmail.com',
    primaryContact: 'John Smith',
    secondaryContact: 'Jane Doe',
    userNumber: 1,
  },
  {
    companyName: 'Real company',
    details: 'some details',
    address: '1 Address Road, Address city',
    tellNumber: '123456789',
    email: 'email@gmail.com',
    primaryContact: 'John Smith',
    secondaryContact: 'Jane Doe',
    userNumber: 1,
  },
  {
    companyName: 'Real company',
    details: 'some details',
    address: '1 Address Road, Address city',
    tellNumber: '123456789',
    email: 'email@gmail.com',
    primaryContact: 'John Smith',
    secondaryContact: 'Jane Doe',
    userNumber: 1,
  },
];

const CompaniesScreen = () => {
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: 'companyName',
      header: 'Company Name',
    },
    {accessorKey: 'details', header: 'Company Details'},
    {accessorKey: 'address', header: 'Company Address'},
    {accessorKey: 'tellNumber', header: 'Tell Number'},
    {accessorKey: 'email', header: 'Email'},
    {accessorKey: 'primaryContact', header: 'Primary Contact'},
    {accessorKey: 'secondaryContact', header: 'Secondary Contact'},
    {accessorKey: 'userNumber', header: 'User No.'},
    {
      accessorKey: '',
      header: 'Action',
      cell: ({row}: any) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsThreeVertical size="24px" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() =>
                  navigate('/auth/view-company/' + row.original.companyName)
                }
              >
                View Company
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="cursor-pointer"
                onClick={() =>
                  navigate('/auth/edit-company/' + row.original.companyName)
                }
              >
                Edit Company
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
        title="Companies"
        button="+ Add Company"
        onClick={() => navigate('/auth/add-company')}
        icon={<Briefcase />}
      />
      <div className="pt-8">
        <DataTable data={mockData} columns={columns} />
      </div>
    </>
  );
};

export default CompaniesScreen;
