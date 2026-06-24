import type { StateCreator } from "zustand";
import type { AppStore, CartLine, CartSlice } from "./types";
import { emptyCartState, recomputeTotals, toCartProduct } from "./helpers";

import type { RemoteCart } from "../api/cartApi";

export const createCartSlice: StateCreator<
  AppStore,
  [["zustand/persist", unknown]],
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

  syncRemoteCart: (carts: RemoteCart[], productCatalog) => {
    if (!carts.length) return;

    const catalog = new Map(productCatalog.map((p) => [p.id, p]));
    const items = new Map<number, CartLine>();

    for (const item of carts[0].products) {
      const product = catalog.get(item.productId);
      if (!product) continue;
      items.set(product.id, {
        ...toCartProduct(product),
        quantity: item.quantity,
      });
    }

    set(recomputeTotals(items));
  },
});
