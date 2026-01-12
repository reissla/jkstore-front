import api from "./api"

const API_BASE_URL = "/produtos"

export interface CartProduct {
    id: number;
    titulo: string;
    descricao: string;
    preco: number;
    disponivel: boolean;
    destaque: boolean;
    imagemProduto?: {
        base64: string;
    };
}

export const getCartProducts = () => api.get<CartProduct[]>(`${API_BASE_URL}/listarPordutosNoCarrinho`)

export const removeProductFromCart = (produtoId: number) =>
    api.delete(`${API_BASE_URL}/removerProdutoDoCarrinho/${produtoId}`)
