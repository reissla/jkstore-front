import Button from "@/components/ui/Button.jsx"
import ProductCard from "./ProductCard"
import styles from "@/styles/components/ProductGrid.module.css"

const mockProducts = [
  {
    id: 1,
    name: "Camiseta Premium Básica",
    price: 89.9,
    image: "/premium-white-t-shirt-on-model.jpg",
    category: "Camisetas",
  },
  {
    id: 2,
    name: "Jaqueta de Couro Clássica",
    price: 299.9,
    image: "/black-leather-jacket-fashion.jpg",
    category: "Jaquetas",
  },
  {
    id: 3,
    name: "Calça Jeans Slim Fit",
    price: 159.9,
    image: "/dark-blue-slim-fit-jeans.jpg",
    category: "Calças",
  },
  {
    id: 4,
    name: "Tênis Esportivo Premium",
    price: 249.9,
    image: "/white-premium-sneakers.jpg",
    category: "Calçados",
  },
  {
    id: 5,
    name: "Camisa Social Elegante",
    price: 129.9,
    image: "/white-dress-shirt-formal.jpg",
    category: "Camisas",
  }
]

export default function ProductGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Produtos em <span className="text-yellow-600">Destaque</span>
          </h2>
          <p className={styles.subtitle}>
            Descubra nossa seleção cuidadosa de produtos premium, escolhidos especialmente para você.
          </p>
        </div>

        <div className={styles.grid}>
          {mockProducts.map((product) => (
            <ProductCard 
            key={product.id} 
            product={product} />
          ))}
        </div>

        <div className={styles.cta}>
          <Button size="lg" className={styles.ctaButton}>
            Ver Todos os Produtos
          </Button>

        </div>
      </div>
    </section>
  )
}
