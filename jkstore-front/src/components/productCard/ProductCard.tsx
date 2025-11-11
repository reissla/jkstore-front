
import Button from "@/components/ui/Button";
import { addProductToCart } from "@/services/produtoService";
import type { Product } from "@/components/productGrid/ProductGrid";
import {toast} from "react-hot-toast";
import { ShoppingCart} from 'lucide-react'
import styles from "@/components/productCard/ProductCard.module.css"
import {verificarUsuarioLogado} from '@/utils/verificarUsuarioLogado';
import ButtonComprar from '@/components/ui/ButtonComprar'

//Falo ao ts que o ProductCard recebe uma prop product do tipo Product
type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) return null;

  const adicionarProdutoAoCarrinho = async () => {

    try {
      await addProductToCart(product.id);
      toast.success("Produto adicionado ao carrinho!");
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        toast.error("Produto já adicionado ao carrinho!");
      } else {
        console.log("Erro ao adicionar o produto no carrinho:", error);
      }
    }

  }

  return (
    <div className={styles.ProductCard}>

      <div className={styles.ProductImage}>
        <img alt="Imagem do Produto" />
      </div>

      <div className={styles.ProductDetails}>

        <h3 className={styles.ProductName}>{product.titulo}</h3>

        <div className={styles.ProductInfo}>
          <p className={styles.ProductPrice}>R${product.preco}</p>
          {verificarUsuarioLogado() ? (
            <Button onClick={adicionarProdutoAoCarrinho}>
              <ShoppingCart />
            </Button>
          ) : (
            <ButtonComprar />
          )}
        </div>

      </div>

    </div>
  );
}

export default ProductCard;
