import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from '../../app/auth';
import { getConfig } from '../../app/config';
import { Commit } from '../../models/commits';
import { GithubData } from '../../models/github-data';

const { baseUrl } = getConfig();

const COMMITS_TO_FETCH = 30;

export const commitsApi = createApi({
  reducerPath: 'commitsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('authorizaiton', `Bearer ${getAccessToken()}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRepositoryCommits: builder.query<Commit[], GithubData>({
      query: ({ owner, repo }) =>
        `/repos/by-owner/${owner}/${repo}/commits?limit=${COMMITS_TO_FETCH}`,
    }),
  }),
});

export const { useGetRepositoryCommitsQuery, useLazyGetRepositoryCommitsQuery } = commitsApi;
