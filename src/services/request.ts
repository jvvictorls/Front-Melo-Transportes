import axios from 'axios';
import { setAccessToken, getAccessToken } from './authService';

const api = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    console.log('esse é o token', accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      try {
        const { data } = await api.post('/auth/refresh-token');
        console.log('esse é o token', data);
        error.config.headers.Authorization = `Bearer ${data}`;
        setAccessToken(data);
        return await api(error.config);
      } catch (e: any) {
        console.log(e.message);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export const requestLogin = async (
  endpoint: string,
  body: { email: string, password: string },
) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const get = async (endpoint: string) => {
  try {
    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const post = async (endpoint: string, body: any): Promise<any> => {
  const response = await api.post(endpoint, body);
  return response;
};

export const put = async (endpoint: string, body?: any) => {
  const response = await api.put(endpoint, body);
  return response;
};

export const patch = async (endpoint: string, body?: any) => {
  const response = await api.patch(endpoint, body);
  return response;
};

export const requestDelete = async (endpoint: string) => {
  await api.delete(endpoint);
  localStorage.clear();
};

export default api;
