import {renderForm} from '@/web/utils/tests/render';
import {screen} from '@testing-library/react';
import BlockUserDrawer from '.';

test('block user drawer renders correctly', () => {
  renderForm(<BlockUserDrawer />);

  expect(screen.getByText('Block User')).toBeTruthy();
});
