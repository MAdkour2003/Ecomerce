import type { StateCreator } from 'zustand';
import type { AppStore, CartSlice } from './types';
import { emptyCartState, recomputeTotals } from './helpers';

export const createCartSlice: StateCreator<
  AppStore,
  [['zustand/persist', unknown]],
  [],
  CartSlice
> = (set) => ({
  ...emptyCartState(),

  addItem: (product) =>
    set((state) => {
      const next = new Map(state.items);
      const existing = next.get(product.id);
      next.set(product.id, {
        ...product,
        quantity: (existing?.quantity ?? 0) + 1,
      });
      return recomputeTotals(next);
    }),

  removeOne: (id) =>
    set((state) => {
      const existing = state.items.get(id);
      if (!existing) return state;
      const next = new Map(state.items);
      if (existing.quantity === 1) {
        next.delete(id);
      } else {
        next.set(id, { ...existing, quantity: existing.quantity - 1 });
      }
      return recomputeTotals(next);
    }),

  removeItem: (id) =>
    set((state) => {
      const existing = state.items.get(id);
      if (!existing) return state;
      const next = new Map(state.items);
      next.delete(id);
      return recomputeTotals(next);
    }),

  clearCart: () => set(() => emptyCartState()),
});
