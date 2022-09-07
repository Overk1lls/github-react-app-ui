import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getConfig } from '../../app/config';
import { Branch } from "../../models/branch";
import { RepositoryOwner } from '../../models/owner';

const { baseUrl } = getConfig();

export const branchesApi = createApi({
  reducerPath: 'branchesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRepositoryBranches: builder.query<Branch[], RepositoryOwner>({
      query: ({ username, repository }) =>
        `/api/v1/repos/by-owner/${username}/${repository}/branches?limit=5`,
    }),
  }),
});

export const { useGetRepositoryBranchesQuery, useLazyGetRepositoryBranchesQuery } = branchesApi;