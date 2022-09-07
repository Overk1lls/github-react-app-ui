import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccessTokenResponse } from "../../app/auth";
import { getConfig } from "../../app/config";

const { baseUrl } = getConfig();

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAccessTokenByCode: builder.query<AccessTokenResponse, string>({
      query: (code) => ({ url: '/auth', method: 'POST', body: { code } }),
    }),
  }),
});

export const { useGetAccessTokenByCodeQuery, useLazyGetAccessTokenByCodeQuery } = authApi;