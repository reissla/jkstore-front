import React from 'react';
import type { Product } from "@/components/ProductGrid";
import styles from '@/styles/components/ProductCard.module.css';

//Falo ao ts que o ProductCard recebe uma prop product do tipo Product
type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  if(!product) return null;
  return (
    <div className={styles.ProductCard}>

      <div className={styles.ProductImage}>
        <img  alt="Imagem do Produto" />
      </div>

      <div className={styles.ProductDetails}>

        <h3 className={styles.ProductName}>{product.titulo}</h3>

        <div className={styles.ProductInfo}>
          <p className={styles.ProductPrice}>R${product.preco}</p>
          <button className={styles.AddToCart}>Adicionar ao carrinho</button>
        </div>

      </div>

    </div>
  );
}

export default ProductCard;
