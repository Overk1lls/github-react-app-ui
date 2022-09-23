import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setAccessToken } from '../../app/auth';
import { store } from '../../app/store';
import HomePage from './Home';

describe('Home page', () => {
  test('should handle loading', async () => {
    setAccessToken('token');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    cleanup();
  });
});
