import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuth2Callback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            // Salva o token no localStorage
            localStorage.setItem('token', token);
            // Redireciona para a home
            navigate('/home');
        } else {
            // Se não tem token, volta para login
            console.error('OAuth2 callback: token não encontrado');
            navigate('/');
        }
    }, [navigate, searchParams]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: 'var(--color-text-primary)'
        }}>
            <p>Autenticando...</p>
        </div>
    );
}
