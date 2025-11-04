import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const publicRoutes = ['/login', '/register', '/auth/refresh'];

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  const url = config.url || ''; 
  const isPublicRoute = publicRoutes.some(route => url.includes(route));

  if (!isPublicRoute && token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
