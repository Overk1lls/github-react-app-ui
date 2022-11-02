import { AxiosInstance } from 'axios';
import { isExpiredTokenResponse } from './axios';
import { LocalStorageKeys } from './const';
import { ErrorCode, LogicError } from './errors';

export interface AccessTokenResponse {
  accessToken: {
    access_token: string;
    scope: string;
    token_type: string;
  };
}

export function setAccessToken(token: string) {
  localStorage.setItem(LocalStorageKeys.AccessToken, token);
}

export function setCode(code: string) {
  localStorage.setItem(LocalStorageKeys.Code, code);
}

export function signOut() {
  localStorage.removeItem(LocalStorageKeys.AccessToken);
  localStorage.removeItem(LocalStorageKeys.Code);
}

export function isSignedIn() {
  return !!localStorage.getItem(LocalStorageKeys.AccessToken)?.trim();
}

export async function refreshAccessToken(client: AxiosInstance) {
  try {
    const { data } = await client.post<AccessTokenResponse>('/auth', { code: getAuthCode() });
    setAccessToken(data.accessToken.access_token);
  } catch (error) {
    if (isExpiredTokenResponse(error)) {
      signOut();
      throw new LogicError(ErrorCode.NotSignedIn);
    }
    throw error;
  }
}

export function getAuthCode() {
  return getKey(LocalStorageKeys.Code);
}

export function getAccessToken() {
  return getKey(LocalStorageKeys.AccessToken);
}

function getKey(key: string) {
  const value = localStorage.getItem(key);
  if (!value) {
    throw new Error(ErrorCode.NotSignedIn);
  }
  return value;
}
