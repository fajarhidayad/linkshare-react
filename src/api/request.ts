import axios, { AxiosError, AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.defaults.withCredentials = true;
api.defaults.withXSRFToken = true;

export const request = async <T>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api.request<T>({ method, url, data, ...config });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || 'API Error');
    }
    console.error(error);
    throw new Error('Something went wrong');
  }
};
