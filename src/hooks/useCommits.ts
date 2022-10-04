import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { Optional } from '../app/types';
import { useLazyGetRepositoryCommitsQuery } from '../features/commits/commitsAPI';
import { Commit } from '../models/commit';

type CommitsHookReturnType = [
  Optional<Commit[]>,
  boolean,
  boolean,
  Optional<FetchBaseQueryError | SerializedError>,
  boolean
];

export function useCommits(owner: string, repo: string): CommitsHookReturnType {
  const [trigger, state] = useLazyGetRepositoryCommitsQuery({
    refetchOnReconnect: true,
  });
  const { data, isFetching, isError, error, isUninitialized } = state;

  useEffect(() => {
    const searchForRepos = setTimeout(async () => {
      if (owner && repo) {
        await trigger({ owner, repo }, true);
      }
    }, 1500);

    return () => {
      clearTimeout(searchForRepos);
    };
  }, [owner, repo, trigger]);

  return [data, isFetching, isError, error, isUninitialized];
}
