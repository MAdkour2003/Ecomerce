import type { Product } from '../types';

export interface CartLine {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
}

export type CartProduct = Pick<
  Product,
  'id' | 'title' | 'image' | 'category' | 'price'
>;

export interface CartState {
  items: Map<number, CartLine>;
  count: number;
  total: number;
}

export interface CartActions {
  addItem: (product: CartProduct) => void;
  removeOne: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export type CartSlice = CartState & CartActions;

export type AppStore = CartSlice;
