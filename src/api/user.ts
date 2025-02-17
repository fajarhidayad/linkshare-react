import { request } from './request';

export const userApi = {
  profile: () => request('get', '/api/profile'),
};
