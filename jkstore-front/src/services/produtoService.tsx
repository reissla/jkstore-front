import api from "./api"

 const API_BASE_URL = "/produtos"

export interface CreateProductPayload {
  titulo: string
  descricao: string
  preco: number
  disponivel: boolean
  destaque: boolean
  imagemProduto?: AnexoPayload
}

export interface AnexoPayload {
    nome: string
    nomeExibicao: string
    ordemInsercao: number
    url?: string
    base64: string
  }

export const getAllProducts = () => api.get(`${API_BASE_URL}/listarProdutos`)
export const getProducthighlighted = () => api.get(`${API_BASE_URL}/listarProdutosEmDestaque`)
export const addProductToCart = (produtoId: number) => {
  return api.post(`${API_BASE_URL}/adicionarProdutoAoCarrinho/${produtoId}`, {})
}
export const createProduct = (product: CreateProductPayload) => api.post(`${API_BASE_URL}/cadastrarProduto`, product)
