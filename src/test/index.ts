import { AxiosError, AxiosResponse } from 'axios';
import { ServerErrorCode } from '../app/errors';
import { Commit } from '../models/commit';
import { Repository } from '../models/repository';
import { User } from '../models/user';

export const mockCode = 'code';

export const mockUser: User = {
  id: 1,
  node_id: '1',
  login: 'login',
  name: 'name',
  email: 'email@type.com',
  location: '#',
  html_url: '#',
  avatar_url: '#',
};

export const mockRepositories: Repository[] = [
  {
    id: 1,
    name: 'test',
    description: 'desc',
  },
];

export const mockCommits: Commit[] = [
  {
    sha: 'sha',
    node_id: '1',
    commit: {
      author: {
        name: 'name',
        email: 'type@gmail.com',
        date: 'date',
      },
      committer: {
        name: 'name',
        email: 'type@gmail.com',
        date: 'date',
      },
      message: 'message',
      tree: {
        sha: 'sha',
        url: 'url',
      },
      url: 'url',
      comment_count: 1,
    },
    url: 'url',
    html_url: 'html_url',
    comments_url: 'comments_url',
  },
];

export const mockError = new AxiosError(
  'test',
  'test.error',
  {
    headers: {},
  },
  {},
  {
    status: 403,
    data: {
      code: ServerErrorCode.AuthExpired,
    },
  } as AxiosResponse
);

export const mockAccessToken = 'test token';
