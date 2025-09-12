import axios from 'axios';

const API_BASE_URL = 'https://localhost:8080/auth'; 

export const loginFunction = (credentials) => axios.post(`${API_URL}/login`, credentials);