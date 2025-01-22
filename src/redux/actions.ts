import { CartItem, Product } from "../types";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const addToCart = (item: CartItem) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (id: string) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const increaseQuantity = (id: string) => ({
  type: INCREASE_QUANTITY,
  payload: id,
});

export const decreaseQuantity = (id: string) => ({
  type: DECREASE_QUANTITY,
  payload: id,
});

export const setProducts = (products: Product[]) => ({
  type: SET_PRODUCTS,
  payload: products,
});
