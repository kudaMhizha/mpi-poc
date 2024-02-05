import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import AddCompanyScreen from '.';

test('add company screen renders without errors', () => {
  renderForm(<AddCompanyScreen />);

  expect(screen.getByText('Add new company')).toBeTruthy();
});
