import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getCartProducts, removeProductFromCart, type CartProduct } from '@/services/cartService';
import { addProductToCart } from '@/services/produtoService';
import { verificarUsuarioLogado } from '@/utils/verificarUsuarioLogado';
import toast from 'react-hot-toast';

interface CartContextType {
    cartItems: CartProduct[];
    cartCount: number;
    isCartOpen: boolean;
    isLoading: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addToCart: (productId: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const refreshCart = useCallback(async () => {
        if (!verificarUsuarioLogado()) {
            setCartItems([]);
            return;
        }

        try {
            setIsLoading(true);
            const response = await getCartProducts();
            setCartItems(response.data || []);
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
            setCartItems([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addToCart = useCallback(async (productId: number) => {
        try {
            await addProductToCart(productId);
            toast.success('Produto adicionado ao carrinho!');
            await refreshCart();
            setIsCartOpen(true);
        } catch (error: any) {
            if (error.response?.status === 409) {
                toast.error('Produto já está no carrinho!');
            } else {
                toast.error('Erro ao adicionar produto');
            }
            throw error;
        }
    }, [refreshCart]);

    const removeFromCart = useCallback(async (productId: number) => {
        try {
            await removeProductFromCart(productId);
            setCartItems(prev => prev.filter(item => item.id !== productId));
            toast.success('Produto removido do carrinho!');
        } catch (error: any) {
            if (error.response?.status === 400) {
                toast.error('Produto não encontrado no carrinho');
            } else {
                toast.error('Erro ao remover produto');
            }
            await refreshCart();
        }
    }, [refreshCart]);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);
    const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

    useEffect(() => {
        if (verificarUsuarioLogado()) {
            refreshCart();
        }
    }, [refreshCart]);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount: cartItems.length,
            isCartOpen,
            isLoading,
            openCart,
            closeCart,
            toggleCart,
            addToCart,
            removeFromCart,
            refreshCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}
