import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { store } from '../../app/store';
import repositoryReducer, {
  addRepositoryName,
  RepositoryState,
  selectRepository,
} from './repositorySlice';

describe('Repository reducer', () => {
  const initialState: RepositoryState = {
    name: 'test',
    status: QueryStatus.uninitialized,
  };

  it('should handle initial state', () => {
    expect(repositoryReducer(undefined, { type: 'unknown' })).toEqual({
      name: '',
      status: QueryStatus.uninitialized,
    });
  });

  it('should handle adding a name', () => {
    const newName = 'newName';
    const result = repositoryReducer(initialState, addRepositoryName(newName));

    expect(result.name).toEqual(newName);
  });

  it('should handle selecting the name', () => {
    const repository = selectRepository(store.getState());

    expect(repository).toEqual('');
  });
});
