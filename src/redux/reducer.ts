import { PayloadAction } from "@reduxjs/toolkit";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  SET_PRODUCTS,
} from "./actions";
import { Product, StoreState } from "../types";

const initialState: StoreState = {
  cart: [],
  products: [],
};

const cartReducer = (
  state = initialState,
  action: PayloadAction<Product | string | Product[]>,
): StoreState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.id === (action.payload as Product).id,
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === (action.payload as Product).id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            { ...(action.payload as Product), quantity: 1 },
          ],
        };
      }
    }

    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    case INCREASE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }

    case DECREASE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }

    case SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload as Product[],
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
