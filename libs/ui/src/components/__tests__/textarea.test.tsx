import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Textarea} from '../textarea';

describe('Textarea', () => {
  it('renders without crashing', async () => {
    render(<Textarea />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies hasError style when hasError prop is true', () => {
    render(<Textarea hasError />);

    expect(screen.getByRole('textbox')).toHaveClass('border-error');
  });
});
