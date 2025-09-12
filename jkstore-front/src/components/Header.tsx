import { useState } from "react"
import { Search, ShoppingCart, Menu, X } from "lucide-react"
import Button from "@/components/ui/Button.jsx"
import Input from "@/components/ui/Input.jsx"
import styles from "@/styles/components/Header.module.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState(3) // Mock cart count
  const [searchQuery, setSearchQuery] = useState("")

  const menuItems = ["Home", "Produtos", "Sobre", "Contato"]

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
            {menuItems.map((item) => (
              <button key={item} className={styles.navButton}>
                {item}
              </button>
            ))}
          </nav>
          
          <div className={styles.headerActions}>
            {/* Search */}
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            {/* Cart 
            <Button variant="outline" size="sm" className={styles.cartButton}>
              <ShoppingCart className="w-4 h-4" />
              {cartItems > 0 && <span className={styles.cartBadge}>{cartItems}</span>}
            </Button>
            */}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavContent}>
              {menuItems.map((item) => (
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
                    onChange={(e) => setSearchQuery(e.target.value)}
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
