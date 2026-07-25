import axios from 'axios';
import API_BASE from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 120000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'Request failed';
    return Promise.reject(new Error(typeof message === 'string' ? message : JSON.stringify(message)));
  }
);

export default api;
