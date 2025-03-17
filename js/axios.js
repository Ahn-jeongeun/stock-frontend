import { POLY_API_KEY } from './config.js';

const polyAxios = axios.create({
  baseURL: 'https://api.polygon.io',
  headers: { Authorization: 'Bearer ' + POLY_API_KEY },
});

export { polyAxios };
