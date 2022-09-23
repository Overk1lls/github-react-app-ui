import { createContext, PropsWithChildren } from 'react';
import { AxiosClient } from './axios';

export interface AppContextValue {
  axios: AxiosClient;
}

export interface AppProviderProps {
  axios: AxiosClient;
}

export const AppContext = createContext<AppContextValue | null>(null);

export default function AppProvider({ axios, children }: PropsWithChildren<AppProviderProps>) {
  return <AppContext.Provider value={{ axios }}>{children}</AppContext.Provider>;
}
