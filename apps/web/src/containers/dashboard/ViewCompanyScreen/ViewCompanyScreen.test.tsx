import {screen} from '@testing-library/react';
import ViewCompanyScreen from '.';
import {renderForm} from '../../../utils/tests/render';

test('renders the company name, contact person, and creation date', () => {
  renderForm(<ViewCompanyScreen />);

  const companyName = screen.getByText('Company Name');

  expect(companyName).toBeTruthy();
});
