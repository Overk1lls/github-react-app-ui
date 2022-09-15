import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { RootState } from '../../app/store';

export interface OrganizationState {
  name: string;
  status: QueryStatus;
}

const initialState: OrganizationState = {
  name: '',
  status: QueryStatus.uninitialized,
};

export const organizationSlice = createSlice({
  initialState,
  name: 'organization',
  reducers: {
    addOrganizationName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.status = QueryStatus.fulfilled;
    },
  },
});

export const selectOrganization = (state: RootState) => state.orgReducer.name;

const { actions, reducer } = organizationSlice;

export const { addOrganizationName } = actions;
export default reducer;
