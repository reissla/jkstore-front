import { Navigate } from "react-router-dom";
import { verificarUsuarioLogado } from "@/utils/verificarUsuarioLogado";
import { verificarUsuarioAdmin } from "@/utils/verificarUsuarioAdmin";

interface PrivateRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export function PrivateRoute({ children, requireAdmin = false }: PrivateRouteProps) {
    const isLoggedIn = verificarUsuarioLogado();
    const isAdmin = verificarUsuarioAdmin();

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
}
