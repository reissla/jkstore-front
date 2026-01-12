import { useState } from "react"
import { loginFunction } from "@/services/authService";
import Button from "@/components/ui/Button";
import "@/pages/login/LoginPage.css"
import { useNavigate } from "react-router-dom";

type credentials = {
  login: string;
  senha: string;
}


export default function LoginPage() {
  const navigate = useNavigate(); //chama esse hook pré pronto do react router dom para navegação

  const [credentials, setCredentials] = useState<credentials>({ login: "", senha: "" });

  async function SendLogin() {
    try {
      const response = await loginFunction(credentials);
      const token = response.data;
      localStorage.setItem("token", token);

      navigate("/home");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-image-panel">
        <img src="/modern-abstract-gradient-background-with-geometric.jpg" alt="Login visual" className="login-image" />
      </div>

      <div className="login-card">
        <div className="login-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="#068fd9" strokeWidth="2" />
            <path
              d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
              stroke="#068fd9"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="login-title">Login</h1>

        <form className="login-form" >
          <div className="form-group">
            <label htmlFor="login" className="form-label">
              Login
            </label>
            <input type="login"
              id="login"
              className="form-input"
              placeholder="Digite seu login"
              value={credentials.login}
              onChange={e => setCredentials({ ...credentials, login: e.target.value })} />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={credentials.senha}
              onChange={e => setCredentials({ ...credentials, senha: e.target.value })} />
          </div>

          <a href="#" className="forgot-password">
            Esqueci minha senha
          </a>

          <div className="login-button-container">

            <Button size="md" type="button" onClick={SendLogin}>
              Entrar
            </Button>

          </div>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <button
            type="button"
            className="google-login-button"
            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Continuar com Google</span>
          </button>
        </form>

        <div className="signup-link">
          <span className="signup-text">Não tem conta? </span>
          <a href="/register" className="signup-link-text">
            Cadastrar-se
          </a>
        </div>
      </div>
    </div>
  )
}
