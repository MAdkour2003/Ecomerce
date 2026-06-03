import { createSlice, createSelector } from "@reduxjs/toolkit";
import Products from "../page/Products";

// Todo: Add count and total
const initialState = {
  items: [],
  count: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, price } = action.payload;

      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ id, price, quantity: 1 });
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
      // state.count = state.items.reduce((sum, item) => sum + item.quantity, 0);
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
// export const selectCartCount = (state) => state.cart.count;
// export const selectCartTotal = (state) => state.cart.total;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity * (item.price || 0), 0),
);

export const selectCartQuantityById = (id) =>
  createSelector(
    [selectCartItems],
    (items) => items.find((item) => item.id === id)?.quantity ?? 0,
  );

// help of ai
export const selectCartItemTotals = createSelector(
  [selectCartItems],
  (items) => {
    const totals = {};
    items.forEach((item) => {
      totals[item.id] = item.quantity * item.price;
    });
    return totals;
  },
);

export const selectCartQuantities = createSelector(
  [selectCartItems],
  (items) => {
    const quantities = {};
    items.forEach((item) => {
      quantities[item.id] = item.quantity;
    });
    return quantities;
  },
);

export default cartSlice.reducer;
