import { POLY_API_KEY } from './confjg.js';

const polyAxios = axios.create({
  baseURL: 'https://api.polygon.io',
  headers: { Authorization: POLY_API_KEY },
});

export { polyAxios };
