import { configureStore } from "@reduxjs/toolkit/react";
import cartReducer from "./reducer";

export const store = configureStore({
  reducer: cartReducer,
});
