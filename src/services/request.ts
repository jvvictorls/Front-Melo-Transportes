import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
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
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const { data } = await api.post('/auth/refresh-token');
        error.config.headers.Authorization = `Bearer ${data}`;
        localStorage.setItem('accessToken', data);
        return await api(error.config);
      } catch (e: any) {
        if (e.response.data.message === 'missing refresh-token') {
          window.location.href = '/login';
        }
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

export const logout = async (endpoint: string) => {
  await api.delete(endpoint);
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

export const requestDelete = async (endpoint: string, data?: any) => {
  await api.delete(endpoint, data);
  localStorage.clear();
  sessionStorage.clear();
};

export default api;
