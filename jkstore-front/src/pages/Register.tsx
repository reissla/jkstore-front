import "@/styles/components/RegisterPage.css"
import Button from "@/components/ui/Button";
import { useState } from "react";
import { registerFunction } from "@/services/authService";

type credentials = {
  name: string;
  login: string;
  email: string;
  senha: string;
}

export default function Register() {

  const [credentials, setCredentials] = useState<credentials>({ name: "", login: "", email: "", senha: "" });

  async function SendRegister() {
    try {
      console.log("Registrando usuário com as credenciais:", credentials);
      const response = await registerFunction(credentials);
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  }

  return (
    <div className="register-container">
      <div className="register-image-panel">
        <img
          src="/modern-abstract-gradient-background-with-geometric.jpg"
          alt="Background"
          className="register-background-image"
        />
        <div className="register-image-overlay">
          <h2 className="register-image-title">Junte-se a nós</h2>
          <p className="register-image-subtitle">Crie sua conta e comece sua jornada</p>
        </div>
      </div>

      <div className="register-form-panel">
        <div className="register-card">
          <div className="register-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <h1 className="register-title">Cadastrar-se</h1>

          <form className="register-form">
            <div className="register-form-group">
              <label htmlFor="name" className="register-label">
                Nome completo
              </label>
              <input type="text" 
                     id="name" 
                     className="register-input" 
                     placeholder="Digite seu nome completo" 
                     value={credentials.name}
                     onChange={e => setCredentials({ ...credentials, name: e.target.value })}
                     />
            </div>

            <div className="register-form-group">
              <label htmlFor="name" className="register-label">
                Login
              </label>
              <input type="text"
                id="name"
                className="register-input"
                placeholder="Digite seu login"
                value={credentials.login}
                onChange={e => setCredentials({ ...credentials, login: e.target.value })}
              />
            </div>

            <div className="register-form-group">
              <label htmlFor="email" className="register-label">
                E-mail
              </label>
              <input type="email" 
                     id="email" 
                     className="register-input" 
                     placeholder="Digite seu e-mail" 
                     value={credentials.email}
                     onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                     />
            </div>

            <div className="register-form-group">
              <label htmlFor="password" className="register-label">
                Senha
              </label>
              <input type="password" 
                     id="password" 
                     className="register-input" 
                     placeholder="Digite sua senha" 
                     value={credentials.senha}
                     onChange={e => setCredentials({ ...credentials, senha: e.target.value })}
                     />
            </div>

            {/*<div className="register-form-group">
              <label htmlFor="confirm-password" className="register-label">
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirm-password"
                className="register-input"
                placeholder="Confirme sua senha"
                />
            </div>*/}

            <Button size="md" onClick={SendRegister}>
              Cadastrar
            </Button>

            <div className="register-footer">
              <p className="register-login-text">
                Já tem uma conta?{" "}
                <a href="/login" className="register-login-link">
                  Entrar
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}