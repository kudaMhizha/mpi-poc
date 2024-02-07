import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import SubmitSupportRequest from '.';

// Mocking zodResolver
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(() => () => ({errors: {}, values: {}})),
}));

describe('SubmitSupportRequest', () => {
  it('renders without crashing', () => {
    render(<SubmitSupportRequest />);

    expect(screen.getByText('Support Request')).toBeTruthy();
  });

  it('clicks Go Back button', async () => {
    const navigateMock = jest.fn();
    const {getByTestId} = render(<SubmitSupportRequest />);

    userEvent.click(getByTestId('goBackButton'));

    await act(async () => {
      waitFor(() => {
        expect(navigateMock).toHaveBeenCalledWith(1);
      });
    });
  });

  it('submits the form with valid data', async () => {
    const navigateMock = jest.fn();
    const {getByTestId} = render(<SubmitSupportRequest />);
    fireEvent.change(screen.getByLabelText('Full name'), 'John Doe');
    fireEvent.change(
      screen.getByLabelText('Email address'),
      'john.doe@example.com'
    );

    // Open the dropdown and select a configuration type
    userEvent.click(screen.getByRole('combobox'));
    userEvent.click(screen.getByText('Config Type 1'));

    fireEvent.change(
      screen.getByLabelText('Support request'),
      'Test support message'
    );
    // Submit the form
    act(() => {
      fireEvent.click(getByTestId('submitButton'));
    });

    act(async () => {
      await waitFor(() => {
        expect(getByTestId('configTypeFormItem')).toBeInTheDocument();
        expect(navigateMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
