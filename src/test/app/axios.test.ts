import { AxiosError } from 'axios';
import { mockError } from '..';
import { getAccessToken, setAccessToken, setCode } from '../../app/auth';
import { createAxiosClient, isExpiredTokenResponse } from '../../app/axios';
import { getConfig } from '../../app/config';

const { baseUrl } = getConfig();
const { protectedClient } = createAxiosClient(baseUrl);

describe('app/axios.ts', () => {
  beforeEach(() => {
    setAccessToken('token');
  });

  test('should handle isExpiredTokenResponse()', () => {
    expect(isExpiredTokenResponse(mockError)).toBeTruthy();
  });

  test('should handle intercepting the request', async () => {
    const { data } = await protectedClient.get<string>(baseUrl + '/axios-req-test');

    expect(data).toBe('Bearer ' + getAccessToken());
  });

  test('should handle intercepting the response', async () => {
    setCode('code');

    await expect(protectedClient.get(baseUrl + '/axios-res-test')).rejects.toBeInstanceOf(
      AxiosError
    );
  });
});
