import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setAccessToken } from '../../app/auth';
import { store } from '../../app/store';
import RepositoryList from './RepositoryList';

describe('RepositoryList component', () => {
  test('should handle loading without data', async () => {
    setAccessToken('token');

    render(
      <Provider store={store}>
        <BrowserRouter>
          <RepositoryList org="test" />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole('button', { name: 'Repositories' })).toBeInTheDocument();

    cleanup();
  });
});
