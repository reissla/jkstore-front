import React from 'react';
import Button from "@/components/ui/Button";
import { addProductToCart } from "@/services/produtoService";
import type { Product } from "@/components/ProductGrid";
import styles from '@/styles/components/ProductCard.module.css';

//Falo ao ts que o ProductCard recebe uma prop product do tipo Product
type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) return null;

  const adicionarProdutoAoCarrinho = async () => {

    try {
      console.log(product.id)
      const response = await addProductToCart(product.id);
      console.log(response);

    } catch (error) {
      console.log("Erro ao adicionar o produto no carrinho:", error);
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
          <Button className={styles.AddToCart} onClick={adicionarProdutoAoCarrinho}>
            Adicionar ao carrinho
          </Button>
        </div>

      </div>

    </div>
  );
}

export default ProductCard;
