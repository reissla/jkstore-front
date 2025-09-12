import Button from "@/components/ui/Button.jsx"
import "@/styles/components/Hero.css"

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Descubra o Melhor em 
          <span className="hero-title-accent">Produtos Importados</span>
        </h1>
        <p className="hero-subtitle">
          Encontre peças exclusivas e de alta qualidade na JK Store. Sua nova experiência de compras começa aqui.
        </p>
      </div>
    </section>
  )
}
