import {screen} from '@testing-library/react';
import EditUserScreen from '.';
import {renderForm} from '../../../utils/tests/render';

test('edit users screen renders without errors', () => {
  renderForm(<EditUserScreen />);

  expect(screen.getByText('Edit user')).toBeTruthy();
});
