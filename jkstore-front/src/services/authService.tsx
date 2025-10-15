import axios from 'axios';

const API_BASE_URL = 'https://localhost:8080/auth'; 

interface credentials {
  login: string;
  senha: string;
}

interface registerData {
  name: string;
  login: string;
  email: string;
  senha: string;
}

export const loginFunction = (credentials: credentials) => axios.post(`${API_BASE_URL}/login`, credentials);
export const registerFunction = (data: any) => axios.post(`${API_BASE_URL}/register`, data);