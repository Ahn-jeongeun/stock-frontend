import { POLY_API_KEY } from './config.js';

const polyAxios = axios.create({
  baseURL: 'https://api.polygon.io',
  headers: { Authorization: 'Bearer ' + POLY_API_KEY },
});

const _axios = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { Authorization: sessionStorage.getItem('auth') ?? '' },
});

_axios.interceptors.response.use(
  (res) => {
    console.log('axios inter:', res);
    return res;
  },
  (error) => {
    console.error('axios inter:', error);
    return Promise.reject(error);
  },
);

export { _axios, polyAxios };
