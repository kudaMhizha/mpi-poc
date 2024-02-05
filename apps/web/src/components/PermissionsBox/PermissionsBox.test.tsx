import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import PermissionsBox, {Permission} from '.';

const mockPermissions: Array<Permission> = [
  {title: 'Example permission 1', isAvailable: true},
  {title: 'Example permission 2', isAvailable: false},
];

test('permssions box renders correctly', () => {
  renderForm(
    <PermissionsBox permissions={mockPermissions} title="Permissions" />
  );

  expect(screen.getByText('Example permission 1')).toBeTruthy();
  expect(screen.getByText('Permissions')).toBeTruthy();
});
