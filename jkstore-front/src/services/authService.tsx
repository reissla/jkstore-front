import axios from 'axios';

const API_BASE_URL = 'https://localhost:8080/auth'; 

interface credentials {
  login: string;
  senha: string;
}

export const loginFunction = (credentials) => axios.post(`${API_URL}/login`, credentials);