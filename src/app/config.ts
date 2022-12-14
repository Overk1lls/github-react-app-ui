/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Nullable } from './types';

export interface Config {
  githubClientId: string;
  githubClientSecret: string;
  baseUrl: string;
}

let config: Readonly<Nullable<Config>> = null;

export function getConfig() {
  if (!config) {
    [
      'REACT_APP_GITHUB_CLIENT_ID',
      'REACT_APP_GITHUB_CLIENT_SECRET',
      'REACT_APP_BACKEND_URL',
    ].forEach((variable) => {
      if (!process.env[variable]) {
        throw new Error(`Environmnt variable '${variable}' is missing!`);
      }
    });
    config = {
      githubClientId: process.env.REACT_APP_GITHUB_CLIENT_ID!,
      githubClientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET!,
      baseUrl: process.env.REACT_APP_BACKEND_URL!,
    };
  }
  return config;
}

export function isNotProduction() {
  return !!process.env.DEBUG || !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';
}
