import {renderForm} from '@/web/utils/tests/render';
import {Button} from '@mpi-app/ui';
import {screen} from '@testing-library/react';
import UserOptions from '.';

test('user options renders without errors', () => {
  renderForm(<UserOptions children={<Button>Click me</Button>} />);

  expect(screen.getByText('Click me')).toBeTruthy();
});
