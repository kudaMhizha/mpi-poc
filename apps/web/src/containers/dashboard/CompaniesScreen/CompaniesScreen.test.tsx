import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import CompaniesScreen from '.';

test('companies screen renders without errors', () => {
  renderForm(<CompaniesScreen />);

  expect(screen.getByText('Companies')).toBeTruthy();
});
