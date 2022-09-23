import { ErrorCode, isSerializedError, LogicError } from '../../app/errors';

describe('app/errors.ts', () => {
  const error = new LogicError(ErrorCode.UserNotLoaded, 'test');

  test('should handle init', () => {
    expect(error.code).toBe(ErrorCode.UserNotLoaded);
    expect(error.message).toBe('test');
  });

  test('should handle isSerializedError()', () => {
    expect(isSerializedError(error)).toBeTruthy();
  });
});
