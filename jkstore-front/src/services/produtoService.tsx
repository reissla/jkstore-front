import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/produtos';

export const getAllProducts = () => axios.get(`${API_BASE_URL}/listarProdutos`);
export const getProducthighlighted = () => axios.get(`${API_BASE_URL}/listarProdutosEmDestaque`);
