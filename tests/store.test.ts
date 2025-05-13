import { describe, it, expect, beforeEach } from 'vitest';
import cartReducer, {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setProducts,
} from '../src/redux/cartSlice';
import { Product, CartItem, StoreState } from '../src/types';

describe('Тестирование Redux actions и редьюсеров', () => {
  let initialState: StoreState;

  beforeEach(() => {
    initialState = {
      cart: [],
      products: [],
    };
  });

  it('addToCart добавляет товар в корзину', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };
    const action = addToCart(product);

    const newState = cartReducer(initialState, action);

    expect(newState.cart).toEqual([{ ...product, quantity: 1 }]);
  });

  it('addToCart увеличивает количество товара, если товар уже в корзине', () => {
    const initialStateWithProduct = {
      cart: [{ id: '1', name: 'Test Product', price: 100, quantity: 1 }],
      products: [],
    };
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };
    const action = addToCart(product);

    const newState = cartReducer(initialStateWithProduct, action);

    expect(newState.cart[0].quantity).toBe(2);
  });

  it('removeFromCart удаляет товар из корзины', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };
    const initialStateWithProduct = {
      cart: [product],
      products: [],
    };
    const action = removeFromCart(product.id);

    const newState = cartReducer(initialStateWithProduct, action);

    expect(newState.cart).toEqual([]);
  });

  it('increaseQuantity увеличивает количество товара в корзине', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };
    const initialStateWithProduct = {
      cart: [product],
      products: [],
    };
    const action = increaseQuantity(product.id);

    const newState = cartReducer(initialStateWithProduct, action);

    expect(newState.cart[0].quantity).toBe(2);
  });

  it('decreaseQuantity уменьшает количество товара, но не ниже 1', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 2,
    };
    const initialStateWithProduct = {
      cart: [product],
      products: [],
    };
    const action = decreaseQuantity(product.id);

    const newState = cartReducer(initialStateWithProduct, action);

    expect(newState.cart[0].quantity).toBe(1);
  });

  it('decreaseQuantity не уменьшает количество ниже 1', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };
    const initialStateWithProduct = {
      cart: [product],
      products: [],
    };
    const action = decreaseQuantity(product.id);

    const newState = cartReducer(initialStateWithProduct, action);

    expect(newState.cart[0].quantity).toBe(1);
  });

  it('setProducts устанавливает список продуктов', () => {
    const products: Product[] = [{ id: '1', name: 'Test Product', price: 100 }];
    const action = setProducts(products);

    const newState = cartReducer(initialState, action);

    expect(newState.products).toEqual(products);
  });
});
