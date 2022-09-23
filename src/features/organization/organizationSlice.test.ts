import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { store } from '../../app/store';
import organizationReducer, {
  addOrganizationName,
  OrganizationState,
  selectOrganization,
} from './organizationSlice';

describe('Organization reducer', () => {
  const initialState: OrganizationState = {
    name: 'test',
    status: QueryStatus.uninitialized,
  };

  it('should handle initial state', () => {
    expect(organizationReducer(undefined, { type: 'unknown' })).toEqual({
      name: '',
      status: QueryStatus.uninitialized,
    });
  });

  it('should handle adding a name', () => {
    const newName = 'new name';
    const result = organizationReducer(initialState, addOrganizationName(newName));

    expect(result.name).toEqual(newName);
  });

  it('should handle selecting the name', () => {
    const result = selectOrganization(store.getState());

    expect(result).toEqual('');
  });
});
