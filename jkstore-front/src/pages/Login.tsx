import { useState } from "react"
import { loginFunction } from "@/services/authService";
import Button  from "@/components/ui/Button";
import "@/styles/components/LoginPage.css"

type credentials = {
  login: string;
  senha: string;
}

export default function LoginPage() {

  const [credentials, setCredentials] = useState<credentials>({ login: "", senha: "" });

  async function SendLogin() {
    try {
      const response = await loginFunction(credentials);
      console.log("Login bem-sucedido:", response.data);
      //armazenar o token JWT, redirecionar o usuário.
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

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="login" className="form-label">
              Login
            </label>
            <input type="login" 
                  id="login" 
                  className="form-input" 
                  placeholder="Digite seu login" 
                  value={credentials.login}
                  onChange={e => setCredentials({ ...credentials, login: e.target.value })}/>
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
                   onChange={e => setCredentials({ ...credentials, senha: e.target.value })}/>
          </div>

          <a href="#" className="forgot-password">
            Esqueci minha senha
          </a>

          <div className="login-button-container">
            <Button size="md" onClick={SendLogin}>
              Entrar
            </Button>
          </div>
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
