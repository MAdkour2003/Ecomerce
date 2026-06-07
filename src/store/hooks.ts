import { useCartStore } from './store';
import type { CartActions, CartLine } from './types';

export const useCartItems = (): Map<number, CartLine> =>
  useCartStore((s) => s.items);

export const useCartCount = (): number => useCartStore((s) => s.count);

export const useCartTotal = (): number => useCartStore((s) => s.total);

export const useCartLine = (id: number): CartLine | undefined =>
  useCartStore((s) => s.items.get(id));

export const useCartLineQuantity = (id: number): number =>
  useCartStore((s) => s.items.get(id)?.quantity ?? 0);

export const useCartActions = (): CartActions => {
  // Actions are stable references on the store, so individual selectors
  // never re-render. Bundled here so consumers can grab the set in one line.
  const addItem = useCartStore((s) => s.addItem);
  const removeOne = useCartStore((s) => s.removeOne);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  return { addItem, removeOne, removeItem, clearCart };
};

export interface UseStoreItemReturn extends CartActions {
  quantity: number;
}

export const useStoreItem = (id: number): UseStoreItemReturn => {
  const quantity = useCartLineQuantity(id);
  const actions = useCartActions();
  return { quantity, ...actions };
};
