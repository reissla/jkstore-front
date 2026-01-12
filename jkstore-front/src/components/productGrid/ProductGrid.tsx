import Button from "@/components/ui/Button.tsx"
import ProductCard from "@/components/productCard/ProductCard"
import { useEffect, useState } from "react";
import { getAllProducts, getProducthighlighted, getProductByTittle } from "@/services/produtoService"
import { useSearch } from "@/contexts/SearchContext"
import styles from "@/components/productGrid/ProductGrid.module.css"

export interface Anexo {
  id?: number;
  nome?: string;
  nomeExibicao?: string;
  url?: string;
  base64?: string;
}

export interface Product {
  id: number;
  titulo: string;
  imagemProduto?: Anexo;
  descricao: string;
  preco: number;
  disponivel: boolean;
}

export default function ProductGrid() {
  const { searchTerm } = useSearch();
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [showingAll, setShowingAll] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm) {

      setIsSearching(true);

      getProductByTittle(searchTerm)
        .then(response => {
          const products = Array.isArray(response.data) ? response.data : (response.data ? [response.data] : []);
          setProdutos(products);
          setShowingAll(true);
        })
        .catch(error => {
          console.error("Erro ao buscar produtos:", error);
          setProdutos([]);
        });
    } else {
      setIsSearching(false);
      getProducthighlighted().then(response => {
        setProdutos(response.data);
        setShowingAll(false);
      });
    }
  }, [searchTerm]);

  const buscarProdutos = async () => {
    try {
      const response = await getAllProducts();
      setProdutos(response.data);
      setShowingAll(true);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isSearching ? (
              <>Resultados para: <span className="text-yellow-600">"{searchTerm}"</span></>
            ) : (
              <>Produtos em <span className="text-yellow-600">Destaque</span></>
            )}
          </h2>
          <p className={styles.subtitle}>
            {isSearching
              ? `Encontramos ${produtos.length} produto(s) para sua busca.`
              : "Descubra nossa seleção cuidadosa de produtos premium, escolhidos especialmente para você."
            }
          </p>
        </div>

        <div className={styles.grid}>
          {produtos.map((produto: Product) => (
            <ProductCard key={produto.id} product={produto} />
          ))}
        </div>

        <div className={styles.cta}>
          {!isSearching && !showingAll && (
            <Button size="lg" className={styles.ctaButton} onClick={buscarProdutos}>
              Ver Todos os Produtos
            </Button>
          )}
          {isSearching && produtos.length === 0 && (
            <p className={styles.noResults}>Nenhum produto encontrado para sua busca.</p>
          )}
        </div>
      </div>
    </section>
  )
}
