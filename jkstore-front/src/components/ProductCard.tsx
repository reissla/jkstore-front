import React from 'react';
import styles from '@/styles/components/ProductCard.module.css';

const ProductCard = ({product}) => {
  if(!product) return null;
  return (
    <div className={styles.ProductCard}>

      <div className={styles.ProductImage}>
        <img src="" alt="Imagem do Produto" />
      </div>

      <div className={styles.ProductDetails}>

        <h3 className={styles.ProductName}>Nome do Produto</h3>

        <div className={styles.ProductInfo}>
          <p className={styles.ProductPrice}>R$ 99,90</p>
          <button className={styles.AddToCart}>Adicionar</button>
        </div>

      </div>

    </div>
  );
}

export default ProductCard;
