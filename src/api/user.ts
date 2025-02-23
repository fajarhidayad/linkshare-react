import { UpdateProfileDto } from '@/dto/profile.dto';
import { request } from './request';

export const userApi = {
  profile: () => request('get', '/api/profile'),
  publicProfile: (username: string) =>
    request('get', `/api/profile/${username}`),
  updateProfile: (data: UpdateProfileDto) =>
    request('post', '/api/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        _method: 'PUT',
      },
    }),
};
