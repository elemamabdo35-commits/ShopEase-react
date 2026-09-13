import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { storage } from "@shared/lib/storage";
import { STORAGE_KEYS } from "@shared/constants/storage-keys";
import type { CartItem, CartState } from "./types";

const initialState: CartState = {
  items: storage.get<CartItem[]>(STORAGE_KEYS.CART, []),
};

function persist(items: CartItem[]) {
  storage.set(STORAGE_KEYS.CART, items);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>,
    ) => {
      const { quantity = 1, ...product } = action.payload;
      const existing = state.items.find((i) => i.productId === product.productId);

      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, existing.stock);
      } else {
        state.items.push({ ...product, quantity: Math.min(quantity, product.stock) });
      }
      persist(state.items);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity < item.stock) item.quantity += 1;
      persist(state.items);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.quantity = Math.max(1, item.quantity - 1);
      persist(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      persist(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      persist(state.items);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
