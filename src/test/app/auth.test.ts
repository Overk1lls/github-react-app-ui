import {
  AccessTokenResponse,
  getAccessToken,
  getAuthCode,
  refreshAccessToken,
  setAccessToken,
  setCode,
  signOut,
} from '../../app/auth';
import { createAxiosClient } from '../../app/axios';
import { getConfig } from '../../app/config';
import { LocalStorageKeys } from '../../app/const';
import { mockCode, mockError } from '..';
import { LogicError } from '../../app/errors';
import { AxiosError } from 'axios';

describe('app/auth.ts', () => {
  beforeEach(() => {
    setCode(mockCode);
    setAccessToken('token');
  });

  test('should handle setCode()', () => {
    expect(getAuthCode()).toBe(mockCode);
  });

  test('should handle signOut()', () => {
    signOut();

    expect(localStorage.getItem(LocalStorageKeys.AccessToken)).toBeNull();
    expect(localStorage.getItem(LocalStorageKeys.Code)).toBeNull();
  });

  describe('refreshAccessToken()', () => {
    const { baseUrl } = getConfig();
    const { publicClient } = createAxiosClient(baseUrl);

    test('should handle refreshAccessToken()', async () => {
      localStorage.removeItem(LocalStorageKeys.AccessToken);

      const mockTokenResponse: AccessTokenResponse = {
        accessToken: {
          access_token: 'new token',
          scope: 'user',
          token_type: 'bearer',
        },
      };

      jest.spyOn(publicClient, 'post').mockResolvedValue({
        data: mockTokenResponse,
      });

      await refreshAccessToken(publicClient);

      expect(getAccessToken()).toBe(mockTokenResponse.accessToken.access_token);
      expect(publicClient.post).toHaveBeenCalledWith('/auth', { code: mockCode });
    });

    test('should handle refreshAccessToken() with LogicError', async () => {
      jest.spyOn(publicClient, 'post').mockReturnValue(Promise.reject(mockError));

      await expect(refreshAccessToken(publicClient)).rejects.toBeInstanceOf(LogicError);
    });

    test('should handle refreshAccessToken() with AxiosError', async () => {
      jest
        .spyOn(publicClient, 'post')
        .mockReturnValue(Promise.reject(new AxiosError('AxiosError', 'axios.error')));

      await expect(refreshAccessToken(publicClient)).rejects.toBeInstanceOf(AxiosError);
    });
  });
});
