import Button from "@/components/ui/Button.tsx"
import ProductCard from "./ProductCard"
import { useEffect, useState } from "react";
import { getAllProducts, getProducthighlighted } from "@/services/produtoService"
import styles from "@/styles/components/ProductGrid.module.css"

export interface Product {
  id: number;
  titulo: string;
  imagem: string;
  descricao: string;
  preco: number;
  disponivel: boolean;
}

export default function ProductGrid() {
  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    getProducthighlighted().then(response => {
      setProdutos(response.data);
    });
  }, []);

  const buscarProdutos = async () => {
    try {
      const response = await getAllProducts();
      setProdutos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

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
          {produtos.map((produto: Product) => (
            <ProductCard key={produto.id} product={produto} />
          ))}
        </div>

        <div className={styles.cta}>
          <Button size="lg" className={styles.ctaButton} onClick={buscarProdutos}>
            Ver Todos os Produtos
          </Button>

        </div>
      </div>
    </section>
  )
}
