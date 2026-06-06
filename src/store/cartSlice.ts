import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../types';
import type { RootState } from './store';

const initialState: CartState = {
  items: [],
  count: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ id: number; price: number }>) => {
      const { id, price } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id, price, quantity: 1 });
      }
    },
    removeOne: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return;
      if (existing.quantity <= 1) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        existing.quantity -= 1;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeOne, removeItem, clearCart } = cartSlice.actions;

// Back-compat aliases
export const increaseItemQuantity = addItem;
export const decreaseItemQuantity = removeOne;

export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity * item.price, 0),
);

export const selectCartQuantityById = (id: number) =>
  createSelector(
    [selectCartItems],
    (items) => items.find((item) => item.id === id)?.quantity ?? 0,
  );

export const selectCartItemTotals = createSelector([selectCartItems], (items) => {
  const totals: Record<number, number> = {};
  items.forEach((item) => {
    totals[item.id] = item.quantity * item.price;
  });
  return totals;
});

export const selectCartQuantities = createSelector([selectCartItems], (items) => {
  const quantities: Record<number, number> = {};
  items.forEach((item) => {
    quantities[item.id] = item.quantity;
  });
  return quantities;
});

export default cartSlice.reducer;
