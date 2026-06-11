import type { Product } from '../types';
import type { CartLine, CartProduct, CartState } from './types';

export const emptyCartState = (): CartState => ({
  items: new Map(),
  count: 0,
  total: 0,
});

export const recomputeTotals = (items: Map<number, CartLine>): CartState => {
  let count = 0;
  let total = 0;
  for (const line of items.values()) {
    count += line.quantity;
    total += line.price * line.quantity;
  }
  return { items, count, total };
};

export const toCartProduct = (p: Product): CartProduct => ({
  id: p.id,
  title: p.title,
  image: p.image,
  category: p.category,
  price: p.price,
});
