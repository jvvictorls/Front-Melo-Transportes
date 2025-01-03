import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001',
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const requestData = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestRegister = async (
  endpoint: string,
  body: { name: string, email: string, password: string },
) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestUpdateUser = async (
  endpoint: string,
  body: { name: string, email: string, password: string },
) => {
  const { data } = await api.put(endpoint, body);
  localStorage.clear();
  localStorage.setItem('id', data.id);
  localStorage.setItem('name', data.name);
  localStorage.setItem('email', data.email);
  return data;
};

export const deleteUser = async (endpoint: string) => {
  await api.delete(endpoint);
  localStorage.clear();
};

export const requestLogin = async (
  endpoint: string,
  body: { email: string, password: string },
) => {
  const { data } = await api.post(endpoint, body);
  localStorage.setItem('token', data);
  return data;
};

export const post = async (endpoint: string, body: any) => {
  const response = await api.post(endpoint, body);
  return response;
};

export const get = async (endpoint: string) => {
  const { data } = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return data;
};

export const patch = async (endpoint: string, body?: any) => {
  const response = await api.patch(endpoint, body);
  return response;
};

export const put = async (endpoint: string, body?: any) => {
  const response = await api.put(endpoint, body);
  return response;
};

export default api;
