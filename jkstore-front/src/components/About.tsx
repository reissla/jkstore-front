import styles from "@/styles/components/About.module.css"

export default function About() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Text Content */}
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Sobre a <span className="text-yellow-600">JK Store</span>
            </h2>
            <div className={styles.description}>
              <p>
                Há mais de uma década, a JK Store tem sido sinônimo de qualidade, estilo e inovação no mundo da moda.
                Nossa missão é oferecer peças exclusivas que combinam tendências contemporâneas com a elegância
                atemporal.
              </p>
              <p>
                Cada produto em nossa coleção é cuidadosamente selecionado por nossa equipe de especialistas em moda,
                garantindo que você tenha acesso apenas ao que há de melhor no mercado.
              </p>
              <p>
                Na JK Store, acreditamos que a moda é uma forma de expressão pessoal. Por isso, oferecemos uma
                experiência de compra única, com atendimento personalizado e produtos que refletem sua personalidade e
                estilo de vida.
              </p>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>10+</div>
                <div className={styles.statLabel}>Anos de Experiência</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50k+</div>
                <div className={styles.statLabel}>Clientes Satisfeitos</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>1000+</div>
                <div className={styles.statLabel}>Produtos Exclusivos</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={styles.imageContainer}>
            <img
              src="/modern-fashion-store-interior-with-elegant-display.jpg"
              alt="JK Store Interior"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
