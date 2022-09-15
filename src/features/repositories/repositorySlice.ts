import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { RootState } from '../../app/store';

export interface RepositoryState {
  name: string;
  status: QueryStatus;
}

const initialState: RepositoryState = {
  name: '',
  status: QueryStatus.uninitialized,
};

export const repositorySlice = createSlice({
  initialState,
  name: 'repository',
  reducers: {
    addRepositoryName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.status = QueryStatus.fulfilled;
    },
  },
});

export const selectRepository = (state: RootState) => state.repoReducer.name;

const { actions, reducer } = repositorySlice;

export const { addRepositoryName } = actions;
export default reducer;
