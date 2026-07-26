import axios from 'axios';
import API_BASE from '../utils/constants';

if (!API_BASE && import.meta.env.PROD) {
  throw new Error(
    'VITE_API_BASE is required in production. ' +
      'Set it in Render to your backend URL (e.g. https://fetalscan-api.onrender.com).'
  );
}

const api = axios.create({
  baseURL: API_BASE,
  timeout: 120000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      const hint =
        import.meta.env.PROD
          ? ' Network error — verify VITE_API_BASE points to your Render backend and CORS_ORIGINS includes this frontend URL.'
          : ' Network error — is the backend running on port 8000?';
      return Promise.reject(new Error((error.message || 'Request failed') + hint));
    }
    const message = error.response?.data?.detail || error.message || 'Request failed';
    return Promise.reject(
      new Error(typeof message === 'string' ? message : JSON.stringify(message))
    );
  }
);

export default api;
