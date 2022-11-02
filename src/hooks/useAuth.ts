import { useLazyGetAccessTokenByCodeQuery } from '../features/auth/authAPI';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccessTokenResponse, isSignedIn, setAccessToken } from '../app/auth';
import { START_PAGE } from '../components/AppRouter';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { Optional } from '../app/types';

type HookReturnType = [
  Optional<AccessTokenResponse>,
  boolean,
  boolean,
  Optional<FetchBaseQueryError | SerializedError>
];

export function useAuth(): HookReturnType {
  const [trigger, state] = useLazyGetAccessTokenByCodeQuery();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const code = searchParams.get('code');

    if (code) {
      trigger(code)
        .then(({ data }) => setAccessToken(data?.accessToken.access_token ?? ''))
        .then(() => {
          if (isSignedIn()) {
            navigate(START_PAGE + '/home');
          }
        });
    }
  }, [search, pathname, trigger, navigate]);

  return [state.data, state.isLoading, state.isError, state.error];
}
