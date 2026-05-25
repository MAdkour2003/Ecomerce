import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      get cartQuantity() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getItemQuantity: (id) => {
        return get().items.find((item) => item.id === id)?.quantity || 0;
      },

      increaseItemQuantity: (id) => {
        set((state) => {
          const exists = state.items.find((item) => item.id === id);
          if (!exists) {
            return { items: [...state.items, { id, quantity: 1 }] };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          };
        });
      },

      decreaseItemQuantity: (id) => {
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item.quantity === 1) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
            ),
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
