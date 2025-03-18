import { POLY_API_KEY } from './config.js';

const polyAxios = axios.create({
  baseURL: 'https://api.polygon.io',
  headers: { Authorization: 'Bearer ' + POLY_API_KEY },
});

const _axios = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

_axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = sessionStorage.getItem('Authorization') ?? '';
    return config;
  },
  (error) => {
    if (error.status === 401) console.log('Please login again.');
    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.status === 401) console.log('Please login again.');
    return Promise.reject(error);
  },
);

export { _axios, polyAxios };
