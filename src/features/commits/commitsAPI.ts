import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getConfig } from "../../app/config";
import { LocalStorageKeys } from "../../app/const";
import { Commit } from "../../models/commits";
import { RepositoryOwner } from "../../models/owner";

const { baseUrl } = getConfig();

const COMMITS_TO_FETCH = 30;

export const commitsApi = createApi({
  reducerPath: 'commitsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        'authorizaiton',
        `Bearer ${localStorage.getItem(LocalStorageKeys.AccessToken)}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRepositoryCommits: builder.query<{ commits: Commit[] }, RepositoryOwner>({
      query: ({ username, repository }) =>
        `/repos/by-owner/${username}/${repository}/commits?limit=${COMMITS_TO_FETCH}`,
    }),
  }),
});

export const { useGetRepositoryCommitsQuery, useLazyGetRepositoryCommitsQuery } = commitsApi;
