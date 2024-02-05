import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import PageNotFoundScreen from '.';

test('page not found screen renders without errors', () => {
  renderForm(<PageNotFoundScreen />);

  expect(screen.getByText('Page Not Found')).toBeTruthy();
});
