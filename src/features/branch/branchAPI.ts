import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getConfig } from '../../app/config';
import { Branch } from '../../models/branch';
import { GithubData } from '../../models/github-data';

const { baseUrl } = getConfig();

const BRANCHES_TO_FETCH = 5;

export const branchesApi = createApi({
  reducerPath: 'branchesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRepositoryBranches: builder.query<Branch[], GithubData>({
      query: ({ owner, repo }) =>
        `/api/v1/repos/by-owner/${owner}/${repo}/branches?limit=${BRANCHES_TO_FETCH}`,
    }),
  }),
});

export const { useGetRepositoryBranchesQuery, useLazyGetRepositoryBranchesQuery } = branchesApi;
