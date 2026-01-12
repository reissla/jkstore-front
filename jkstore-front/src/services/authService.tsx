import api from './api';

const API_BASE_URL = '/auth';

interface credentials {
  login: string;
  senha: string;
}

interface registerData {
  nome: string;
  login: string;
  email: string;
  senha: string;
}

export const loginFunction = (credentials: credentials) => api.post(`${API_BASE_URL}/login`, credentials);
export const registerFunction = (credentials: registerData) => api.post(`${API_BASE_URL}/register`, credentials);