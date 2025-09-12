import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import styles from "@/styles/components/Footer.module.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Brand */}
          <div className={styles.section}>
            <h3 className="text-2xl font-bold mb-4">
              JK <span className="text-yellow-600">Store</span>
            </h3>
            <p className={styles.description}>
              Sua loja de moda premium com as melhores tendências e qualidade excepcional.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className={styles.socialLink}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className={styles.socialLink}>
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Links Úteis</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Política de Privacidade
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Termos de Uso
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Política de Troca
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Guia de Tamanhos
                </a>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Atendimento</h4>
            <ul className={styles.linkList}>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Central de Ajuda
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Fale Conosco
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Rastrear Pedido
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-400">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-600" />
                <span className="text-gray-400">contato@jkstore.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-yellow-600 mt-1" />
                <span className="text-gray-400">
                  Rua da Moda, 123
                  <br />
                  São Paulo - SP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {currentYear} JK Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
