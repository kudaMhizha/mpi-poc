import {renderForm} from '@/web/utils/tests/render';
import {fireEvent, screen} from '@testing-library/react';
import PageHeader from '.';

describe('', () => {
  test('page header renders correctly', () => {
    renderForm(<PageHeader title="Page header" />);

    expect(screen.getByText('Page header')).toBeTruthy();
  });

  test('on click function is called', () => {
    const mockOnClick = jest.fn();

    renderForm(
      <PageHeader title="test title" button="Click me" onClick={mockOnClick} />
    );

    fireEvent.click(screen.getByText('Click me'));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
