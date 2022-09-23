import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../app/store';
import { mockCommits } from '../test';
import CommitsTable, { mapCommits } from './CommitsTable';

describe('CommitsTable component', () => {
  test('should handle loading without data', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommitsTable org="test" />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole('grid')).toBeInTheDocument();

    cleanup();
  });

  test('should handle mapping commits', () => {
    const result = mapCommits(mockCommits);

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 0,
          author: mockCommits[0].commit.author.name,
          committer: mockCommits[0].commit.committer.name,
          message: mockCommits[0].commit.message,
          date: mockCommits[0].commit.committer.date,
        },
      ])
    );
  });
});
