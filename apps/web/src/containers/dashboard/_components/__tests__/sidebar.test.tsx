import {render, screen, fireEvent} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Sidebar} from '../';

describe('Sidebar Component', () => {
  it('renders Sidebar with items', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const companiesLink = screen.getByText('Companies');
    expect(companiesLink).toBeTruthy();
  });

  it('handles click events on Sidebar items', () => {
    const mockSetOpen = jest.fn();

    render(
      <Router>
        <Sidebar setOpen={mockSetOpen} />
      </Router>
    );

    // Simulate click on 'Companies' link
    fireEvent.click(screen.getByText('Companies'));
    expect(mockSetOpen).toHaveBeenCalledWith(false);

    // Simulate click on 'Log out' link
    fireEvent.click(screen.getByText('Log out'));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
