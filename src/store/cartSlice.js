import { createSlice, createSelector } from '@reduxjs/toolkit';

// Todo: Add count and total
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id, quantity: 1 });
      }
    },
    removeOne: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return;
      if (existing.quantity <= 1) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        existing.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeOne, removeItem, clearCart } = cartSlice.actions;

// Back-compat aliases for existing call sites.
export const increaseItemQuantity = addItem;
export const decreaseItemQuantity = removeOne;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartQuantityById = (id) =>
  createSelector(
    [selectCartItems],
    (items) => items.find((item) => item.id === id)?.quantity ?? 0
  );

export default cartSlice.reducer;
