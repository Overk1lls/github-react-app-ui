import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getAccessToken } from '../../app/auth';
import { store } from '../../app/store';
import { mockAccessToken } from '../../test';
import LoginPage from './Login';

describe('Login page', () => {
  afterEach(() => {
    cleanup();
  });

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
  });

  test('should handle setting the access token by a code', async () => {
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation((key) => key);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(() => getAccessToken()).not.toThrowError();
    expect(getAccessToken()).toEqual(mockAccessToken);

    jest.clearAllMocks();
  });
});
