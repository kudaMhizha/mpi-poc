import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import EditCompanyScreen from '.';

test('renders the edit company screen without errors', () => {
  renderForm(<EditCompanyScreen />);

  expect(screen.getByText('Edit company details')).toBeTruthy();
});
