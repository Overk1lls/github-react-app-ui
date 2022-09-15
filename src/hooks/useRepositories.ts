import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { Optional } from "../app/types";
import { useLazyGetRepositoriesQuery } from "../features/repositories/repositoriesAPI";
import { Repository } from "../models/repository";

type HookReturnType = [
  Optional<Repository[]>,
  boolean,
  boolean,
  Optional<FetchBaseQueryError | SerializedError>
];

export function useRepositories(org: string): HookReturnType {
  const [trigger, state] = useLazyGetRepositoriesQuery({
    refetchOnReconnect: true,
  });
  const { data, isLoading, isError, error } = state;

  useEffect(() => {
    const searchForRepos = setTimeout(async () => {
      if (org.length > 1) {
        await trigger(org, true);
      }
    }, 1500);

    return () => {
      clearTimeout(searchForRepos);
    };
  }, [org, trigger]);

  return [data, isLoading, isError, error];
}