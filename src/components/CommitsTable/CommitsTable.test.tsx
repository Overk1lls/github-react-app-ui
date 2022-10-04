import { act, cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../app/store';
import { mockCommits } from '../../test';
import CommitsTable, { mapCommits } from './CommitsTable';
import { setAccessToken } from '../../app/auth';
import { addRepositoryName } from '../../features/repositories/repositorySlice';

describe('CommitsTable component', () => {
  test('should handle loading without data', async () => {
    jest.useFakeTimers();

    setAccessToken('token');
    act(() => {
      store.dispatch(addRepositoryName('test'));
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommitsTable org="test" />
        </BrowserRouter>
      </Provider>
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByRole('grid')).toBeInTheDocument();

    jest.useRealTimers();
    cleanup();
  });

  test('should handle mapping commits', () => {
    const result = mapCommits(mockCommits);

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: mockCommits[0].sha,
          author: mockCommits[0].commit.author.name,
          committer: mockCommits[0].commit.committer.name,
          message: mockCommits[0].commit.message,
          date: mockCommits[0].commit.committer.date,
        },
      ])
    );
  });
});
