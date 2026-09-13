import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@modules/auth/auth.slice";
import cartReducer from "@modules/cart/cart.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
