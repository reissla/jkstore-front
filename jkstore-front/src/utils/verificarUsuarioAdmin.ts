export function verificarUsuarioAdmin(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
}