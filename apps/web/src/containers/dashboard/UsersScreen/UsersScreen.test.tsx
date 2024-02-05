import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import UsersScreen from '.';

test('users screen renders without erros', () => {
  renderForm(<UsersScreen />);

  expect(screen.getByText('Users')).toBeTruthy();
});
