import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getAccessToken } from '../../app/auth';
import { store } from '../../app/store';
import LoginPage from './Login';

describe('Login page', () => {
  test('is not signed in', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/github/i)).toBeInTheDocument();
    expect(() => getAccessToken()).toThrowError();

    cleanup();
  });
});
