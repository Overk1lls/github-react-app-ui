import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken } from '../../app/auth';
import { getConfig } from '../../app/config';
import { User } from '../../models/user';

const { baseUrl } = getConfig();

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${getAccessToken()}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => '/user',
    }),
  }),
});

export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery } = userApi;
