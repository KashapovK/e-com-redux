import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/actions";
import "./css/product.css";
import { CartItem } from "./types/types";

interface ProductProps {
  product: CartItem;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Цена: {product.price} Рублей</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default Product;
