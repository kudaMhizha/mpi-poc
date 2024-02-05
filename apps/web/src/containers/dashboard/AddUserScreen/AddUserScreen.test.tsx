import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import AddUserScreen from '.';

test('add user screen renders without errors', () => {
  renderForm(<AddUserScreen />);

  expect(screen.getByText('Add a new user')).toBeTruthy();
});
