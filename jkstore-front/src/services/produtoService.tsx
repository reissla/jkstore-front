import api from './api';

const API_BASE_URL = '/produtos';

export const getAllProducts = () => api.get(`${API_BASE_URL}/listarProdutos`);
export const getProducthighlighted = () => api.get(`${API_BASE_URL}/listarProdutosEmDestaque`);
export const addProductToCart = (produtoId: number) => {
    return api.post(`${API_BASE_URL}/adicionarProdutoAoCarrinho/${produtoId}`, {});
};


