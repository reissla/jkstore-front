export function verificarUsuarioLogado(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
}