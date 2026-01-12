import Button from '@/components/ui/Button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './MiniCart.module.css';

export default function MiniCart() {
    const { cartItems, isCartOpen, closeCart, cartCount, isLoading, removeFromCart } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.preco, 0);

    const handleViewCart = () => {
        closeCart();
        navigate('/carrinho');
    };

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    const handleRemoveItem = async (productId: number) => {
        await removeFromCart(productId);
    };

    if (!isCartOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={closeCart} />
            <div className={styles.miniCart}>
                <div className={styles.header}>
                    <div className={styles.headerTitle}>
                        <ShoppingBag size={20} />
                        <span>Meu Carrinho ({cartCount})</span>
                    </div>
                    <button className={styles.closeButton} onClick={closeCart}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.content}>
                    {isLoading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner} />
                            <span>Carregando...</span>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <ShoppingBag size={48} strokeWidth={1} />
                            <p>Seu carrinho está vazio</p>
                            <span>Adicione produtos para continuar</span>
                        </div>
                    ) : (
                        <ul className={styles.itemsList}>
                            {cartItems.map((item) => (
                                <li key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImage}>
                                        {item.imagemProduto?.base64 ? (
                                            <img
                                                src={`data:image/png;base64,${item.imagemProduto.base64}`}
                                                alt={item.titulo}
                                            />
                                        ) : (
                                            <div className={styles.imagePlaceholder}>
                                                <ShoppingBag size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h4 className={styles.itemName}>{item.titulo}</h4>
                                        <div className={styles.itemMeta}>
                                            <span className={styles.itemQuantity}>Qtd: 1</span>
                                            <span className={styles.itemPrice}>
                                                R$ {item.preco.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeButton}
                                        title="Remover item"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.subtotal}>
                            <span>Subtotal</span>
                            <strong>R$ {subtotal.toFixed(2)}</strong>
                        </div>
                        <div className={styles.actions}>
                            <Button
                                className={styles.viewCartButton}
                                onClick={handleViewCart}
                            >
                                Ver Carrinho
                            </Button>
                            <Button
                                className={styles.checkoutButton}
                                onClick={handleCheckout}
                            >
                                Finalizar Compra
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
