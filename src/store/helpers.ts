import type { Product } from '../types';
import type { CartProduct, CartState } from './types';

export const emptyCartState = (): CartState => ({
  items: new Map(),
  count: 0,
  total: 0,
});

export const toCartProduct = (p: Product): CartProduct => ({
  id: p.id,
  title: p.title,
  image: p.image,
  category: p.category,
  price: p.price,
});
