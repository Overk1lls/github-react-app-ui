import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export enum ErrorCode {
  NotSignedIn = 'signIn.no',
  UserNotLoaded = 'user.not.loaded',
}

export enum ServerErrorCode {
  JsonBad = 'json.bad',
  QueryBad = 'query.bad',

  AuthExpired = 'auth.expired',

  NotFound = 'not.found',

  Server = 'server',
}

export class LogicError extends Error {
  constructor(public readonly code: ErrorCode, message?: string, cause?: Error) {
    super(message, cause);
  }
}

export function isSerializedError(error: any): error is SerializedError {
  return 'code' in error && 'message' in error;
}

export function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
  return 'data' in error && 'status' in error && typeof error.data === 'object';
}
