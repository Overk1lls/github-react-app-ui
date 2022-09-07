import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getAccessToken } from "../../app/auth";
import { getConfig } from "../../app/config";
import { Repository } from "../../models/repository";

const { baseUrl } = getConfig();

export const repositoriesApi = createApi({
  reducerPath: 'repositoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorizaiton', `Bearer ${getAccessToken()}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRepositories: builder.query<{ repositories: Repository[] }, string>({
      query: (org) => `/repos/by-org/${org}?limit=5`,
    }),
  }),
});

export const { useGetRepositoriesQuery, useLazyGetRepositoriesQuery } = repositoriesApi;