import { rest } from 'msw';
import { getConfig } from '../app/config';
import { mockAccessToken, mockCommits, mockError, mockRepositories, mockUser } from '.';
import { ServerErrorCode } from '../app/errors';
import { AccessTokenResponse } from '../app/auth';

const { baseUrl } = getConfig();

export const handlers = [
  rest.get(baseUrl + '/user', (req, res, ctx) => {
    return res.once(ctx.json(mockUser));
  }),
  rest.get(baseUrl + '/repos/by-org/:org', (req, res, ctx) => {
    return res(ctx.json(mockRepositories));
  }),
  rest.get(baseUrl + '/repos/by-owner/:owner/:repo/commits', (req, res, ctx) => {
    return res(ctx.json(mockCommits));
  }),
  rest.get(baseUrl + '/axios-req-test', (req, res, ctx) => {
    return res(ctx.text(req.headers.get('Authorization') ?? ''));
  }),
  rest.get(baseUrl + '/axios-res-test', (req, res, ctx) => {
    return res.once(
      ctx.status(403),
      ctx.json({
        status: mockError.status,
        code: ServerErrorCode.AuthExpired,
      })
    );
  }),
  rest.get(baseUrl + '/axios-res-test', (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({ message: 'error' }));
  }),
  rest.post(baseUrl + '/auth', (req, res, ctx) => {
    return res(
      ctx.json({
        accessToken: {
          access_token: mockAccessToken,
        },
      } as AccessTokenResponse)
    );
  }),
];
