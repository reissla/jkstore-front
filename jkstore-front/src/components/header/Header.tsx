import { useState, type ChangeEvent } from "react"
import { Search, ShoppingCart } from "lucide-react"
import Button from "@/components/ui/Button.jsx"
import { Input } from "@/components/ui/Input"
import styles from "@/components/header/Header.module.css"
import {verificarUsuarioLogado} from '@/utils/verificarUsuarioLogado';
import {verificarUsuarioAdmin} from '@/utils/verificarUsuarioAdmin';
import ButtonUser from '@/components/ui/ButtonUser'
import { useNavigate } from 'react-router-dom';

const menuItems: string[] = ["Home", "Produtos", "Contato"];

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, _setIsMenuOpen] = useState(false)
  const [cartItems, _setCartItems] = useState(3) // Mock cart count
  const [searchQuery, setSearchQuery] = useState("")

  const handleCadastrarNovoProduto = async() => {
    navigate('/cadastrarNovoProduto')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <h1 className={styles.logoText}>
              JK <span className={styles.logoAccent}>Store</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
              <button className={styles.navButton}>
                Home
              </button>
              <button className={styles.navButton}>
                Produtos
              </button>
              <button className={styles.navButton}>
                Contato
              </button>
              {verificarUsuarioAdmin() && <button className={styles.navButton} onClick={handleCadastrarNovoProduto}>
                Cadastrar Um Novo Produto
              </button>}
          </nav>
          
          <div className={styles.headerActions}>
            {/* Search */}
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            {verificarUsuarioLogado() && (<Button className={styles.cartButton}>
              <ShoppingCart className="w-2 h-2" />
              {cartItems > 0 && <span className={styles.cartBadge}>{cartItems}</span>}
            </Button>)}

            <ButtonUser />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavContent}>
              {menuItems.map((item: string) => (
                <button key={item} className={styles.mobileNavButton}>
                  {item}
                </button>
              ))}
              {/* Mobile Search */}
              <div className={styles.mobileSearchContainer}>
                <div className={styles.mobileSearchWrapper}>
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className={styles.mobileSearchInput}
                  />
                  <Search className={styles.searchIcon} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
