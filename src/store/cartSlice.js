import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    increaseItemQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ id: action.payload, quantity: 1 });
      }
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { increaseItemQuantity, decreaseItemQuantity, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
