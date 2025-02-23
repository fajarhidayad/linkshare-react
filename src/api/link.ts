import { request } from './request';

export interface UserLink {
  platform: string;
  link: string;
}

export const linkApi = {
  get: () => request('get', '/api/links'),
  update: (links: UserLink[]) => request('put', '/api/links', {}),
};
