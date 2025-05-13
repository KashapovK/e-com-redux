import React from 'react';
import { useDispatch } from 'react-redux';

import './css/product.css';
import { CartItem } from './types';
import { addToCart } from './redux/cartSlice';

interface ProductProps {
  product: CartItem;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Цена: {product.price} Рублей</p>
      <button
        className="add-to-cart-button"
        onClick={() => dispatch(addToCart(product))}
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default Product;
