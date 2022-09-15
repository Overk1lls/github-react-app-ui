import { SerializedError } from '@reduxjs/toolkit';

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
