import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import {DataTable} from '.';

const mockData = [
  {
    name: 'John Smith',
    age: 23,
    email: 'johnsmith@gmail.com',
  },
];

const mockColumns = [
  {accessorKey: 'name', header: 'Name'},
  {accessorKey: 'age', header: 'Age'},
  {accessorKey: 'email', header: 'Email'},
];

test('data table renders correctly', () => {
  renderForm(<DataTable data={mockData} columns={mockColumns} />);

  expect(screen.getByText('John Smith')).toBeTruthy();
});
