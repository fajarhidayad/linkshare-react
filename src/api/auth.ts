import { LoginRequest, RegisterRequest } from '../dto/auth.dto';
import { request } from './request';

export const authApi = {
  csrfCookie: () => request('get', '/sanctum/csrf-cookie'),
  login: (data: LoginRequest) => request('post', '/login', data),
  register: (data: RegisterRequest) =>
    request('post', '/register', {
      ...data,
      password_confirmation: data.confirmPassword,
    }),
  logout: () => request('post', '/logout'),
};
