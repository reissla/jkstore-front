
import Button from "@/components/ui/Button";
import type { Product } from "@/components/productGrid/ProductGrid";
import { ShoppingCart, Bell, CreditCard } from 'lucide-react'
import styles from "@/components/productCard/ProductCard.module.css"
import { verificarUsuarioLogado } from '@/utils/verificarUsuarioLogado';
import ButtonComprar from '@/components/ui/ButtonComprar'
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const adicionarProdutoAoCarrinho = async () => {
    try {
      await addToCart(product.id);
    } catch (error) {
    }
  }

  const handleComprar = async () => {
    try {
      await addToCart(product.id);
      navigate('/checkout');
    } catch (error) {
      toast.error('Erro ao processar compra');
    }
  }

  const handleNotifyAvailable = () => {
    toast.success('Você será notificado quando este produto estiver disponível!');
  }

  const renderActionButton = () => {
    if (!product.disponivel) {
      return (
        <button className={styles.notifyButton} onClick={handleNotifyAvailable}>
          <Bell size={16} />
          <span>Avisar-me</span>
        </button>
      );
    }

    if (verificarUsuarioLogado()) {
      return (
        <div className={styles.actionButtons}>
          <Button onClick={adicionarProdutoAoCarrinho}>
            <ShoppingCart size={16} />
          </Button>
          <Button onClick={handleComprar}>
            <CreditCard size={16} />
            <span>Comprar</span>
          </Button>
        </div>
      );
    }

    return <ButtonComprar />;
  };

  return (
    <div className={`${styles.ProductCard} ${!product.disponivel ? styles.unavailable : ''}`}>
      {!product.disponivel && (
        <span className={styles.unavailableBadge}>Indisponível</span>
      )}

      <div className={styles.itemImage}>
        {product.imagemProduto?.base64 ? (
          <img
            src={`data:image/png;base64,${product.imagemProduto.base64}`}
            alt={product.titulo}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <ShoppingBag size={24} />
          </div>
        )}
      </div>

      <div className={styles.ProductDetails}>
        <h3 className={styles.ProductName}>{product.titulo}</h3>

        <div className={styles.ProductInfo}>
          <p className={styles.ProductPrice}>R${product.preco}</p>
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
