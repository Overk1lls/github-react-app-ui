import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setAccessToken } from '../app/auth';
import { store } from '../app/store';
import { infoToDisplay } from './Navbar';
import { mockUser } from '../test';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('should handle user loading', async () => {
    setAccessToken('token');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    screen.getByText('Loading...');

    expect(await screen.findByText(/github react app/i)).toBeInTheDocument();
    for (const key of infoToDisplay) {
      expect(await screen.findByText(mockUser[key])).toBeInTheDocument();
    }
    cleanup();
  });
});
