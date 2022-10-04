import { ErrorCode, isFetchBaseQueryError, isSerializedError, LogicError } from '../../app/errors';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

describe('app/errors.ts', () => {
  const error = new LogicError(ErrorCode.UserNotLoaded, 'test');

  test('should handle init', () => {
    expect(error.code).toBe(ErrorCode.UserNotLoaded);
    expect(error.message).toBe('test');
  });

  test('should handle isSerializedError()', () => {
    expect(isSerializedError(error)).toBeTruthy();
  });

  test('should handle isFetchBaseQueryError()', () => {
    const error: FetchBaseQueryError = {
      data: 'test',
      status: 400,
    };
    expect(isFetchBaseQueryError(error)).toBeTruthy();
  });
});
